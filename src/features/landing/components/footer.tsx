import Link from "next/link";

import { Logo } from "@/components/logo";

export function LandingFooter() {
  return (
    <footer className="bg-[#f9f9f9]">
      <div className="border-border/50 mx-auto max-w-7xl border-t" />
      <div className="mx-auto max-w-7xl px-6 py-4">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <Link href="/" className="bg-muted flex items-center rounded-sm p-1">
            <Logo className="size-8" />
          </Link>

          <p className="text-muted-foreground ml-auto text-sm sm:ml-0">
            &copy; {new Date().getFullYear()} Zenvox. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
