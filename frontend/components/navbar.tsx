"use client"

import { useState } from "react"
import Link from "next/link"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Moon, Sun, Globe, Menu, X } from "lucide-react"
import { useLanguage } from "@/components/language-provider"

export function Navbar() {
  const { theme, setTheme } = useTheme()
  const { language, setLanguage, t, isRTL } = useLanguage()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const languages = [
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "hi", name: "हिंदी", flag: "🇮🇳" },
    // { code: "ar", name: "العربية", flag: "🇸🇦" },
    // { code: "ta", name: "Tamil", flag: "🇮🇳" },
    // { code: "te", name: "Telugu", flag: "🇮🇳" }
  ]

  return (
    <nav
      className={`bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50 ${isRTL ? "rtl" : "ltr"}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex justify-between items-center h-16 ${isRTL ? "flex-row-reverse" : ""}`}>
          {/* Logo */}
          <Link href="/" className={`flex items-center space-x-2 ${isRTL ? "space-x-reverse" : ""}`}>
            <div className="w-8 h-8 bg-gradient-to-r from-[#E68C3A] to-[#94B6EF] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">V</span>
            </div>
            <span className="text-xl font-bold text-[#213E60] dark:text-[#94B6EF]">Vruksh Ekatra</span>
          </Link>

          {/* Desktop Navigation */}
          <div className={`hidden md:flex items-center space-x-8 ${isRTL ? "space-x-reverse" : ""}`}>
            <Link href="/" className="text-gray-700 dark:text-gray-300 hover:text-[#E68C3A] transition-colors">
              {t("nav.home")}
            </Link>
            <Link href="/about" className="text-gray-700 dark:text-gray-300 hover:text-[#E68C3A] transition-colors">
              {t("nav.about")}
            </Link>

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

            <Link href="/login">
              <Button variant="outline" className="border-[#E68C3A] text-[#E68C3A] hover:bg-[#E68C3A] hover:text-white">
                {t("nav.login")}
              </Button>
            </Link>
            <Link href="/partner/signup">
              <Button className="bg-[#213E60] hover:bg-[#213E60]/90 text-white">{t("nav.partner")}</Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className={`md:hidden py-4 space-y-4 ${isRTL ? "text-right" : ""}`}>
            <Link href="/" className="block text-gray-700 dark:text-gray-300 hover:text-[#E68C3A]">
              {t("nav.home")}
            </Link>
            <Link href="/about" className="block text-gray-700 dark:text-gray-300 hover:text-[#E68C3A]">
              {t("nav.about")}
            </Link>
            <div className={`flex space-x-2 pt-2 ${isRTL ? "space-x-reverse justify-end" : ""}`}>
              <Link href="/login">
                <Button variant="outline" size="sm" className="border-[#E68C3A] text-[#E68C3A]">
                  {t("nav.login")}
                </Button>
              </Link>
              <Link href="/partner/signup">
                <Button size="sm" className="bg-[#213E60] text-white">
                  {t("nav.partner")}
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
