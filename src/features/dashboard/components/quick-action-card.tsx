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
    <div className="rounded-3xl bg-[#F9F9F9] p-1">

    <Link
      href={href}
      className="group relative flex gap-4 rounded-2xl border border-border/50 frosted p-4 shadow-sm transition-all duration-300 hover:shadow-md"
    >
      <div
        className={cn(
          "absolute -top-4 -right-4 size-20 rounded-full bg-gradient-to-br opacity-40 blur-2xl",
          gradient,
        )}
      />


      <div className="flex flex-col justify-between py-1">
        <div className="space-y-1">
          <h3 className="text-sm font-serif font-normal tracking-tight text-foreground/80">
            {title}
          </h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            {description}
          </p>
        </div>
        <span className="flex items-center gap-1 pt-2 text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors">
          Try now
          <ArrowRight className="size-3 transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
    </div>
  );
}
