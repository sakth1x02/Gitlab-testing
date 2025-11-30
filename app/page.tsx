"use client"

import { Suspense } from "react"
import dynamic from "next/dynamic"

// Dynamically import components to prevent SSR issues
const HeroSection = dynamic(() => import("@/components/sections/hero-section"), {
  ssr: false,
  loading: () => <div className="h-screen flex items-center justify-center">Loading...</div>,
})

const ServicesSection = dynamic(() => import("@/components/sections/services-section"), {
  ssr: false,
  loading: () => <div className="h-64 flex items-center justify-center">Loading services...</div>,
})

const EnhancedCloudRoadmap = dynamic(() => import("@/components/sections/enhanced-cloud-roadmap"), {
  ssr: false,
  loading: () => <div className="h-64 flex items-center justify-center">Loading roadmap...</div>,
})

const GlobalCoverageSection = dynamic(() => import("@/components/sections/global-coverage-section"), {
  ssr: false,
  loading: () => <div className="h-64 flex items-center justify-center">Loading coverage...</div>,
})

const IndustriesSection = dynamic(() => import("@/components/sections/industries-section"), {
  ssr: false,
  loading: () => <div className="h-64 flex items-center justify-center">Loading industries...</div>,
})

const ResourcesSection = dynamic(() => import("@/components/sections/resources-section"), {
  ssr: false,
  loading: () => <div className="h-64 flex items-center justify-center">Loading resources...</div>,
})

const AboutSection = dynamic(() => import("@/components/sections/about-section"), {
  ssr: false,
  loading: () => <div className="h-64 flex items-center justify-center">Loading about...</div>,
})

const PartnersSection = dynamic(() => import("@/components/sections/partners-section"), {
  ssr: false,
  loading: () => <div className="h-64 flex items-center justify-center">Loading partners...</div>,
})
const Ourclientdetailssection = dynamic(() => import("@/components/sections/ourclientdetails-section"), {
  ssr: false,
  loading: () => <div className="h-64 flex items-center justify-center">Loading partners...</div>,
})

const StatsSection = dynamic(() => import("@/components/sections/stats-section"), {
  ssr: false,
  loading: () => <div className="h-64 flex items-center justify-center">Loading stats...</div>,
})

const TestimonialsSection = dynamic(() => import("@/components/sections/testimonials-section"), {
  ssr: false,
  loading: () => <div className="h-64 flex items-center justify-center">Loading testimonials...</div>,
})

const Footer = dynamic(() => import("@/components/sections/footer"), {
  ssr: false,
  loading: () => <div className="h-32 flex items-center justify-center">Loading footer...</div>,
})

const CloudMigrationExitModal = dynamic(() => import("@/components/ui/cloud-migration-exit-modal"), {
  ssr: false,
})

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Suspense fallback={<div className="h-screen flex items-center justify-center">Loading page...</div>}>
        <HeroSection />
        <ServicesSection />
        <EnhancedCloudRoadmap />
        <GlobalCoverageSection />
        <IndustriesSection />
        <ResourcesSection />
        <AboutSection />
        <PartnersSection />
        <Ourclientdetailssection />
        <StatsSection />
        <TestimonialsSection />
        <Footer />
        <CloudMigrationExitModal />
      </Suspense>
    </div>
  )
}
