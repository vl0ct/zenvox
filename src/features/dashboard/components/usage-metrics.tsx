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
    <div className="bg-muted hidden rounded-3xl p-1 sm:block">
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
            className="border-border/50 frosted dark:frosted-dark rounded-2xl border p-5"
          >
            <div className="flex flex-col gap-2 bg-white">
              <div className="flex items-center gap-2.5">
                {/*<div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted border border-border/50">
                  <item.icon className="size-4 text-muted-foreground" />
                </div>*/}
                <p className="text-muted-foreground text-xs font-medium">
                  {item.label}
                </p>
              </div>
              <div className="min-w-0">
                {item.value !== null ? (
                  <p className="text-2xl font-semibold tracking-tight tabular-nums">
                    {item.value}
                  </p>
                ) : (
                  <Skeleton className="mt-1 h-7 w-20" />
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
