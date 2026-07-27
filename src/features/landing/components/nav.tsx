"use client";

import Link from "next/link";
import { useScroll, useMotionValueEvent } from "motion/react";
import { useState } from "react";
import { SignUpButton } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function LandingNav() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const { isLoaded, isSignedIn } = useUser();

  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 20);
  });

  return (
    <header
      className={cn(
        "fixed top-0 right-0 left-0 z-50 transition-all duration-300",
        scrolled
          ? "frosted dark:frosted-dark border-b border-border/50"
          : "bg-transparent",
      )}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl font-serif font-medium tracking-tight">
            Zenvox
          </span>
        </Link>

        {isLoaded && (
          <div className="flex items-center gap-3">
            {isSignedIn ? (
              <Button
                variant="outline"
                size="default"
                className="rounded-full px-4"
                asChild
              >
                <Link href="/dashboard">Dashboard</Link>
              </Button>
            ) : (
              <SignUpButton mode="modal">
                <Button size="default" className="rounded-full px-4">
                  Get started
                </Button>
              </SignUpButton>
            )}
          </div>
        )}
      </nav>
    </header>
  );
}
