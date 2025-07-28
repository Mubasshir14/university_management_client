"use client";
import * as React from "react";
import {
  Settings,
  SquareTerminal,
  ShoppingCart,
  ClipboardCheck,
  Package,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";
import Link from "next/link";
import { useUser } from "@/components/context/UserContext";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useUser();

  const navMain =
    user?.role === "user"
      ? [
          {
            title: "Dashboard",
            url: "/user/dashboard",
            icon: SquareTerminal,
            isActive: true,
          },
        ]
      : user?.role === "admin"
      ? [
          {
            title: "Dashboard",
            url: "/admin/dashboard",
            icon: SquareTerminal,
            isActive: true,
          },
          {
            title: "Add Advisor",
            url: "/admin/dashboard/add-advisor",
            icon: Package,
          },
          {
            title: "Add Courses",
            url: "/admin/dashboard/add-course",
            icon: ClipboardCheck,
          },
          {
            title: "Add Department",
            url: "/admin/dashboard/add-department",
            icon: ShoppingCart,
          },
          {
            title: "Add Semester",
            url: "/admin/dashboard/add-semester",
            icon: Settings,
          },
          {
            title: "Manage Student",
            url: "/admin/dashboard/manage-student",
            icon: Settings,
          },
          {
            title: "Pending Approval",
            url: "/admin/dashboard/waiting-approval",
            icon: Settings,
          },
          {
            title: "Pending Registration",
            url: "/admin/dashboard/pending-registration",
            icon: Settings,
          },
          {
            title: "Approved Registration",
            url: "/admin/dashboard/approve-registration",
            icon: Settings,
          },
          {
            title: "Update Individual Registration",
            url: "/admin/dashboard/course-drop-individual-registration",
            icon: SquareTerminal,
            isActive: true,
          },
          {
            title: "Manage Semester",
            url: "/admin/dashboard/manage-semester",
            icon: Settings,
          },
          {
            title: "Manage Course",
            url: "/admin/dashboard/manage-course",
            icon: Settings,
          },
          {
            title: "Manage Department",
            url: "/admin/dashboard/manage-department",
            icon: Settings,
          },
          {
            title: "Manage Advisor",
            url: "/admin/dashboard/manage-advisor",
            icon: Settings,
          },
          {
            title: "Filter By Department",
            url: "/admin/dashboard/filter-department",
            icon: Settings,
          },
          {
            title: "Filter By Semester",
            url: "/admin/dashboard/filter-semester",
            icon: Settings,
          },
          {
            title: "Filter By Course",
            url: "/admin/dashboard/filter-course",
            icon: Settings,
          },
        ]
      : user?.role === "student"
      ? [
          {
            title: "Dashboard",
            url: "/student/dashboard",
            icon: SquareTerminal,
            isActive: true,
          },
          {
            title: "My Information",
            url: "/student/dashboard/my-information",
            icon: SquareTerminal,
            isActive: true,
          },
          {
            title: "Make Registration",
            url: "/student/dashboard/registration",
            icon: SquareTerminal,
            isActive: true,
          },
          {
            title: "Registration Info",
            url: "/student/dashboard/registration-information",
            icon: SquareTerminal,
            isActive: true,
          },
          {
            title: "Update Registration Info",
            url: "/student/dashboard/update-registration-information",
            icon: SquareTerminal,
            isActive: true,
          },
        ]
      : [];

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="bg-gradient-to-b from-blue-600/10 to-purple-600/10">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <div className="flex items-center justify-center"></div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <div className="font-bold text-sm text-center">
                    <Link
                      href="/"
                      className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-xl font-bold font-sansita"
                    >
                      UNIVERSITY MANAGEMENT
                    </Link>
                  </div>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="bg-red-100/10">
        <NavMain items={navMain} />
      </SidebarContent>
      <SidebarFooter className="bg-red-100/10">
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
