"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import AdminLayout from "@/components/admin/admin-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Settings, Save, Globe, Mail, Shield, Database, Bell, Palette, Key } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface SystemSettings {
  siteName: string
  siteDescription: string
  siteUrl: string
  adminEmail: string
  supportEmail: string
  timezone: string
  language: string
  maintenanceMode: boolean
  allowRegistration: boolean
  emailNotifications: boolean
  smsNotifications: boolean
  backupFrequency: string
  maxFileSize: string
  allowedFileTypes: string[]
  primaryColor: string
  secondaryColor: string
  logoUrl: string
  faviconUrl: string
}

export default function SettingsPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const [settings, setSettings] = useState<SystemSettings>({
    siteName: "HADS TechNovations",
    siteDescription: "Leading cloud migration and DevOps automation services",
    siteUrl: "https://hadstechnovations.com",
    adminEmail: "admin@hadstechnovations.com",
    supportEmail: "support@hadstechnovations.com",
    timezone: "America/New_York",
    language: "en",
    maintenanceMode: false,
    allowRegistration: true,
    emailNotifications: true,
    smsNotifications: false,
    backupFrequency: "daily",
    maxFileSize: "10MB",
    allowedFileTypes: ["jpg", "jpeg", "png", "gif", "pdf", "doc", "docx"],
    primaryColor: "#8B5CF6",
    secondaryColor: "#06B6D4",
    logoUrl: "/images/hads-logo.png",
    faviconUrl: "/favicon.ico",
  })

  const isDisabled = true

  useEffect(() => {
    const auth = localStorage.getItem("adminAuth")
    if (!auth) {
      router.push("/admin")
    } else {
      setIsAuthenticated(true)
      loadSettings()
    }
    setIsLoading(false)
  }, [router])

  const loadSettings = () => {
    console.log("Settings loaded")
  }

  const updateSetting = (key: keyof SystemSettings, value: any) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  const addFileType = () => {
    if (isDisabled) return
    const newType = prompt("Enter file extension (without dot):")
    if (newType && !settings.allowedFileTypes.includes(newType.toLowerCase())) {
      updateSetting("allowedFileTypes", [...settings.allowedFileTypes, newType.toLowerCase()])
    }
  }

  const removeFileType = (type: string) => {
    if (isDisabled) return
    updateSetting(
      "allowedFileTypes",
      settings.allowedFileTypes.filter((t) => t !== type),
    )
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-hads-purple border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading settings...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <AdminLayout>
      <div className="space-y-6 opacity-60 pointer-events-none">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">System Settings</h1>
            <p className="text-gray-600 mt-2">Configure system preferences and options</p>
          </div>
        </div>

        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="hidden" />
          <TabsContent value="general" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Site Information
                </CardTitle>
                <CardDescription>Basic information about your website</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="siteName">Site Name</Label>
                    <Input
                      id="siteName"
                      value={settings.siteName}
                      onChange={(e) => updateSetting("siteName", e.target.value)}
                      disabled={isDisabled}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="siteUrl">Site URL</Label>
                    <Input
                      id="siteUrl"
                      value={settings.siteUrl}
                      onChange={(e) => updateSetting("siteUrl", e.target.value)}
                      disabled={isDisabled}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="siteDescription">Site Description</Label>
                  <Textarea
                    id="siteDescription"
                    value={settings.siteDescription}
                    onChange={(e) => updateSetting("siteDescription", e.target.value)}
                    rows={3}
                    disabled={isDisabled}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <select
                      id="timezone"
                      value={settings.timezone}
                      onChange={(e) => updateSetting("timezone", e.target.value)}
                      disabled={isDisabled}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    >
                      <option value="America/New_York">Eastern Time (ET)</option>
                      <option value="America/Chicago">Central Time (CT)</option>
                      <option value="America/Denver">Mountain Time (MT)</option>
                      <option value="America/Los_Angeles">Pacific Time (PT)</option>
                      <option value="UTC">UTC</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="language">Language</Label>
                    <select
                      id="language"
                      value={settings.language}
                      onChange={(e) => updateSetting("language", e.target.value)}
                      disabled={isDisabled}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    >
                      <option value="en">English</option>
                      <option value="es">Spanish</option>
                      <option value="fr">French</option>
                      <option value="de">German</option>
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="email" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  Email Configuration
                </CardTitle>
                <CardDescription>Configure email settings and notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="adminEmail">Admin Email</Label>
                    <Input
                      id="adminEmail"
                      type="email"
                      value={settings.adminEmail}
                      onChange={(e) => updateSetting("adminEmail", e.target.value)}
                      disabled={isDisabled}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="supportEmail">Support Email</Label>
                    <Input
                      id="supportEmail"
                      type="email"
                      value={settings.supportEmail}
                      onChange={(e) => updateSetting("supportEmail", e.target.value)}
                      disabled={isDisabled}
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="emailNotifications"
                      checked={settings.emailNotifications}
                      onChange={(e) => updateSetting("emailNotifications", e.target.checked)}
                      disabled={isDisabled}
                    />
                    <Label htmlFor="emailNotifications">Enable email notifications</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="smsNotifications"
                      checked={settings.smsNotifications}
                      onChange={(e) => updateSetting("smsNotifications", e.target.checked)}
                      disabled={isDisabled}
                    />
                    <Label htmlFor="smsNotifications">Enable SMS notifications</Label>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Security Settings
                </CardTitle>
                <CardDescription>Configure security and access controls</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="maintenanceMode"
                      checked={settings.maintenanceMode}
                      onChange={(e) => updateSetting("maintenanceMode", e.target.checked)}
                      disabled={isDisabled}
                    />
                    <Label htmlFor="maintenanceMode">Enable maintenance mode</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="allowRegistration"
                      checked={settings.allowRegistration}
                      onChange={(e) => updateSetting("allowRegistration", e.target.checked)}
                      disabled={isDisabled}
                    />
                    <Label htmlFor="allowRegistration">Allow user registration</Label>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="maxFileSize">Max File Size</Label>
                    <Input
                      id="maxFileSize"
                      value={settings.maxFileSize}
                      onChange={(e) => updateSetting("maxFileSize", e.target.value)}
                      disabled={isDisabled}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Allowed File Types</Label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {settings.allowedFileTypes.map((type) => (
                        <span key={type} className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-800">
                          .{type}
                          <button
                            className="ml-1 text-red-500 hover:text-red-700"
                            onClick={() => removeFileType(type)}
                            disabled={isDisabled}
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                    <Button type="button" variant="outline" onClick={addFileType} size="sm" disabled={isDisabled}>
                      Add File Type
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="backup" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  Backup Settings
                </CardTitle>
                <CardDescription>Configure automatic backups and data retention</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="backupFrequency">Backup Frequency</Label>
                  <select
                    id="backupFrequency"
                    value={settings.backupFrequency}
                    onChange={(e) => updateSetting("backupFrequency", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    disabled={isDisabled}
                  >
                    <option value="hourly">Hourly</option>
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </div>
                <div className="flex gap-4">
                  <Button variant="outline" disabled={isDisabled}>
                    <Database className="h-4 w-4 mr-2" />
                    Create Backup Now
                  </Button>
                  <Button variant="outline" disabled={isDisabled}>
                    <Database className="h-4 w-4 mr-2" />
                    Restore from Backup
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="appearance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="h-5 w-5" />
                  Appearance Settings
                </CardTitle>
                <CardDescription>Customize the look and feel of your site</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="primaryColor">Primary Color</Label>
                    <div className="flex items-center gap-2">
                      <Input type="color" value={settings.primaryColor} disabled={isDisabled} />
                      <Input value={settings.primaryColor} disabled={isDisabled} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="secondaryColor">Secondary Color</Label>
                    <div className="flex items-center gap-2">
                      <Input type="color" value={settings.secondaryColor} disabled={isDisabled} />
                      <Input value={settings.secondaryColor} disabled={isDisabled} />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  )
}
