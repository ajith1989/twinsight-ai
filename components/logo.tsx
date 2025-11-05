"use client";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { GalleryHorizontal } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function Logo() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton size="lg" asChild>
          <Link href="/">
            <div className="text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
              <Image
                src="/twinsight-logo.jpg"
                width={40}
                height={40}
                alt="TwinSight AI"
                className="rounded overflow-hidden"
              />
            </div>
            <div className="flex flex-col gap-0.5 leading-none">
              <span className="font-medium">TwinSight AI</span>
              <span className="opacity-50 text-xs flex space-x-">
                <span>Predict.</span>
                <span>Prevent.</span>
                <span>Protect.</span>
              </span>
            </div>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
