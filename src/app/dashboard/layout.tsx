import { cookies } from "next/headers";
import { cn } from "@/lib/utils";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/features/dashboard/components/dashboard-sidebar";
import { MobileSidebarTrigger } from "@/features/dashboard/components/mobile-sidebar-trigger";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const sidebarState = cookieStore.get("sidebar_state")?.value;
  const defaultOpen =
    sidebarState === undefined ? true : sidebarState === "true";

  return (
    <SidebarProvider defaultOpen={defaultOpen} className="h-svh">
      <DashboardSidebar />
      <SidebarInset className="min-h-0 min-w-0">
        <MobileSidebarTrigger />
        <main className="flex min-h-0 flex-1 flex-col p-3 lg:p-4">
          <div
            className={cn(
              "bg-card flex min-h-0 flex-1 flex-col overflow-hidden rounded-sm border",
              "shadow-[10px_18px_40px_-18px_rgba(0,0,0,0.16)]",
              "dark:shadow-[10px_18px_40px_-18px_rgba(0,0,0,0.5)]",
            )}
          >
            {children}
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
