"use client";

import { usePathname } from "next/navigation";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Logo } from "@/components/logo";
import { Home } from "lucide-react";
import Link from "next/link";

export function DemoSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon" className="border-r-0!">
      <SidebarHeader className="ml-3 flex flex-col gap-4 pt-4 group-data-[collapsible=icon]:ml-4">
        <div className="flex items-center group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:pl-0">
          <Link href="/" className="flex items-center">
            <Logo className="bg-background size-10 group-data-[collapsible=icon]:hidden" />
            <span className="text-xl font-medium tracking-tight group-data-[collapsible=icon]:hidden">
              Zenvox
            </span>
          </Link>
          <SidebarTrigger className="ml-auto" />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-md text-foreground ml-2 font-semibold tracking-wide">
            Home
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === "/demo"}
                  tooltip="Dashboard"
                  className="text-md ml-6 h-9 w-auto px-3 py-2 font-medium tracking-tight group-data-[collapsible=icon]:ml-2 data-[active=true]:bg-[#e5e5e5]"
                >
                  <Link href="/demo">
                    <Home />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="ml-3 gap-3 py-3 group-data-[collapsible=icon]:ml-4">
        <div className="text-muted-foreground text-xs">
          Demo Mode
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
