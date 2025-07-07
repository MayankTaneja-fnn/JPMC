"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import { Home, Users, BookOpen, Settings, LogOut, Menu, X, Moon, Sun, Globe, Plus, BarChart3 } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useLanguage } from "@/components/language-provider"

interface DashboardLayoutProps {
  children: React.ReactNode
  role: "admin" | "ngo" | "student"
}

export function DashboardLayout({ children, role }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const { language, setLanguage, t, isRTL } = useLanguage()
  const router = useRouter()

  const adminMenuItems = [
    { icon: Home, label: "Dashboard", href: "/dashboard/admin" },
    { icon: Users, label: t("admin.manageNgos"), href: "/dashboard/admin/ngos" },
    { icon: BarChart3, label: t("admin.analytics"), href: "/dashboard/admin/analytics" },
    { icon: Settings, label: t("admin.settings"), href: "/dashboard/admin/settings" },
  ]

  const ngoMenuItems = [
    { icon: Home, label: "Dashboard", href: "/dashboard/ngo" },
    { icon: Users, label: t("ngo.addStudent"), href: "/dashboard/ngo/students" },
    { icon: Plus, label: t("ngo.addCourse"), href: "/dashboard/ngo/courses/add" },
    { icon: BookOpen, label: t("ngo.viewCourses"), href: "/dashboard/ngo/courses" },
  ]

  const studentMenuItems = [
    { icon: Home, label: "Dashboard", href: "/dashboard/student" },
    { icon: BookOpen, label: "My Courses", href: "/dashboard/student/courses" },
    { icon: Users, label: "Community", href: "/dashboard/student/community" },
    { icon: BarChart3, label: "Progress", href: "/dashboard/student/progress" },
  ]

  const menuItems = role === "admin" ? adminMenuItems : role === "ngo" ? ngoMenuItems : studentMenuItems

  const languages = [
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "hi", name: "हिंदी", flag: "🇮🇳" },
    { code: "ar", name: "العربية", flag: "🇸🇦" },
  ]

  const handleLogout = () => {
    router.push("/login")
  }

  return (
    <div className={`flex h-screen bg-gray-100 dark:bg-gray-900 ${isRTL ? "rtl" : "ltr"}`}>
      {/* Sidebar */}
      <div
        className={`${sidebarOpen ? "translate-x-0" : isRTL ? "translate-x-full" : "-translate-x-full"} fixed inset-y-0 ${isRTL ? "right-0" : "left-0"} z-50 w-64 bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}
      >
        <div
          className={`flex items-center justify-between h-16 px-6 border-b border-gray-200 dark:border-gray-700 ${isRTL ? "flex-row-reverse" : ""}`}
        >
          <div className={`flex items-center space-x-2 ${isRTL ? "space-x-reverse" : ""}`}>
            <div className="w-8 h-8 bg-gradient-to-r from-[#E68C3A] to-[#94B6EF] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">V</span>
            </div>
            <span className="text-lg font-bold text-[#213E60] dark:text-white">Vruksh</span>
          </div>
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setSidebarOpen(false)}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <nav className="mt-6 px-3">
          <div className="space-y-1">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 rounded-md hover:bg-[#94B6EF]/10 hover:text-[#213E60] dark:hover:text-white transition-colors ${isRTL ? "flex-row-reverse" : ""}`}
              >
                <item.icon className={`h-5 w-5 ${isRTL ? "ml-3" : "mr-3"}`} />
                {item.label}
              </Link>
            ))}
          </div>
        </nav>

        <div className="absolute bottom-0 w-full p-3 border-t border-gray-200 dark:border-gray-700">
          <Button
            onClick={handleLogout}
            variant="ghost"
            className={`w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 ${isRTL ? "flex-row-reverse" : ""}`}
          >
            <LogOut className={`h-5 w-5 ${isRTL ? "ml-3" : "mr-3"}`} />
            Logout
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
          <div className={`flex items-center justify-between h-16 px-6 ${isRTL ? "flex-row-reverse" : ""}`}>
            <div className={`flex items-center ${isRTL ? "flex-row-reverse" : ""}`}>
              <Button
                variant="ghost"
                size="icon"
                className={`lg:hidden ${isRTL ? "ml-2" : "mr-2"}`}
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="h-5 w-5" />
              </Button>
              <h1 className="text-xl font-semibold text-gray-900 dark:text-white capitalize">{role} Dashboard</h1>
            </div>

            <div className={`flex items-center space-x-2 ${isRTL ? "space-x-reverse" : ""}`}>
              {/* Theme Toggle */}
              <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
                <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              </Button>

              {/* Language Selector */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Globe className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align={isRTL ? "start" : "end"}>
                  {languages.map((lang) => (
                    <DropdownMenuItem
                      key={lang.code}
                      onClick={() => setLanguage(lang.code as any)}
                      className={`${language === lang.code ? "bg-[#94B6EF]/20" : ""} ${isRTL ? "flex-row-reverse" : ""}`}
                    >
                      <span className={isRTL ? "ml-2" : "mr-2"}>{lang.flag}</span>
                      {lang.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}
    </div>
  )
}
