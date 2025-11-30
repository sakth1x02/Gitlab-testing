"use client"

import Link from "next/link"
import { useState } from "react"
import { ChevronDown } from "lucide-react"

interface MobileNavProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

const MobileNav = ({ isOpen, setIsOpen }: MobileNavProps) => {
  const [servicesOpen, setServicesOpen] = useState(false)

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Partners", href: "/partners" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ]

  const services = [
    {
      title: "Cloud Migration",
      href: "/services/cloud-migration",
      description: "Seamless cloud migration with zero downtime",
    },
    {
      title: "Managed Services",
      href: "/services/managed-services",
      description: "24/7 cloud infrastructure management",
    },
    {
      title: "DevOps Automation",
      href: "/services/devops",
      description: "CI/CD pipelines and automation",
    },
    {
      title: "FinOps",
      href: "/services/finops",
      description: "Cloud cost optimization and management",
    },
    {
      title: "Security & Compliance",
      href: "/services/security-compliance",
      description: "GDPR, HIPAA, SOC 2 compliance",
    },
  ]

  const handleLinkClick = () => {
    setIsOpen(false)
    setServicesOpen(false)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-40 md:hidden">
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setIsOpen(false)} />
      <div className="fixed top-16 left-0 right-0 bg-white shadow-lg max-h-[calc(100vh-4rem)] overflow-y-auto">
        <div className="px-4 py-6 space-y-4">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="block py-2 text-gray-700 hover:text-blue-600 transition-colors font-medium"
              onClick={handleLinkClick}
            >
              {item.name}
            </Link>
          ))}

          {/* Services Dropdown */}
          <div>
            <button
              onClick={() => setServicesOpen(!servicesOpen)}
              className="flex items-center justify-between w-full py-2 text-gray-700 hover:text-blue-600 transition-colors font-medium"
            >
              <span>Services</span>
              <ChevronDown className={`h-4 w-4 transition-transform ${servicesOpen ? "rotate-180" : ""}`} />
            </button>

            {servicesOpen && (
              <div className="mt-2 ml-4 space-y-2">
                {services.map((service, index) => (
                  <Link
                    key={index}
                    href={service.href}
                    className="block py-2 text-sm text-gray-600 hover:text-blue-600 transition-colors"
                    onClick={handleLinkClick}
                  >
                    <div className="font-medium">{service.title}</div>
                    <div className="text-xs text-gray-500 mt-1">{service.description}</div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Mobile Actions */}
          <div className="pt-4 border-t border-gray-200">
            <Link
              href="/contact"
              className="block w-full bg-blue-600 text-white text-center py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              onClick={handleLinkClick}
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MobileNav
