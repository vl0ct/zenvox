"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Coins } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import {
  COST_PER_UNIT,
  TEXT_MAX_LENGTH,
} from "@/features/text-to-speech/data/constants";

export function TextInputPanel() {
  const [text, setText] = useState("");
  const router = useRouter();

  const handleGenerate = () => {
    const trimmed = text.trim();
    if (!trimmed) return;

    router.push(`/dashboard/text-to-speech?text=${encodeURIComponent(trimmed)}`);
  };

  return (
    <div className="relative rounded-2xl border border-border/50 frosted dark:frosted-dark overflow-hidden">
      <div className="p-4 sm:p-6">
        <Textarea
          placeholder="Start typing or paste your text here..."
          className="min-h-32 resize-none border-0 bg-transparent p-0 shadow-none focus-visible:ring-0 text-sm"
          value={text}
          onChange={(e) => setText(e.target.value)}
          maxLength={TEXT_MAX_LENGTH}
        />

        <div className="mt-4 flex items-center justify-between">
          <Badge variant="outline" className="gap-1.5 border-border/50 rounded-full">
            <Coins className="size-3" />
            <span className="text-xs">
              {text.length === 0 ? (
                "Start typing to estimate"
              ) : (
                <>
                  <span className="tabular-nums">
                    ${(text.length * COST_PER_UNIT).toFixed(4)}
                  </span>{" "}
                  estimated
                </>
              )}
            </span>
          </Badge>
          <span className="text-xs text-muted-foreground">
            {text.length.toLocaleString()} /{" "}
            {TEXT_MAX_LENGTH.toLocaleString()} characters
          </span>
        </div>
      </div>

      <div className="flex items-center justify-end border-t border-border/50 px-4 py-3 sm:px-6">
        <Button
          size="sm"
          disabled={!text.trim()}
          onClick={handleGenerate}
          className="rounded-full w-full sm:w-auto"
        >
          Generate speech
        </Button>
      </div>
    </div>
  );
}
