"use client"

import { useRef } from "react"
import { cn } from "@/lib/utils"
import {
  Building,
  Stethoscope,
  LandmarkIcon,
  Code,
  ShoppingCart,
  GraduationCap,
  Factory,
  Building2,
  Radio,
  Zap,
} from "lucide-react"

const IndustriesSection = () => {
  // Simple visibility state to always render animations for now
  const isInView = true

  const industries = [
    {
      icon: <Stethoscope className="w-8 h-8 text-hads-purple" />,
      name: "Healthcare",
      description: "Secure, compliant cloud solutions for hospitals, clinics, and medical research.",
    },
    {
      icon: <LandmarkIcon className="w-8 h-8 text-hads-purple" />,
      name: "Finance & Banking",
      description: "Reliable cloud infrastructure for banking apps, transactions, and analytics.",
    },
    {
      icon: <Code className="w-8 h-8 text-hads-purple" />,
      name: "Information Technology",
      description: "DevOps, CI/CD, and scalable infrastructure tailored for tech companies.",
    },
    {
      icon: <ShoppingCart className="w-8 h-8 text-hads-purple" />,
      name: "Retail & E-Commerce",
      description: "Scalable e-commerce platforms, digital storefronts, and inventory automation.",
    },
    {
      icon: <GraduationCap className="w-8 h-8 text-hads-purple" />,
      name: "Education & Research",
      description: "Cloud platforms for LMS, virtual classrooms, and academic data security.",
    },
    {
      icon: <Factory className="w-8 h-8 text-hads-purple" />,
      name: "Manufacturing & IoT",
      description: "IoT cloud integration, automation pipelines, and factory data management.",
    },
    {
      icon: <Building2 className="w-8 h-8 text-hads-purple" />,
      name: "Government",
      description: "Secure, scalable solutions for digital governance and citizen services.",
    },
    {
      icon: <Radio className="w-8 h-8 text-hads-purple" />,
      name: "Telecommunications",
      description: "High-availability solutions for network infrastructure and communications.",
    },
    {
      icon: <Zap className="w-8 h-8 text-hads-purple" />,
      name: "Energy & Utilities",
      description: "Real-time monitoring, smart grids, and analytics for sustainable operations.",
    },
  ]

  return (
    <section className="py-10 px-4 sm:px-6 lg:px-8 bg-white" aria-labelledby="industries-heading">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center mb-4">
          <div className="rounded-full bg-hads-pink/10 flex items-center justify-center w-12 h-12">
            <Building className="w-6 h-6 text-hads-purple" />
          </div>
        </div>
        <h2
          id="industries-heading"
          className={cn(
            "text-3xl md:text-4xl font-bold text-hads-dark mb-4 transition-all duration-700 transform",
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}
        >
          <span className="text-hads-pink">Industries</span>{" "}
          <span className="text-gray-800">We Cover</span>
        </h2>
        <p
          className={cn(
            "text-lg text-gray-700 max-w-3xl mx-auto transition-all duration-700 delay-100 transform",
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}
        >
          Our specialized cloud solutions cater to the unique needs of various industries.
        </p>
      </div>

      {/* Cards */}
      {/* First 6 items */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
        {industries.slice(0, 6).map(({ icon, name, description }, index) => (
          <div
            key={index}
            className={cn(
              "bg-gray-50 rounded-xl p-4 text-center shadow-sm border border-gray-100 transition-all duration-700 transform hover:scale-[1.02] hover:shadow-md",
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            )}
            style={{ transitionDelay: `${index * 100}ms` }}
          >
            <div className="mb-3 flex justify-center text-hads-purple" aria-hidden="true">
              {icon}
            </div>
            <h3 className="text-lg font-semibold text-hads-dark mb-1">{name}</h3>
            <p className="text-xs text-gray-700">{description}</p>
          </div>
        ))}
      </div>

      {/* Last 3 items, center aligned */}
      <div className="mt-6 flex justify-center flex-wrap gap-4">
        {industries.slice(6).map(({ icon, name, description }, index) => (
          <div
            key={index}
            className={cn(
              "bg-gray-50 rounded-xl p-4 text-center shadow-sm border border-gray-100 transition-all duration-700 transform hover:scale-[1.02] hover:shadow-md w-full sm:w-[45%] md:w-[30%] lg:w-[18%]",
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            )}
            style={{ transitionDelay: `${(index + 6) * 100}ms` }}
          >
            <div className="mb-3 flex justify-center text-hads-purple" aria-hidden="true">
              {icon}
            </div>
            <h3 className="text-lg font-semibold text-hads-dark mb-1">{name}</h3>
            <p className="text-xs text-gray-700">{description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default IndustriesSection
