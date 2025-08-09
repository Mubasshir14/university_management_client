/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import { logout } from "../Services/AuthService";
import { useUser } from "../context/UserContext";
import Image from "next/image";
import { protectedRoutes } from "../constant";

const navItems = [
  { name: "Department", href: "/department" },
  { name: "Faculty", href: "/faculty" },
  { name: "Get Admitted", href: "/get-admit" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, setIsLoading } = useUser();
  const [isOpen, setIsOpen] = useState(false);

  const handleSignOut = () => {
    try {
      logout();
      toast.success("Signed out successfully");
      router.push("/");
      setIsLoading(true);
      if (protectedRoutes.some((route) => pathname.match(route))) {
        router.push("/");
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to sign out");
    }
  };

  const showGetAdmitted = !(
    user?.role === "student" ||
    user?.role === "advisor" ||
    user?.role === "admin"
  );

  const filteredNavItems = navItems.filter(
    (item) => item.name !== "Get Admitted" || showGetAdmitted
  );

  return (
    <nav className="bg-white/10 backdrop-blur-sm border-b border-gray-200/20 py-4 font-sansita fixed w-full top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl flex justify-between items-center">
        {/* Brand */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <Link
            href="/"
            className="text-xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600"
          >
            <Image
              height={40}
              width={40}
              src="https://i.ibb.co/MygP1k8Q/university-education-logo-design-template-free-vector.jpg"
              alt="University Logo"
            />
          </Link>
        </motion.div>
        <div className="hidden md:flex items-center gap-6">
          {filteredNavItems.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Link
                href={item.href}
                className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:bg-clip-text hover:text-transparent hover:bg-gradient-to-r hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 transition-colors duration-200 "
              >
                {item.name}
              </Link>
            </motion.div>
          ))}

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Avatar className="h-10 w-10 cursor-pointer">
                    <AvatarImage
                      alt={user?.name}
                      src="https://github.com/shadcn.png"
                      className="rounded-full"
                    />
                    <AvatarFallback className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                      {user.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </motion.div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className=" backdrop-blur-sm border-gray-600 text-gray-200">
                <DropdownMenuItem className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:text-pink-600">
                  {user.name}
                </DropdownMenuItem>
                <DropdownMenuItem className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
                  <Link
                    href={`${user?.role}/dashboard`}
                    className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600"
                  >
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Button
                    variant="outline"
                    className="w-full bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600  border-gray-600  hover:bg-blue-600/30 hover:text-blue-400"
                    onClick={handleSignOut}
                  >
                    Sign Out
                  </Button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: navItems.length * 0.1 }}
            >
              <Button
                asChild
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-none hover:from-blue-700 hover:to-purple-700 transition-all duration-300 rounded-lg"
              >
                <motion.div
                  whileTap={{ scale: 0.95 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Link href="/login">Sign In</Link>
                </motion.div>
              </Button>
            </motion.div>
          )}
        </div>
        <div className="md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-blue-800 hover:text-blue-400 hover:bg-blue-600/20"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className=" backdrop-blur-sm border-gray-600 w-[250px]"
            >
              <div className="px-3 flex flex-col gap-4 mt-4">
                {filteredNavItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      className="block bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:bg-clip-text hover:text-transparent hover:bg-gradient-to-r hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 transition-colors duration-200 hover:border-b-2 hover:border-b-pink-700"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}

                {user ? (
                  <div className=" px-3 flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        alt={user?.name}
                        src="https://github.com/shadcn.png"
                        className="rounded-full"
                      />
                      <AvatarFallback className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                        {user.name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
                        {user.name}
                      </span>
                      <Link
                        href={`${user?.role}/dashboard`}
                        className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600"
                      >
                        Dashboard
                      </Link>
                      <Button
                        variant="outline"
                        className="mt-2 bg-white/5 border-gray-600 text-gray-200 hover:bg-blue-600/30 hover:text-blue-400"
                        onClick={() => {
                          handleSignOut();
                          setIsOpen(false);
                        }}
                      >
                        Sign Out
                      </Button>
                    </div>
                  </div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: navItems.length * 0.1 }}
                  >
                    <Button
                      asChild
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white border-none hover:from-blue-700 hover:to-purple-700 transition-all duration-300 rounded-lg"
                    >
                      <motion.div
                        whileTap={{ scale: 0.95 }}
                        whileHover={{ scale: 1.05 }}
                      >
                        <Link href="/login" onClick={() => setIsOpen(false)}>
                          Sign In
                        </Link>
                      </motion.div>
                    </Button>
                  </motion.div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
