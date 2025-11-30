"use client"

import { useRef } from "react"
import { useInView } from "@/hooks/use-in-view"
import { cn } from "@/lib/utils"
import { useResponsive } from "@/components/responsive-context"

const PartnersSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, threshold: 0.1 })
  const { isMobile, isTablet } = useResponsive()

  const partners = [
    {
      name: "AWS",
      logo: "/images/aws-logo.svg",
      description: "Certified AWS Partner - Expertise in cloud migration, DevOps, and security",
      delay: "150ms",
    },
    {
      name: "Google Cloud",
      logo: "/images/google-cloud-logo.svg",
      description: "Specialized in Google Kubernetes Engine, Anthos, and BigQuery solutions",
      delay: "200ms",
    },
    {
      name: "Azure",
      logo: "/images/microsoft-azure-logo.svg",
      description: "Gold Partner with advanced certifications in Azure Cloud and Security",
      delay: "250ms",
    },
  ]

  return (
    <section
      ref={sectionRef}
      className="bg-white py-8 sm:py-10 md:py-12 lg:py-16 relative overflow-hidden"
      aria-labelledby="partners-heading"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 dots-pattern opacity-5" aria-hidden="true"></div>
      <div
        className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-b from-hads-purple/5 to-transparent opacity-30 blur-3xl"
        aria-hidden="true"
      ></div>

      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-8 sm:mb-10 md:mb-14">
          <div className="flex items-center mb-2">
            <div className="h-px w-6 sm:w-8 md:w-10 bg-hads-pink mr-2 sm:mr-3" aria-hidden="true"></div>
            <h2
              id="partners-heading"
              className={cn(
                "text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 transition-all duration-400 transform",
                isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              )}
            >
              Winning connections Our industry
            </h2>
          </div>

          <h3
            className={cn(
              "text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-gray-800 mt-1 transition-all duration-400 delay-50 transform",
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            )}
          >
            <span className="text-hads-pink">partnerships.</span>
          </h3>

          <p
            className={cn(
              "text-sm sm:text-base text-gray-700 mt-2 sm:mt-3 max-w-3xl transition-all duration-400 delay-100 transform",
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            )}
          >
            With 25+ powerful industry alliances, we provide access to top-tier infrastructure for seamless hybrid and
            multi-cloud operations.
          </p>
        </div>

        {/* Grid layout for partners */}
        <ul
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
          aria-labelledby="partners-heading"
        >
          {partners.map((partner, index) => (
            <li
              key={index}
              className={cn(
                "flex flex-col items-center text-center p-4 sm:p-6 md:p-8 bg-gray-50 backdrop-blur-sm rounded-lg border border-gray-200 transition-all duration-400 transform hover:bg-gray-100 hover:border-gray-300 hover:shadow-md group",
                isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              )}
              style={{ transitionDelay: isInView ? partner.delay : "0ms" }}
              aria-label={`${partner.name} - ${partner.description}`}
            >
              <div className="h-20 sm:h-24 md:h-32 flex items-center justify-center mb-4 w-full relative">
                <div
                  className="absolute inset-0 bg-gradient-to-r from-gray-100 to-white/80 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"
                  aria-hidden="true"
                ></div>
                <img
                  src={partner.logo || "/placeholder.svg"}
                  alt={`${partner.name} logo`}
                  className="max-h-12 sm:max-h-16 md:max-h-20 lg:max-h-28 w-auto object-contain relative z-10 transition-transform duration-200 group-hover:scale-105"
                />
              </div>
              <h4 className="text-sm sm:text-base md:text-lg font-semibold text-gray-800 mb-1">
                {partner.name}
              </h4>
              <p className="text-xs sm:text-sm text-gray-700">{partner.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default PartnersSection
