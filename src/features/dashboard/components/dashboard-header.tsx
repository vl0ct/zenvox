"use client";

import { useUser } from "@clerk/nextjs";
import { Sparkles } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export function DashboardHeader() {
  const { isLoaded, user } = useUser();

  return (
    <div className="flex items-start justify-between">
      <div className="space-y-1">
        <p className="text-sm text-muted-foreground">Nice to see you</p>
        <h1 className="text-2xl lg:text-3xl font-serif font-normal tracking-tight">
          {isLoaded ? (user?.fullName ?? user?.firstName ?? "there") : "..."}
        </h1>
      </div>

      <div className="lg:flex items-center gap-3 hidden">
        <Button variant="ghost" size="sm" className="rounded-full" asChild>
          <Link href="#">
            <Sparkles />
            Quick tips
          </Link>
        </Button>
      </div>
    </div>
  );
}
