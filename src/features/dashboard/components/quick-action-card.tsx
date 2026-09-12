import Link from "next/link";
import { ArrowRight } from "lucide-react";

import type { QuickAction } from "@/features/dashboard/data/quick-actions";
import { cn } from "@/lib/utils";

type QuickActionCardProps = QuickAction;

export function QuickActionCard({
  title,
  description,
  gradient,
  href,
}: QuickActionCardProps) {
  return (
    <div className="rounded-sm bg-[#f9f9f9] p-1">
      <Link
        href={href}
        className="group border-border/50 frosted relative flex gap-4 rounded-sm border p-4 shadow-sm transition-all duration-300 hover:shadow-md"
      >
        <div
          className={cn(
            "absolute top-4 -right-4 size-20 rounded-full bg-linear-to-br opacity-40 blur-xl",
            gradient,
          )}
        />

        <div className="flex flex-col justify-between py-1">
          <div className="space-y-0">
            <h3 className="text-md text-foreground/80 font-sans font-medium tracking-tight">
              {title}
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {description}
            </p>
          </div>
          <span className="text-muted-foreground group-hover:text-foreground flex items-center gap-1 pt-2 text-xs font-medium transition-colors">
            Try now
            <ArrowRight className="size-3 transition-transform group-hover:translate-x-0.5" />
          </span>
        </div>
      </Link>
    </div>
  );
}
