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
import { Skeleton } from "@/components/ui/skeleton";
import { Logo } from "@/components/logo";
import { OrganizationSwitcher, UserButton, useClerk } from "@clerk/nextjs";
import {
  type LucideIcon,
  Home,
  LayoutGrid,
  AudioLines,
  Settings,
} from "lucide-react";
import Link from "next/link";

interface MenuItem {
  title: string;
  url?: string;
  icon: LucideIcon;
  onClick?: () => void;
}

interface NavSectionProps {
  label?: string;
  items: MenuItem[];
  pathname: string;
}

function NavSection({ label, items, pathname }: NavSectionProps) {
  return (
    <SidebarGroup>
      {label && (
        <SidebarGroupLabel className="text-md text-foreground ml-2 font-semibold tracking-wide">
          {label}
        </SidebarGroupLabel>
      )}
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild={!!item.url}
                isActive={
                  item.url
                    ? item.url === "/dashboard" && pathname === "/dashboard"
                      ? true
                      : item.url !== "/dashboard" &&
                        pathname.startsWith(item.url)
                    : false
                }
                onClick={item.onClick}
                tooltip={item.title}
                className="text-md ml-6 h-9 w-auto px-3 py-2 font-medium tracking-tight group-data-[collapsible=icon]:ml-2 data-[active=true]:bg-[#e5e5e5]"
              >
                {item.url ? (
                  <Link href={item.url}>
                    <item.icon />
                    <span>{item.title}</span>
                  </Link>
                ) : (
                  <>
                    <item.icon />
                    <span>{item.title}</span>
                  </>
                )}
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

export function DashboardSidebar() {
  const pathname = usePathname();
  const clerk = useClerk();

  const mainMenuItems: MenuItem[] = [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: Home,
    },
    {
      title: "Explore voices",
      url: "/dashboard/voices",
      icon: LayoutGrid,
    },
    {
      title: "Text to speech",
      url: "/dashboard/text-to-speech",
      icon: AudioLines,
    },
  ];

  const othersMenuItems: MenuItem[] = [
    {
      title: "Settings",
      icon: Settings,
      onClick: () => clerk.openOrganizationProfile(),
    },
  ];

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
        <SidebarMenu>
          <SidebarMenuItem>
            <OrganizationSwitcher
              hidePersonal
              fallback={
                <Skeleton className="h-8.5 w-full rounded-md border bg-white group-data-[collapsible=icon]:size-8" />
              }
              appearance={{
                elements: {
                  rootBox:
                    "w-full! group-data-[collapsible=icon]:w-auto! group-data-[collapsible=icon]:flex! group-data-[collapsible=icon]:justify-center!",
                  organizationSwitcherTrigger:
                    "w-full! justify-between! rounded-sm! pl-1! pr-2! py-1! gap-3! group-data-[collapsible=icon]:w-auto! group-data-[collapsible=icon]:p-1! border! border-border/50! bg-white!",
                  organizationPreview: "gap-2!",
                  organizationPreviewAvatarBox: "size-6! rounded-full!",
                  organizationPreviewTextContainer:
                    "text-xs! tracking-tight! font-medium! text-foreground! group-data-[collapsible=icon]:hidden!",
                  organizationPreviewMainIdentifier: "text-[13px]!",
                  organizationSwitcherTriggerIcon:
                    "size-4! text-sidebar-foreground! group-data-[collapsible=icon]:hidden!",
                },
              }}
            />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavSection label="Home" items={mainMenuItems} pathname={pathname} />
        <NavSection
          label="Manage"
          items={othersMenuItems}
          pathname={pathname}
        />
      </SidebarContent>
      <SidebarFooter className="ml-3 gap-3 py-3 group-data-[collapsible=icon]:ml-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <UserButton
              showName
              fallback={
                <Skeleton className="border-border h-8.5 w-full rounded-sm border bg-white group-data-[collapsible=icon]:size-8" />
              }
              appearance={{
                elements: {
                  rootBox:
                    "w-full! group-data-[collapsible=icon]:w-auto! group-data-[collapsible=icon]:flex! group-data-[collapsible=icon]:justify-center!",
                  userButtonTrigger:
                    "w-full! justify-between! rounded-sm! pl-1! pr-2! py-1! group-data-[collapsible=icon]:w-auto! group-data-[collapsible=icon]:p-1! group-data-[collapsible=icon]:after:hidden! border! border-border/50! bg-white! [--border:color-mix(in_srgb,transparent,var(--clerk-color-neutral,#000000)_15%)]!",
                  userButtonBox: "flex-row-reverse! gap-2!",
                  userButtonOuterIdentifier:
                    "text-[13px]! tracking-tight! font-medium! text-foreground! pl-0! group-data-[collapsible=icon]:hidden!",
                  userButtonAvatarBox: "size-6!",
                },
              }}
            />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
