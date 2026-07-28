"use client";

import { useQuery } from "@tanstack/react-query";
import { motion } from "motion/react";
import { AudioLines, Sparkles, Volume2 } from "lucide-react";

import { useTRPC } from "@/trpc/client";
import { Skeleton } from "@/components/ui/skeleton";

export function UsageMetrics() {
  const trpc = useTRPC();
  const voices = useQuery(trpc.voices.getAll.queryOptions({ query: "" }));
  const generations = useQuery(trpc.generations.getAll.queryOptions());

  const items = [
    {
      icon: Sparkles,
      label: "Generations today",
      value: generations.data?.length ?? null,
    },
    {
      icon: Volume2,
      label: "Available voices",
      value: voices.data
        ? voices.data.custom.length + voices.data.system.length
        : null,
    },
    {
      icon: AudioLines,
      label: "Audio generated",
      value: generations.data?.length ?? null,
    },
  ];

  return (
    <div className="rounded-3xl bg-muted/50 p-1 hidden sm:block">
      <div className="grid gap-3 sm:grid-cols-3">
        {items.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              type: "spring",
              damping: 25,
              stiffness: 200,
              delay: i * 0.08,
            }}
            className="rounded-2xl border border-border/50 frosted dark:frosted-dark p-4"
          >
            <div className="flex items-center gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted border border-border/50">
                <item.icon className="size-4" />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground">{item.label}</p>
                {item.value !== null ? (
                  <p className="text-sm font-serif tabular-nums">
                    {item.value}
                  </p>
                ) : (
                  <Skeleton className="mt-1 h-4 w-16" />
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
