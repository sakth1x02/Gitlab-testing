"use client"

import { useState, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"

export const useNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [isVisible, setIsVisible] = useState(true)
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setIsScrolled(currentScrollY > 5)
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsVisible(false)
      } else {
        setIsVisible(true)
      }
      setLastScrollY(currentScrollY)
    }
    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [lastScrollY])

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  const isActive = (path: string) => {
    return pathname === path
  }

  const handleNavigation = (path: string, sectionId?: string) => {
    setIsMobileMenuOpen(false)
    if (pathname !== path) {
      router.push(path)
      if (sectionId) {
        setTimeout(() => {
          const section = document.getElementById(sectionId)
          if (section) {
            section.scrollIntoView({ behavior: "smooth", block: "start" })
          }
        }, 100)
      }
    } else if (sectionId) {
      const section = document.getElementById(sectionId)
      if (section) {
        section.scrollIntoView({ behavior: "smooth", block: "start" })
      }
    }
    setIsMobileMenuOpen(false)
  }

  return {
    isScrolled,
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    isVisible,
    isActive,
    handleNavigation,
  }
}

export default useNavbar
