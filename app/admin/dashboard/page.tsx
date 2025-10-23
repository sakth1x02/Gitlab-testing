"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import AdminLayout from "@/components/admin/admin-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Users,
  FileText,
  Shield,
  DollarSign,
  Activity,
  Server,
  Database,
  Cloud,
  CheckCircle,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react"

export default function AdminDashboard() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const auth = localStorage.getItem("adminAuth")
    const userData = localStorage.getItem("adminUser")

    if (!auth) {
      router.push("/admin")
    } else {
      setIsAuthenticated(true)
      if (userData) {
        try {
          setUser(JSON.parse(userData))
        } catch (error) {
          console.error("Error parsing user data:", error)
          setUser({ name: "Admin User", email: "admin@hads.com" })
        }
      } else {
        setUser({ name: "Admin User", email: "admin@hads.com" })
      }
    }
    setIsLoading(false)
  }, [router])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-hads-purple border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  const stats = [
    {
      title: "Total Users",
      value: "2,847",
      change: "+12.5%",
      changeType: "increase",
      icon: Users,
      color: "bg-blue-500",
      lightColor: "bg-blue-50",
      textColor: "text-blue-600",
    },
    {
      title: "Active Projects",
      value: "156",
      change: "+8.2%",
      changeType: "increase",
      icon: FileText,
      color: "bg-green-500",
      lightColor: "bg-green-50",
      textColor: "text-green-600",
    },
    {
      title: "Security Alerts",
      value: "3",
      change: "-25.0%",
      changeType: "decrease",
      icon: Shield,
      color: "bg-red-500",
      lightColor: "bg-red-50",
      textColor: "text-red-600",
    },
    {
      title: "Monthly Revenue",
      value: "$45,231",
      change: "+15.3%",
      changeType: "increase",
      icon: DollarSign,
      color: "bg-purple-500",
      lightColor: "bg-purple-50",
      textColor: "text-purple-600",
    },
  ]

  const recentActivities = [
    {
      action: "New user registration",
      user: "john.doe@company.com",
      time: "2 minutes ago",
      type: "user",
      icon: Users,
      color: "text-blue-600",
    },
    {
      action: "Security scan completed",
      user: "System",
      time: "15 minutes ago",
      type: "security",
      icon: Shield,
      color: "text-green-600",
    },
    {
      action: "Database backup created",
      user: "Automated",
      time: "1 hour ago",
      type: "system",
      icon: Database,
      color: "text-purple-600",
    },
    {
      action: "Payment processed",
      user: "sarah.wilson@client.com",
      time: "2 hours ago",
      type: "payment",
      icon: DollarSign,
      color: "text-green-600",
    },
    {
      action: "Server maintenance scheduled",
      user: "Admin",
      time: "3 hours ago",
      type: "maintenance",
      icon: Server,
      color: "text-orange-600",
    },
  ]

  const systemServices = [
    {
      service: "API Gateway",
      status: "Online",
      uptime: "99.9%",
      responseTime: "45ms",
      statusColor: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      service: "Database Cluster",
      status: "Online",
      uptime: "99.8%",
      responseTime: "12ms",
      statusColor: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      service: "CDN Network",
      status: "Online",
      uptime: "100%",
      responseTime: "8ms",
      statusColor: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      service: "Backup Service",
      status: "Warning",
      uptime: "99.5%",
      responseTime: "120ms",
      statusColor: "text-yellow-600",
      bgColor: "bg-yellow-100",
    },
    {
      service: "Monitoring",
      status: "Online",
      uptime: "99.9%",
      responseTime: "25ms",
      statusColor: "text-green-600",
      bgColor: "bg-green-100",
    },
  ]

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Welcome Header */}
        <div className="bg-gradient-to-r from-hads-purple to-hads-teal rounded-2xl p-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.name || "Admin"}! 👋</h1>
              <p className="text-white/90 text-lg">Here's what's happening with your cloud infrastructure today.</p>
            </div>
            <div className="hidden md:block">
              <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center">
                <Activity className="h-12 w-12 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
                <div className={`p-2 rounded-lg ${stat.lightColor}`}>
                  <stat.icon className={`h-5 w-5 ${stat.textColor}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="flex items-center space-x-2">
                  {stat.changeType === "increase" ? (
                    <ArrowUpRight className="h-4 w-4 text-green-600" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4 text-red-600" />
                  )}
                  <span
                    className={`text-sm font-medium ${
                      stat.changeType === "increase" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {stat.change}
                  </span>
                  <span className="text-sm text-gray-500">from last month</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-lg">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl font-bold text-gray-900">Recent Activity</CardTitle>
                    <CardDescription className="text-gray-600">
                      Latest system activities and user actions
                    </CardDescription>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-hads-purple border-hads-purple hover:bg-hads-purple hover:text-white bg-transparent"
                  >
                    View All
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <div
                      key={index}
                      className="flex items-start space-x-4 p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                    >
                      <div className={`p-2 rounded-full bg-white shadow-sm`}>
                        <activity.icon className={`h-4 w-4 ${activity.color}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                        <p className="text-sm text-gray-600">{activity.user}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-3 w-3 text-gray-400" />
                        <span className="text-xs text-gray-500">{activity.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* System Status */}
          <div>
            <Card className="border-0 shadow-lg">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-bold text-gray-900">System Status</CardTitle>
                <CardDescription className="text-gray-600">Current infrastructure health</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {systemServices.map((service, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-3 h-3 rounded-full ${
                            service.status === "Online"
                              ? "bg-green-500"
                              : service.status === "Warning"
                                ? "bg-yellow-500"
                                : "bg-red-500"
                          }`}
                        />
                        <div>
                          <p className="text-sm font-medium text-gray-900">{service.service}</p>
                          <p className="text-xs text-gray-500">{service.responseTime} avg</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`text-sm font-medium ${service.statusColor}`}>{service.status}</p>
                        <p className="text-xs text-gray-500">{service.uptime}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Overall Health</span>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm font-medium text-green-600">Excellent</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Quick Actions */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-gray-900">Quick Actions</CardTitle>
            <CardDescription className="text-gray-600">Frequently used administrative tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: "Add User", icon: Users, color: "bg-blue-500" },
                { name: "Deploy Service", icon: Cloud, color: "bg-green-500" },
                { name: "Security Scan", icon: Shield, color: "bg-red-500" },
                { name: "Generate Report", icon: FileText, color: "bg-purple-500" },
              ].map((action, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="h-20 flex-col space-y-2 hover:bg-gray-50 border-gray-200 bg-transparent"
                >
                  <div className={`p-2 rounded-lg ${action.color}`}>
                    <action.icon className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-sm font-medium">{action.name}</span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
