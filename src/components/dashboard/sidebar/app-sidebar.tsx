"use client";
import * as React from "react";
import {
  Bot,
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
            url: "/mealProvider/dashboard",
            icon: SquareTerminal,
            isActive: true,
          },
          {
            title: "Meal",
            url: "/mealProvider/dashboard/food/foods/manage-food",
            icon: Bot,
            items: [
              {
                title: "Manage Meal",
                url: "/mealProvider/dashboard/food/foods/manage-food",
              },
              {
                title: "Add Meal",
                url: "/mealProvider/dashboard/food/foods/add-food",
              },
              {
                title: "Manage Order",
                url: "/mealProvider/dashboard/food/foods/manage-order",
              },
              // {
              //   title: "Update Food",
              //   url: "/mealProvider/dashboard/food/foods/update-food/:foodId",
              // },
            ],
          },
          {
            title: "Profile",
            url: "/profile",
            icon: Settings,
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
        ]
      : user?.role === "student"
      ? [
          {
            title: "Dashboard",
            url: "/admin/dashboard",
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
