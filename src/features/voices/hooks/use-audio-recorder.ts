import { useState, useRef, useCallback, useEffect } from "react";
import type RecordRTCType from "recordrtc";
import WaveSurfer from "wavesurfer.js";
import RecordPlugin from "wavesurfer.js/dist/plugins/record.esm.js";

export function useAudioRecorder() {
  const [isRecording, setIsRecording] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [error, setError] = useState<string | null>(null);

  const recorderRef = useRef<RecordRTCType | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const wsRef = useRef<WaveSurfer | null>(null);
  const micStreamRef = useRef<{ onDestroy: () => void } | null>(null);

  // ------------------------------------------------------------------
  // destroyWaveSurfer – tears down the waveform visualiser only
  // ------------------------------------------------------------------
  const destroyWaveSurfer = useCallback(() => {
    if (micStreamRef.current) {
      micStreamRef.current.onDestroy();
      micStreamRef.current = null;
    }
    if (wsRef.current) {
      wsRef.current.destroy();
      wsRef.current = null;
    }
  }, []);

  // ------------------------------------------------------------------
  // cleanup – stops everything: timer, recorder, mic stream, waveform
  // ------------------------------------------------------------------
  const cleanup = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    destroyWaveSurfer();
    // Stop mic tracks BEFORE destroying RecordRTC so the browser
    // removes the red recording indicator promptly.
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (recorderRef.current) {
      recorderRef.current.destroy();
      recorderRef.current = null;
    }
  }, [destroyWaveSurfer]);

  // ------------------------------------------------------------------
  // BUG FIX: ensure the microphone is released if the component
  // unmounts while a recording is still in progress (e.g. user navigates
  // away mid-recording). Without this the browser keeps the red mic dot.
  // ------------------------------------------------------------------
  useEffect(() => {
    return () => {
      cleanup();
    };
  }, [cleanup]);

  // ------------------------------------------------------------------
  // Waveform visualiser for the recording UI
  // ------------------------------------------------------------------
  useEffect(() => {
    if (!isRecording || !containerRef.current || !streamRef.current) return;

    const ws = WaveSurfer.create({
      container: containerRef.current,
      waveColor: "hsl(var(--foreground) / 0.5)",
      height: 144,
      barWidth: 1,
      barGap: 2,
      barRadius: 1,
      cursorWidth: 0,
      barMinHeight: 10,
      normalize: true,
    });

    wsRef.current = ws;

    const record = ws.registerPlugin(
      RecordPlugin.create({ scrollingWaveform: true }),
    );

    const handle = record.renderMicStream(streamRef.current);
    micStreamRef.current = handle;

    return () => {
      destroyWaveSurfer();
    };
  }, [isRecording, destroyWaveSurfer]);

  // ------------------------------------------------------------------
  // startRecording
  // ------------------------------------------------------------------
  const startRecording = useCallback(async () => {
    try {
      setError(null);
      setAudioBlob(null);
      setElapsedTime(0);

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const { default: RecordRTC, StereoAudioRecorder } =
        await import("recordrtc");

      const recorder = new RecordRTC(stream, {
        recorderType: StereoAudioRecorder,
        mimeType: "audio/wav",
        numberOfAudioChannels: 1,
        desiredSampRate: 44100,
      });

      recorderRef.current = recorder;
      recorder.startRecording();
      setIsRecording(true);

      const startTime = Date.now();
      timerRef.current = setInterval(() => {
        setElapsedTime((Date.now() - startTime) / 1000);
      }, 100);
    } catch (err) {
      // Release the stream if RecordRTC setup failed after getUserMedia succeeded.
      cleanup();

      if (err instanceof DOMException && err.name === "NotAllowedError") {
        setError(
          "Microphone access denied. Please allow microphone access in your browser settings.",
        );
      } else {
        setError("Failed to access microphone. Please check your device.");
      }
    }
  }, [cleanup]);

  // ------------------------------------------------------------------
  // stopRecording
  // ------------------------------------------------------------------
  const stopRecording = useCallback(
    (onBlob?: (blob: Blob) => void) => {
      const recorder = recorderRef.current;
      if (!recorder) return;

      recorder.stopRecording(() => {
        const blob = recorder.getBlob();

        // BUG FIX: call cleanup() BEFORE updating state.
        // Previously cleanup was called after setIsRecording(false), which
        // meant React could re-render and unmount the waveform container
        // while WaveSurfer was still attached to it, causing canvas errors.
        cleanup();

        setAudioBlob(blob);
        setIsRecording(false);
        onBlob?.(blob);
      });
    },
    [cleanup],
  );

  // ------------------------------------------------------------------
  // resetRecording
  // ------------------------------------------------------------------
  const resetRecording = useCallback(() => {
    cleanup();
    setIsRecording(false);
    setElapsedTime(0);
    setAudioBlob(null);
    setError(null);
  }, [cleanup]);

  return {
    isRecording,
    elapsedTime,
    audioBlob,
    containerRef,
    error,
    startRecording,
    stopRecording,
    resetRecording,
  };
}
