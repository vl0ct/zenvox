"use client";

export function DemoHeader() {
  return (
    <div className="flex items-start justify-between">
      <div className="ml-4 space-y-1">
        <p className="text-muted-foreground text-sm">Nice to see you</p>
        <h1 className="font-sans text-xl font-medium tracking-tight lg:text-3xl">
          Demo User
        </h1>
      </div>
    </div>
  );
}
