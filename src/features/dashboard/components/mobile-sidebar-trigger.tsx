"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { PanelRight } from "lucide-react";

export function MobileSidebarTrigger() {
  return (
    <div className="fixed top-4 right-4 z-40 lg:hidden">
      <SidebarTrigger className="flex size-9 items-center justify-center rounded-full border border-border/50 frosted">
        <PanelRight className="size-4" />
      </SidebarTrigger>
    </div>
  );
}
