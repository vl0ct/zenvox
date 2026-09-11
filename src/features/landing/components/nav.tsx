"use client";

import Link from "next/link";
import { SignInButton, SignUpButton } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/logo";

export function LandingNav() {
  const { isLoaded, isSignedIn } = useUser();

  return (
    <header
      className={cn(
        "fixed top-0 right-0 left-0 z-50 transition-all duration-300",
      )}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link
          href="/"
          className="flex items-center bg-muted rounded-sm p-1"
        >
          <Logo className="size-8" />
        </Link>

        {isLoaded && (
          <div className="flex items-center gap-3 font-sans">
            {isSignedIn ? (
              <div className="flex items-center bg-muted rounded-sm p-1">
                <Button
                  variant="ghost"
                  size="sm"
                  className="rounded-sm bg-neutral-700 text-background font-semibold tracking-wide hover:bg-neutral-600 hover:text-background"
                  asChild
                >
                  <Link href="/dashboard">Dashboard</Link>
                </Button>
              </div>
            ) : (
              <div className="flex items-center bg-muted rounded-sm p-1">
                <SignInButton mode="modal">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="rounded-sm bg-transparent font-semibold text-neutral-800 tracking-wide hover:text-neutral-600 hover:bg-transparent"
                  >
                    Sign in
                  </Button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="rounded-sm bg-neutral-800 text-background font-semibold tracking-wide hover:bg-neutral-600 hover:text-background"
                  >
                    Try for free
                  </Button>
                </SignUpButton>
              </div>
            )}
          </div>
        )}
      </nav>
    </header>
  );
}
