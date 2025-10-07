/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, X, ChevronDown } from "lucide-react";
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
  { name: "Get Registered", href: "/get-admit" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, setUser, setIsLoading } = useUser();
  const [isOpen, setIsOpen] = useState(false);

  const handleSignOut = () => {
    try {
      logout();
      setUser(null);
      setIsLoading(true);
      toast.success("Signed out successfully");
      router.push("/");

      if (protectedRoutes.some((route) => pathname.match(route))) {
        router.push("/");
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to sign out");
    }
  };

  const showGetRegistered = !(
    user?.role === "student" ||
    user?.role === "admin" ||
    user?.role === "advisor"
  );

  const filteredNavItems = navItems.filter(
    (item) => item.name !== "Get Registered" || showGetRegistered
  );

  return (
    <>
      <nav className=" backdrop-blur-md border-b border-gray-200/30 py-4 font-sansita fixed w-full top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl flex justify-between items-center">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <Link href="/" className="flex items-center gap-2 group">
              <div className="relative w-14 h-14 rounded-full overflow-hidden ring-2 ring-purple-500/20 group-hover:ring-purple-500/40 transition-all duration-300">
                <Image
                  height={64}
                  width={64}
                  src="https://i.ibb.co/MygP1k8Q/university-education-logo-design-template-free-vector.jpg"
                  alt="University Logo"
                  className="object-cover"
                />
              </div>
              {/* <span className="text-xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
                UniPortal
              </span> */}
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
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
                  className="relative  font-medium text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 transition-all duration-300 group"
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300"></span>
                </Link>
              </motion.div>
            ))}

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center gap-2 px-3 py-2 rounded-full hover:bg-gray-100 transition-all duration-200"
                  >
                    <Avatar className="h-10 w-10 cursor-pointer ring-2 ring-purple-500/30">
                      <AvatarImage
                        alt={user?.name}
                        src="https://github.com/shadcn.png"
                        className="rounded-full"
                      />
                      <AvatarFallback className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                        {user.name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <ChevronDown className="w-4 h-4 text-gray-600" />
                  </motion.button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 backdrop-blur-sm bg-white border-gray-200 shadow-lg">
                  <div className="px-4 py-3 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-purple-50">
                    <p className="text-sm font-semibold text-gray-800">
                      {user.name}
                    </p>
                    <p className="text-xs text-gray-600 capitalize">
                      {user.role}
                    </p>
                  </div>
                  <DropdownMenuItem className="focus:bg-gray-50">
                    <Link
                      href={`/${user?.role}/dashboard`}
                      className="w-full text-gray-700 hover:text-purple-600 transition-colors"
                    >
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="focus:bg-red-50">
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-transparent p-0"
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
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-none hover:from-blue-700 hover:to-purple-700 hover:shadow-lg transition-all duration-300 rounded-full"
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

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
          >
            {isOpen ? (
              <X className="w-6 h-6 text-gray-700" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl z-50 md:hidden"
          >
            <div className="h-full flex flex-col">
              {/* Sidebar Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-purple-500/30">
                    <Image
                      height={40}
                      width={40}
                      src="https://i.ibb.co/MygP1k8Q/university-education-logo-design-template-free-vector.jpg"
                      alt="University Logo"
                      className="object-cover"
                    />
                  </div>
                  <span className="text-lg font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                    UniPortal
                  </span>
                </div>
                <Button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-lg hover:bg-white transition-colors duration-200"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </Button>
              </div>

              {/* User Info */}
              {user && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="p-6 border-b border-gray-200"
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12 ring-2 ring-purple-500/30">
                      <AvatarImage
                        alt={user?.name}
                        src="https://github.com/shadcn.png"
                        className="rounded-full"
                      />
                      <AvatarFallback className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                        {user.name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-gray-800">{user.name}</p>
                      <p className="text-sm text-gray-600 capitalize">
                        {user.role}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Navigation Items */}
              <div className="flex-1 overflow-y-auto py-4">
                <div className="space-y-1 px-4">
                  {filteredNavItems.map((item, index) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 + 0.2 }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className="block px-4 py-3 rounded-lg text-gray-700 font-medium hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-purple-600 transition-all duration-200"
                      >
                        {item.name}
                      </Link>
                    </motion.div>
                  ))}

                  {user && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: filteredNavItems.length * 0.05 + 0.2,
                      }}
                    >
                      <Link
                        href={`/${user?.role}/dashboard`}
                        onClick={() => setIsOpen(false)}
                        className="block px-4 py-3 rounded-lg text-gray-700 font-medium hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-purple-600 transition-all duration-200"
                      >
                        Dashboard
                      </Link>
                    </motion.div>
                  )}
                </div>
              </div>

              {/* Bottom Actions */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="p-4 border-t border-gray-200 bg-gray-50"
              >
                {user ? (
                  <Button
                    variant="outline"
                    className="w-full bg-red-500 text-white border-none hover:bg-red-600 transition-colors duration-200"
                    onClick={() => {
                      handleSignOut();
                      setIsOpen(false);
                    }}
                  >
                    Sign Out
                  </Button>
                ) : (
                  <Button
                    asChild
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white border-none hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
                  >
                    <Link href="/login" onClick={() => setIsOpen(false)}>
                      Sign In
                    </Link>
                  </Button>
                )}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
