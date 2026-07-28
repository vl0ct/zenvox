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

    router.push(
      `/dashboard/text-to-speech?text=${encodeURIComponent(trimmed)}`,
    );
  };

  return (
    <div className="rounded-3xl bg-[#F9F9F9] p-1">
      <div className="space-y-4 rounded-2xl bg-white p-4 drop-shadow-xs">
        <Textarea
          placeholder="Start typing or paste your text here..."
          className="min-h-32 resize-none border-0 bg-transparent p-0 shadow-none focus-visible:ring-0 text-sm"
          value={text}
          onChange={(e) => setText(e.target.value)}
          maxLength={TEXT_MAX_LENGTH}
        />

        <div className="flex items-center justify-between">
          <Badge
            variant="outline"
            className="gap-1.5 border-dashed rounded-full"
          >
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
            {text.length.toLocaleString()} / {TEXT_MAX_LENGTH.toLocaleString()}{" "}
            characters
          </span>
        </div>
      </div>

      <div className="flex items-center justify-end p-3">
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
