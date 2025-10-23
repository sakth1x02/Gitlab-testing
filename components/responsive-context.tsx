"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"

interface ResponsiveContextType {
  isMobile: boolean
  isTablet: boolean
  isDesktop: boolean
}

const ResponsiveContext = createContext<ResponsiveContextType>({
  isMobile: false,
  isTablet: false,
  isDesktop: true,
})

export function ResponsiveProvider({ children }: { children: React.ReactNode }) {
  const [dimensions, setDimensions] = useState({
    isMobile: false,
    isTablet: false,
    isDesktop: true,
  })

  useEffect(() => {
    const updateDimensions = () => {
      try {
        if (typeof window !== "undefined") {
          const width = window.innerWidth
          setDimensions({
            isMobile: width < 768,
            isTablet: width >= 768 && width < 1024,
            isDesktop: width >= 1024,
          })
        }
      } catch (error) {
        console.error("Error updating dimensions:", error)
      }
    }

    updateDimensions()

    if (typeof window !== "undefined") {
      window.addEventListener("resize", updateDimensions)
      return () => window.removeEventListener("resize", updateDimensions)
    }
  }, [])

  return <ResponsiveContext.Provider value={dimensions}>{children}</ResponsiveContext.Provider>
}

export const useResponsive = () => {
  const context = useContext(ResponsiveContext)
  if (!context) {
    throw new Error("useResponsive must be used within a ResponsiveProvider")
  }
  return context
}
