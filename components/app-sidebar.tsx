"use client";

import {
  AudioWaveform,
  BarChart2,
  CalendarClock,
  CircleQuestionMark,
  LayoutDashboardIcon,
  MessageCircleCode,
  MonitorCog,
  Settings,
} from "lucide-react";

import { NavMenu } from "@/components/nav-menu";
import { NavUser } from "@/components/nav-user";
import { Logo } from "@/components/logo";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

// Sidebar Mock Data
const data = {
  user: {
    name: "Support Engineer",
    email: "support@emirates.com",
    // avatar: "/avatars/shadcn.jpg",
  },
  menu: [
    {
      name: "Dashboard",
      url: "/",
      icon: LayoutDashboardIcon,
    },
    {
      name: "Operational Resilience",
      url: "/operational-resilience",
      icon: MonitorCog,
    },
    {
      name: "Change Risk Advisor",
      url: "/change-risk-advisor",
      icon: CalendarClock,
    },
    {
      name: "Incident Forecasts",
      url: "#",
      icon: AudioWaveform,
    },
    {
      name: "Ask TwinSight",
      url: "/ask-twinsight",
      icon: MessageCircleCode,
    },
    {
      name: "Reports & Analytics",
      url: "#",
      icon: BarChart2,
    },
    {
      name: "Settings",
      url: "#",
      icon: Settings,
    },
    {
      name: "Help",
      url: "#",
      icon: CircleQuestionMark,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <Logo />
      </SidebarHeader>
      <SidebarContent>
        <NavMenu projects={data.menu} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
