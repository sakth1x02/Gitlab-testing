import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "HADS Admin Dashboard",
  description: "HADS Admin Dashboard - Manage your cloud infrastructure",
}

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="min-h-screen">{children}</div>
}
