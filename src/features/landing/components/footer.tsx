import Link from "next/link";

import { Logo } from "@/components/logo";

export function LandingFooter() {
  return (
    <footer className="bg-[#f9f9f9]">
      <div className="mx-auto max-w-7xl border-t border-border/50" />
      <div className="mx-auto max-w-7xl px-6 py-4">
        <div className="flex flex-col items-start justify-between gap-6 sm:items-center sm:flex-row">
          <Link href="/" className="flex items-center bg-muted p-1 rounded-sm">
            <Logo className="size-8" />
          </Link>

          <p className="text-sm text-muted-foreground ml-auto sm:ml-0">
            &copy; {new Date().getFullYear()} Zenvox. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
