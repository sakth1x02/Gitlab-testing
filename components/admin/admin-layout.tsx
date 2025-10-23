"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  Settings,
  FileText,
  Search,
  LogOut,
  Menu,
  X,
  Bell,
  ChevronDown,
  Activity,
  Shield,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();
  const pathname = usePathname();
  const { toast } = useToast();

  useEffect(() => {
    const userData = localStorage.getItem("adminUser");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    localStorage.removeItem("adminUser");
    toast({
      title: "Logged Out Successfully",
      description: "You have been securely logged out of the admin panel",
    });
    router.push("/admin");
  };

  const navigation = [
    {
      name: "SEO Management",
      href: "/admin/seo",
      icon: Search,
      current: pathname === "/admin/seo",
      description: "SEO Settings & Optimization",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      name: "Blog Management",
      href: "/admin/blog",
      icon: FileText,
      current: pathname === "/admin/blog",
      description: "Content & Articles",
      gradient: "from-green-500 to-teal-500",
    },
    {
      name: "Settings",
      href: "/admin/settings",
      icon: Settings,
      current: pathname === "/admin/settings",
      description: "System Configuration",
      gradient: "from-purple-500 to-pink-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 flex w-full max-w-xs flex-col bg-white shadow-2xl">
            {/* Mobile sidebar header */}
            <div className="flex h-16 items-center justify-between px-6 border-b border-gray-200">
              <div className="flex items-center space-x-3">
               <div className="relative w-[100px] h-[100px]">
                <Image
                  src="/images/hads-logo.png"
                  alt="HADS TechNovations Admin"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
                <span className="text-xl font-bold text-gray-900">
                  HADS Admin
                </span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarOpen(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Mobile navigation */}
            <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${item.current
                      ? `bg-gradient-to-r ${item.gradient} text-white shadow-lg`
                      : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  <div>
                    <div>{item.name}</div>
                    <div
                      className={`text-xs ${item.current ? "text-white/80" : "text-gray-500"
                        }`}
                    >
                      {item.description}
                    </div>
                  </div>
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-72 lg:flex-col">
        <div className="flex flex-col flex-grow bg-white border-r border-gray-200 shadow-sm">
          {/* Desktop sidebar header */}
          <div className="flex items-center h-16 px-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="relative w-[100px] h-[100px]">
                <Image
                  src="/images/hads-logo.png"
                  alt="HADS TechNovations Admin"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <div>
                <span className="text-xl font-bold text-gray-900">
                  HADS Admin
                </span>
                <p className="text-xs text-gray-500">Content Management</p>
              </div>
            </div>
          </div>

          {/* Desktop navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 group ${item.current
                    ? `bg-gradient-to-r ${item.gradient} text-white shadow-lg`
                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  }`}
              >
                <item.icon className="mr-3 h-5 w-5" />
                <div className="flex-1">
                  <div>{item.name}</div>
                  <div
                    className={`text-xs ${item.current ? "text-white/80" : "text-gray-500"
                      }`}
                  >
                    {item.description}
                  </div>
                </div>
              </Link>
            ))}
          </nav>

          {/* User section */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center space-x-3 p-3 rounded-xl bg-gray-50">
              <Avatar className="h-10 w-10">
                <AvatarImage
                  src="/placeholder.svg?height=40&width=40"
                  alt="Avatar"
                />
                <AvatarFallback className="bg-gradient-to-r from-hads-purple to-hads-teal text-white font-semibold">
                  {user?.name?.charAt(0) || "A"}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {user?.name || "Admin User"}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {user?.email || "admin@hads.com"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-72">
        {/* Top navigation */}
        <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-lg border-b border-gray-200 shadow-sm">
          <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="h-5 w-5" />
              </Button>

              {/* <div className="hidden sm:block">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="search"
                    placeholder="Search content..."
                    className="pl-10 w-80 bg-gray-50 border-gray-200 focus:bg-white focus:border-hads-purple focus:ring-hads-purple/20"
                  />
                </div>
              </div> */}
            </div>

            <div className="flex items-center space-x-4">
              {/* Notifications */}
              {/* <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  2
                </span>
              </Button> */}

              {/* User menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex items-center space-x-2 h-10 px-3"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src="/placeholder.svg?height=32&width=32"
                        alt="Avatar"
                      />
                      <AvatarFallback className="bg-gradient-to-r from-hads-purple to-hads-teal text-white text-sm">
                        {user?.name?.charAt(0) || "A"}
                      </AvatarFallback>
                    </Avatar>
                    <ChevronDown className="h-4 w-4 text-gray-500" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-64" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-2 p-2">
                      <p className="text-sm font-medium text-gray-900">
                        {user?.name || "Admin User"}
                      </p>
                      <p className="text-xs text-gray-500">
                        {user?.email || "admin@hads.com"}
                      </p>
                      <div className="flex items-center space-x-2 text-xs text-gray-500">
                        <Activity className="h-3 w-3" />
                        {/* <span>Last login: Today at 9:42 AM</span> */}
                        <span>
                          {/* Last login: Today at{" "}
                          {new Date().toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })} */}
                          Last login: {new Date().toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </DropdownMenuLabel>
                  {/* <DropdownMenuSeparator /> */}
                  {/* <DropdownMenuItem className="cursor-pointer">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Account Settings</span>
                  </DropdownMenuItem> */}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="cursor-pointer text-red-600 focus:text-red-600"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sign Out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
