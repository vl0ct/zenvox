"use client";

import { useUser } from "@clerk/nextjs";
export function DashboardHeader() {
  const { isLoaded, user } = useUser();

  return (
    <div className="flex items-start justify-between">
      <div className="ml-4 space-y-1">
        <p className="text-muted-foreground text-sm">Nice to see you</p>
        <h1 className="font-sans text-xl font-medium tracking-tight lg:text-3xl">
          {isLoaded ? (user?.fullName ?? user?.firstName ?? "there") : "..."}
        </h1>
      </div>
    </div>
  );
}
