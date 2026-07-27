import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface FrostedCardProps {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "article";
}

export function FrostedCard({
  children,
  className,
  as: Component = "div",
}: FrostedCardProps) {
  return (
    <Component
      className={cn(
        "frosted dark:frosted-dark rounded-2xl border p-6",
        className,
      )}
    >
      {children}
    </Component>
  );
}
