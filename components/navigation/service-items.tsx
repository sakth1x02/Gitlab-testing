"use client"

import Link from "next/link"
import { ChevronDown } from "lucide-react"
import { useState } from "react"

const ServiceItems = () => {
  const [isOpen, setIsOpen] = useState(false)
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

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors"
      >
        <span>Services</span>
        <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
          <div className="p-4">
            {services.map((service, index) => (
              <Link
                key={index}
                href={service.href}
                className="block p-3 rounded-lg hover:bg-gray-50 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <div className="font-medium text-gray-900">{service.title}</div>
                <div className="text-sm text-gray-600 mt-1">{service.description}</div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default ServiceItems
