"use client"

import { useEffect, useState } from "react"

/**
 * Returns true if the provided media-query matches the current viewport.
 *
 * @example
 *   const isMobile = useMediaQuery("(max-width: 768px)")
 */
export function useMediaQuery(query: string): boolean {
  const getMatch = () => (typeof window !== "undefined" ? window.matchMedia(query).matches : false)

  const [matches, setMatches] = useState<boolean>(getMatch)

  useEffect(() => {
    if (typeof window === "undefined") return

    const mediaQueryList = window.matchMedia(query)
    const listener = () => setMatches(mediaQueryList.matches)

    // Initial value & event listener
    listener()
    mediaQueryList.addEventListener("change", listener)

    return () => mediaQueryList.removeEventListener("change", listener)
  }, [query])

  return matches
}
