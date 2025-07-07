"use client"

import type React from "react"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useLanguage } from "@/components/language-provider"
import { Building, Mail, Phone, Lock, Eye, EyeOff, CheckCircle } from "lucide-react"
import { useRouter } from "next/navigation"

export default function PartnerSignupPage() {
  const { t, isRTL } = useLanguage()
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const [formData, setFormData] = useState({
    ngoName: "",
    country: "",
    adminEmail: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const countries = [
    "Afghanistan",
    "Algeria",
    "Bahrain",
    "Bangladesh",
    "Egypt",
    "India",
    "Indonesia",
    "Iraq",
    "Jordan",
    "Kuwait",
    "Lebanon",
    "Malaysia",
    "Morocco",
    "Pakistan",
    "Palestine",
    "Qatar",
    "Saudi Arabia",
    "Syria",
    "Tunisia",
    "Turkey",
    "UAE",
    "Yemen",
  ]

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.ngoName.trim()) newErrors.ngoName = "NGO name is required"
    if (!formData.country) newErrors.country = "Country is required"
    if (!formData.adminEmail.trim()) newErrors.adminEmail = "Email is required"
    else if (!/\S+@\S+\.\S+/.test(formData.adminEmail)) newErrors.adminEmail = "Email is invalid"
    if (!formData.phoneNumber.trim()) newErrors.phoneNumber = "Phone number is required"
    if (!formData.password) newErrors.password = "Password is required"
    else if (formData.password.length < 8) newErrors.password = "Password must be at least 8 characters"
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      // Store NGO data in localStorage for demo purposes
      const existingNGOs = JSON.parse(localStorage.getItem("ngos") || "[]")
      const newNGO = {
        id: Date.now(),
        name: formData.ngoName,
        country: formData.country,
        adminEmail: formData.adminEmail,
        phoneNumber: formData.phoneNumber,
        activeStudents: 0,
        teachers: 1,
        registrationDate: new Date().toISOString(),
        status: "active",
      }

      existingNGOs.push(newNGO)
      localStorage.setItem("ngos", JSON.stringify(existingNGOs))

      setIsSubmitting(false)
      setIsSuccess(true)

      // Redirect after 3 seconds
      setTimeout(() => {
        router.push("/login")
      }, 3000)
    }, 2000)
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#F4F2EF] to-white dark:from-gray-900 dark:to-gray-800">
        <Navbar />
        <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] p-4">
          <Card className="w-full max-w-md text-center">
            <CardContent className="p-8">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Registration Successful!</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Your NGO has been registered successfully. You will be redirected to the login page shortly.
              </p>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full animate-pulse" style={{ width: "100%" }}></div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-[#F4F2EF] to-white dark:from-gray-900 dark:to-gray-800 ${isRTL ? "rtl" : "ltr"}`}
    >
      <Navbar />

      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] p-4">
        <Card className="w-full max-w-2xl">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-[#E68C3A] to-[#94B6EF] rounded-full flex items-center justify-center mx-auto mb-4">
              <Building className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold text-[#213E60] dark:text-white">{t("signup.title")}</CardTitle>
            <CardDescription className="text-lg">{t("signup.subtitle")}</CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* NGO Name */}
                <div className="space-y-2">
                  <Label htmlFor="ngoName">{t("signup.ngoName")}</Label>
                  <Input
                    id="ngoName"
                    value={formData.ngoName}
                    onChange={(e) => setFormData((prev) => ({ ...prev, ngoName: e.target.value }))}
                    placeholder="Enter NGO name"
                    className={errors.ngoName ? "border-red-500" : ""}
                  />
                  {errors.ngoName && <p className="text-red-500 text-sm">{errors.ngoName}</p>}
                </div>

                {/* Country */}
                <div className="space-y-2">
                  <Label htmlFor="country">{t("signup.country")}</Label>
                  <Select
                    value={formData.country}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, country: value }))}
                  >
                    <SelectTrigger className={errors.country ? "border-red-500" : ""}>
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      {countries.map((country) => (
                        <SelectItem key={country} value={country}>
                          {country}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.country && <p className="text-red-500 text-sm">{errors.country}</p>}
                </div>

                {/* Admin Email */}
                <div className="space-y-2">
                  <Label htmlFor="adminEmail">{t("signup.email")}</Label>
                  <div className="relative">
                    <Mail
                      className={`absolute ${isRTL ? "right-3" : "left-3"} top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4`}
                    />
                    <Input
                      id="adminEmail"
                      type="email"
                      value={formData.adminEmail}
                      onChange={(e) => setFormData((prev) => ({ ...prev, adminEmail: e.target.value }))}
                      placeholder="admin@ngo.org"
                      className={`${isRTL ? "pr-10" : "pl-10"} ${errors.adminEmail ? "border-red-500" : ""}`}
                    />
                  </div>
                  {errors.adminEmail && <p className="text-red-500 text-sm">{errors.adminEmail}</p>}
                </div>

                {/* Phone Number */}
                <div className="space-y-2">
                  <Label htmlFor="phoneNumber">{t("signup.phone")}</Label>
                  <div className="relative">
                    <Phone
                      className={`absolute ${isRTL ? "right-3" : "left-3"} top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4`}
                    />
                    <Input
                      id="phoneNumber"
                      type="tel"
                      value={formData.phoneNumber}
                      onChange={(e) => setFormData((prev) => ({ ...prev, phoneNumber: e.target.value }))}
                      placeholder="+1 234 567 8900"
                      className={`${isRTL ? "pr-10" : "pl-10"} ${errors.phoneNumber ? "border-red-500" : ""}`}
                    />
                  </div>
                  {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber}</p>}
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <Label htmlFor="password">{t("signup.password")}</Label>
                  <div className="relative">
                    <Lock
                      className={`absolute ${isRTL ? "right-3" : "left-3"} top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4`}
                    />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
                      placeholder="Create a strong password"
                      className={`${isRTL ? "pr-10 pl-10" : "pl-10 pr-10"} ${errors.password ? "border-red-500" : ""}`}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className={`absolute ${isRTL ? "left-2" : "right-2"} top-1/2 -translate-y-1/2 h-8 w-8`}
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                  {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                </div>

                {/* Confirm Password */}
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">{t("signup.confirmPassword")}</Label>
                  <div className="relative">
                    <Lock
                      className={`absolute ${isRTL ? "right-3" : "left-3"} top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4`}
                    />
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData((prev) => ({ ...prev, confirmPassword: e.target.value }))}
                      placeholder="Confirm your password"
                      className={`${isRTL ? "pr-10 pl-10" : "pl-10 pr-10"} ${errors.confirmPassword ? "border-red-500" : ""}`}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className={`absolute ${isRTL ? "left-2" : "right-2"} top-1/2 -translate-y-1/2 h-8 w-8`}
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                  {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-[#213E60] hover:bg-[#213E60]/90 text-white"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Registering..." : t("signup.submit")}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
