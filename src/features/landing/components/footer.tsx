import Link from "next/link";

export function LandingFooter() {
  return (
    <footer className="border-t border-border/50">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-lg font-serif font-medium">Zenvox</span>
          </Link>

          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Zenvox. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
