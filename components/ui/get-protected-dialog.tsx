"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Shield, Check } from "lucide-react"
import { useRouter } from "next/navigation"

interface GetProtectedDialogProps {
  variant?: "default" | "outline" | "ghost" | "secondary"
  size?: "default" | "sm" | "lg" | "icon"
  className?: string
  mobileFullWidth?: boolean
}

const GetProtectedDialog = ({
  variant = "default",
  size = "default",
  className = "",
  mobileFullWidth = false,
}: GetProtectedDialogProps) => {
  const router = useRouter()

  const handleContactClick = () => {
    setTimeout(() => {
      router.push("/contact")
    }, 100)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={variant}
          size={size}
          className={`flex items-center gap-2 px-5 py-5  text-white font-medium shadow-md
        bg-gradient-to-r from-blue-800 to-pink-600 hover:opacity-90 transition
        ${mobileFullWidth ? 'w-full md:w-auto' : ''} ${className}`}
        >
          <Shield size={19} />
          Get Protected
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md max-w-[95vw] mx-auto max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl flex items-center">
            <Shield className="mr-2 text-blue-600" size={20} />
            Cloud Protection Services
          </DialogTitle>
          <DialogDescription>Enterprise-grade security for your cloud infrastructure</DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <div className="space-y-4">
            <h3 className="font-medium text-lg text-gray-900">Our Security Services Include:</h3>

            <div className="grid gap-3">
              {[
                "Cloud Security Assessment",
                "Compliance Management (HIPAA, GDPR, SOC2)",
                "Threat Detection & Monitoring",
                "Identity & Access Management",
                "Data Encryption & Protection",
                "Disaster Recovery Planning",
              ].map((item, index) => (
                <div key={index} className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-2 flex-shrink-0">
                    <Check size={14} className="text-green-600" />
                  </div>
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-500 mb-4">
                Ready to secure your cloud infrastructure? Contact our security experts for a personalized consultation.
              </p>
              <DialogClose asChild>
                <Button className="w-full bg-blue-600 hover:bg-blue-700" onClick={handleContactClick}>
                  Contact Security Team
                </Button>
              </DialogClose>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default GetProtectedDialog
