/* eslint-disable react-hooks/refs */
"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";

interface UseWaveSurferOptions {
  url?: string;
  autoplay?: boolean;
  onReady?: () => void;
  onError?: (error: Error) => void;
}

export function useWaveSurfer({
  url,
  autoplay,
  onReady,
  onError,
}: UseWaveSurferOptions) {
  const containerRef = useRef<HTMLDivElement>(null);
  const wavesurferRef = useRef<WaveSurfer | null>(null);

  // Keep callbacks in refs so they never appear in the effect's dep array,
  // preventing spurious WaveSurfer recreations.
  const onReadyRef = useRef(onReady);
  const onErrorRef = useRef(onError);
  onReadyRef.current = onReady;
  onErrorRef.current = onError;

  const [isPlaying, setIsPlaying] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (!containerRef.current || !url) return;

    // Destroy any previous instance before creating a new one.
    if (wavesurferRef.current) {
      wavesurferRef.current.destroy();
      wavesurferRef.current = null;
    }

    // Reset all state whenever the URL changes.
    setIsReady(false);
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);

    let destroyed = false;

    const ws = WaveSurfer.create({
      container: containerRef.current,
      waveColor: "#96999D",
      progressColor: "#4A8A9A",
      cursorColor: "#4A8A9A",
      cursorWidth: 2,
      barWidth: 2,
      barGap: 2,
      barRadius: 2,
      barMinHeight: 4,
      height: "auto",
      normalize: true,
    });

    wavesurferRef.current = ws;

    ws.on("ready", () => {
      if (destroyed) return;

      // -------------------------------------------------------------------
      // DURATION FIX
      // The Chatterbox TTS server (and many streaming TTS providers) writes
      // the WAV RIFF chunk-size as a placeholder (0xFFFFFFFF). That makes
      // ws.getDuration() return ~30 minutes or more.
      //
      // ws.getDecodedData() returns the WebAudio AudioBuffer that WaveSurfer
      // already decoded in full to render the waveform. AudioBuffer.duration
      // is computed as sampleFrames / sampleRate – it counts actual decoded
      // samples, so it is always accurate regardless of WAV header values.
      // -------------------------------------------------------------------
      const decoded = ws.getDecodedData();
      const dur = decoded?.duration ?? ws.getDuration();

      setIsReady(true);
      setDuration(Number.isFinite(dur) && dur > 0 ? dur : 0);

      if (autoplay) {
        // Catch NotAllowedError when the browser blocks autoplay.
        ws.play().catch(() => {});
      }
      onReadyRef.current?.();
    });

    ws.on("play", () => {
      if (!destroyed) setIsPlaying(true);
    });
    ws.on("pause", () => {
      if (!destroyed) setIsPlaying(false);
    });
    ws.on("finish", () => {
      if (!destroyed) setIsPlaying(false);
    });
    ws.on("timeupdate", (time) => {
      if (!destroyed) setCurrentTime(time);
    });

    ws.on("error", (error) => {
      if (destroyed) return;
      console.error("WaveSurfer error:", error);
      onErrorRef.current?.(new Error(String(error)));
    });

    ws.load(url).catch((error) => {
      if (destroyed) return;
      console.error("WaveSurfer load error:", error);
      onErrorRef.current?.(new Error(String(error)));
    });

    return () => {
      destroyed = true;
      // Sync React state immediately so the UI never shows stale play state.
      setIsPlaying(false);
      ws.destroy();
      wavesurferRef.current = null;
    };
    // Only re-create when the actual audio source or autoplay flag changes.
    // isMobile is intentionally excluded: the waveform is always mounted in
    // the DOM (hidden via CSS on mobile), so recreating on breakpoint changes
    // would cause a second autoplay and double audio.
  }, [url, autoplay]);

  const togglePlayPause = useCallback(() => {
    wavesurferRef.current?.playPause();
  }, []);

  const seekForward = useCallback((seconds = 5) => {
    const ws = wavesurferRef.current;
    if (!ws) return;
    const total = ws.getDuration();
    if (!total) return;
    ws.seekTo(Math.min(ws.getCurrentTime() + seconds, total) / total);
  }, []);

  const seekBackward = useCallback((seconds = 5) => {
    const ws = wavesurferRef.current;
    if (!ws) return;
    const total = ws.getDuration();
    if (!total) return;
    ws.seekTo(Math.max(ws.getCurrentTime() - seconds, 0) / total);
  }, []);

  return {
    containerRef,
    isPlaying,
    isReady,
    currentTime,
    duration,
    togglePlayPause,
    seekForward,
    seekBackward,
  };
}
