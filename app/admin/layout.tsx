import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "HADS - Innovative Cloud Solutions",
  description: "Secure admin access to HADS management dashboard",
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="min-h-screen">{children}</div>
}
