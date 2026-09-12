"use client";

import { VoiceAvatar } from "@/components/voice-avatar/voice-avatar";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import { AudioLines, AudioWaveform, Clock } from "lucide-react";
import Link from "next/link";

export function SettingsPanelHistory() {
  const trpc = useTRPC();

  const { data: generations } = useSuspenseQuery(
    trpc.generations.getAll.queryOptions(),
  );

  if (!generations.length) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-2 p-8">
        <div className="relative flex w-25 items-center justify-center">
          <div className="bg-muted absolute left-0 -rotate-30 rounded-sm p-3">
            <AudioLines className="text-muted-foreground size-4" />
          </div>

          <div className="bg-foreground relative z-10 rounded-full p-3">
            <AudioWaveform className="text-background size-4" />
          </div>

          <div className="bg-muted absolute right-0 rotate-30 rounded-full p-3">
            <Clock className="text-muted-foreground size-4" />
          </div>
        </div>
        <p className="text-foreground font-semibold tracking-tight">
          No generations yet
        </p>
        <p className="text-muted-foreground max-w-48 text-center text-xs">
          Generate some audio and it will appear here
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2 p-2">
      {generations.map((generation) => (
        <Link
          href={`/dashboard/text-to-speech/${generation.id}`}
          key={generation.id}
          className="border-border/50 frosted dark:frosted-dark flex items-center gap-3 rounded-sm border p-3 text-left shadow-sm transition-all duration-300 hover:shadow-md"
        >
          <div className="flex min-w-0 flex-1 flex-col gap-0.5">
            <p className="text-foreground truncate text-sm font-medium">
              {generation.text}
            </p>
            <div className="text-muted-foreground flex items-center gap-1.5 text-xs">
              <VoiceAvatar
                seed={generation.voiceId ?? generation.voiceName}
                name={generation.voiceName}
                className="shrink-0"
              />
              <span>{generation.voiceName}</span>
              <span>&middot;</span>
              <span>
                {formatDistanceToNow(new Date(generation.createdAt), {
                  addSuffix: true,
                })}
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
