"use client"

import { useState, useEffect } from "react"
import { ArrowUp } from "lucide-react"
import { cn } from "@/lib/utils"

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false)

  // Show button when page is scrolled down
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener("scroll", toggleVisibility)
    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [])

  // Scroll to top smoothly
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <button
      onClick={scrollToTop}
      className={cn(
        "fixed bottom-8 right-8 z-50 w-16 h-16 rounded-full text-white shadow-2xl transform transition-all duration-300 flex items-center justify-center group overflow-hidden",
        isVisible ? "translate-y-0 opacity-100 scale-100" : "translate-y-16 opacity-0 scale-75",
        "hover:scale-110 active:scale-95",
      )}
      style={{
        background: "linear-gradient(135deg, #8B5CF6 0%, #EC4899 50%, #F97316 100%)",
        boxShadow: "0 8px 32px rgba(139, 92, 246, 0.3), 0 4px 16px rgba(236, 72, 153, 0.2)",
      }}
      aria-label="Scroll to top"
    >
      {/* Inner circle with subtle border */}
      <div className="absolute inset-2 rounded-full border border-white/20 flex items-center justify-center">
        <ArrowUp
          size={20}
          className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-110"
          strokeWidth={2.5}
        />
      </div>

      {/* Hover glow effect */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 group-hover:opacity-30 transition-opacity duration-300 blur-sm" />

      {/* Ripple effect on click */}
      <div className="absolute inset-0 rounded-full bg-white opacity-0 group-active:opacity-20 group-active:animate-ping transition-opacity duration-150" />
    </button>
  )
}

export default ScrollToTop
