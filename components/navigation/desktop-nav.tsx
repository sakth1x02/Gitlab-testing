"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import serviceItems from "./service-items"
import { Aperture } from "lucide-react"

interface DesktopNavProps {
  isActive: (path: string) => boolean
  handleNavigation: (path: string, sectionId?: string) => void
}

const DesktopNav = ({ isActive, handleNavigation }: DesktopNavProps) => {
  const InsightsItems = [
    {
      icon: Aperture,
      title: "Blogs",
      description: "Latest insights and industry trends",
      path: "/blog",
    },
  ]

  return (
    <div className="hidden md:block">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link
              href="/"
              onClick={() => handleNavigation("/")}
              className={cn(
                "nav-link text-gray-800 hover:text-blue-600 px-4 py-2 transition-colors",
                isActive("/") && "text-blue-600 font-medium",
              )}
            >
              Home
            </Link>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <Link
              href="/about"
              onClick={() => handleNavigation("/about")}
              className={cn(
                "nav-link text-gray-800 hover:text-blue-600 px-4 py-2 transition-colors",
                isActive("/about") && "text-blue-600 font-medium",
              )}
            >
              About Us
            </Link>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger className="bg-transparent hover:bg-gray-50 text-gray-800 hover:text-blue-600">
              Services
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-6 w-[600px] bg-white shadow-xl border border-gray-100 rounded-xl">
                {serviceItems.map((item, index) => (
                  <Link
                    key={index}
                    href={item.path}
                    onClick={() => handleNavigation(item.path)}
                    className={cn(
                      "flex items-start p-3 rounded-lg transition-all duration-300 group",
                      isActive(item.path) ? "bg-gray-50 shadow-sm" : "hover:bg-gray-50 hover:shadow-sm",
                    )}
                  >
                    <div
                      className={cn(
                        "flex items-center justify-center h-10 w-10 rounded-full mr-3 transition-colors",
                        isActive(item.path)
                          ? "bg-blue-600/10 text-blue-600"
                          : "bg-teal-600/10 text-teal-600 group-hover:bg-blue-600/10 group-hover:text-blue-600",
                      )}
                    >
                      <item.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3
                        className={cn(
                          "text-sm font-medium transition-colors",
                          isActive(item.path) ? "text-blue-600" : "text-gray-900 group-hover:text-blue-600",
                        )}
                      >
                        {item.title}
                      </h3>
                      <p className="text-xs text-gray-500 mt-1">{item.description}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <Link
              href="/partners"
              onClick={() => handleNavigation("/partners")}
              className={cn(
                "nav-link text-gray-800 hover:text-blue-600 px-4 py-2 transition-colors",
                isActive("/partners") && "text-blue-600 font-medium",
              )}
            >
              Partners
            </Link>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <Link
              href="/contact"
              onClick={() => handleNavigation("/contact")}
              className={cn(
                "nav-link text-gray-800 hover:text-blue-600 px-4 py-2 transition-colors",
                isActive("/contact") && "text-blue-600 font-medium",
              )}
            >
              Contact Us
            </Link>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger className="bg-transparent hover:bg-gray-50 text-gray-800 hover:text-blue-600">
              Insights
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="grid grid-cols-1 gap-3 p-6 w-[300px] bg-white shadow-xl border border-gray-100 rounded-xl">
                {InsightsItems.map((item, index) => (
                  <Link
                    key={index}
                    href={item.path}
                    onClick={() => handleNavigation(item.path)}
                    className={cn(
                      "flex items-start p-3 rounded-lg transition-all duration-300 group",
                      isActive(item.path) ? "bg-gray-50 shadow-sm" : "hover:bg-gray-50 hover:shadow-sm",
                    )}
                  >
                    <div
                      className={cn(
                        "flex items-center justify-center h-10 w-10 rounded-full mr-3 transition-colors",
                        isActive(item.path)
                          ? "bg-blue-600/10 text-blue-600"
                          : "bg-teal-600/10 text-teal-600 group-hover:bg-blue-600/10 group-hover:text-blue-600",
                      )}
                    >
                      <item.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3
                        className={cn(
                          "text-sm font-medium transition-colors",
                          isActive(item.path) ? "text-blue-600" : "text-gray-900 group-hover:text-blue-600",
                        )}
                      >
                        {item.title}
                      </h3>
                      <p className="text-xs text-gray-500 mt-1">{item.description}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>

          
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  )
}

export default DesktopNav
