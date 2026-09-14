import Image from "next/image";
import { cn } from "@/lib/utils";

export function DashboardDemo({ className }: { className?: string }) {
  return (
    <div className="relative w-full">
      <Image
        src="/screenshot.png"
        alt="Dashboard preview"
        width={1200}
        height={675}
        className={cn("w-full", className)}
        priority
      />
    </div>
  );
}
