"use client"

import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useLanguage } from "@/components/language-provider"
import { Users, BookOpen, Globe, Heart, ArrowRight, Play, Smartphone } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const { t, isRTL } = useLanguage()

  const stats = [
    { number: "1.7M+", label: t("stats.lives"), icon: Users },
    { number: "500+", label: t("stats.ngos"), icon: Heart },
    { number: "1000+", label: t("stats.courses"), icon: BookOpen },
    { number: "50+", label: "Countries", icon: Globe },
  ]

  const partners = [
    { name: "United Nations", logo: "🇺🇳" },
    { name: "Google", logo: "🔍" },
    { name: "Microsoft", logo: "🪟" },
    { name: "UNESCO", logo: "🎓" },
  ]

  const features = [
    {
      title: "WhatsApp Integration",
      description: "Distribute educational content directly through WhatsApp for maximum reach",
      icon: "💬",
    },
    {
      title: "Micro-Learning",
      description: "Bite-sized educational modules designed for grassroots learners",
      icon: "📱",
    },
    {
      title: "Community Engagement",
      description: "Build stronger communities through collaborative learning",
      icon: "🤝",
    },
    {
      title: "Multi-Language Support",
      description: "Content available in multiple Southeast Asian languages",
      icon: "🌐",
    },
  ]

  const teamMembers = [
    {
      name: "Abheejit",
      role: "Founder & CEO",
      description: "10+ years in consulting, ex-Tata Trusts",
      avatar: "👨‍💼",
    },
    {
      name: "Ramsha",
      role: "Backend & R&D Lead",
      description: "Leads backend & R&D",
      avatar: "👩‍💻",
    },
    {
      name: "Mahima",
      role: "Product GTM Head",
      description: "Heads Product GTM",
      avatar: "👩‍💼",
    },
  ]

  const credits = [
    { name: "Kalpit Bhawalkar", role: "AI Research Mentor" },
    { name: "Jitendra Gupta", role: "Tech Advisor" },
    { name: "Hrishikesh Somchatwar", role: "Security Expert" },
    { name: "Dr. Gopal Sakarkar", role: "NLP Research Support" },
  ]

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-[#F4F2EF] to-white dark:from-gray-900 dark:to-gray-800 ${isRTL ? "rtl" : "ltr"}`}
    >
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className={`space-y-8 ${isRTL ? "text-right" : ""}`}>
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-6xl font-bold text-[#213E60] dark:text-white leading-tight">
                  {t("hero.title")}
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">{t("hero.subtitle")}</p>
              </div>

              <div className={`flex flex-col sm:flex-row gap-4 ${isRTL ? "sm:flex-row-reverse" : ""}`}>
                <Link href="/login">
                  <Button size="lg" className="bg-[#213E60] hover:bg-[#213E60]/90 text-white px-8">
                    Get Started
                    <ArrowRight className={`h-5 w-5 ${isRTL ? "mr-2" : "ml-2"}`} />
                  </Button>
                </Link>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-[#E68C3A] text-[#E68C3A] hover:bg-[#E68C3A] hover:text-white px-8"
                >
                  <Play className={`h-5 w-5 ${isRTL ? "ml-2" : "mr-2"}`} />
                  Watch Demo
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="w-full h-96 bg-gradient-to-r from-[#94B6EF] to-[#E68C3A] rounded-2xl flex items-center justify-center">
                <div className="text-white text-center">
                  <div className="text-6xl mb-4">🌱</div>
                  <h3 className="text-2xl font-bold">Growing Together</h3>
                  <p className="text-lg opacity-90">Through Education & Community</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center card-hover border-0 shadow-lg">
                <CardContent className="p-6">
                  <stat.icon className="h-8 w-8 mx-auto mb-4 text-[#E68C3A]" />
                  <div className="text-3xl font-bold text-[#213E60] dark:text-white mb-2">{stat.number}</div>
                  <div className="text-gray-600 dark:text-gray-300">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mobile App Mockups Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-12 ${isRTL ? "text-right" : ""}`}>
            <h2 className="text-3xl lg:text-4xl font-bold text-[#213E60] dark:text-white mb-4">Ekatra Mobile App</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">Experience seamless learning on any device</p>
          </div>

          <div className="flex overflow-x-auto space-x-6 pb-4">
            {[1, 2, 3, 4].map((index) => (
              <div
                key={index}
                className="flex-shrink-0 w-64 h-96 bg-gradient-to-br from-[#94B6EF] to-[#213E60] rounded-2xl flex items-center justify-center shadow-lg"
              >
                <img
                  src={`/images/mockups/mockup${index}.jpg`}
                  alt={`App Screen ${index}`}
                  className="h-80 w-auto rounded-xl shadow-md object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 ${isRTL ? "text-right" : ""}`}>
            <h2 className="text-3xl lg:text-4xl font-bold text-[#213E60] dark:text-white mb-4">Platform Features</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Discover how our platform revolutionizes grassroots education through innovative technology
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="card-hover border-0 shadow-lg">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold text-[#213E60] dark:text-white mb-3">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-16 bg-gradient-to-r from-[#F4F2EF] to-[#94B6EF]/10 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-12 ${isRTL ? "text-right" : ""}`}>
            <h2 className="text-3xl font-bold text-[#213E60] dark:text-white mb-4">Trusted Partners</h2>
            <p className="text-gray-600 dark:text-gray-300">
              Working together with global organizations to create impact
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {partners.map((partner, index) => (
              <Card key={index} className="card-hover border-0 shadow-lg">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-3">{partner.logo}</div>
                  <div className="font-semibold text-[#213E60] dark:text-white">{partner.name}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#213E60] to-[#94B6EF]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">Ready to Make an Impact?</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of educators and learners who are transforming communities through education
          </p>
          <div className={`flex flex-col sm:flex-row gap-4 justify-center ${isRTL ? "sm:flex-row-reverse" : ""}`}>
            <Link href="/login">
              <Button size="lg" className="bg-white text-[#213E60] hover:bg-gray-100 px-8">
                Start Learning Today
              </Button>
            </Link>
            <Link href="/partner/signup">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-[#213E60] px-8"
              >
                Become a Partner
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#213E60] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className={`flex items-center space-x-2 ${isRTL ? "space-x-reverse" : ""}`}>
                <div className="w-8 h-8 bg-gradient-to-r from-[#E68C3A] to-[#94B6EF] rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">V</span>
                </div>
                <span className="text-xl font-bold">Vruksh Ekatra</span>
              </div>
              <p className="text-gray-300">
                Empowering micro-entrepreneurs through education and community engagement.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Platform</h3>
              <div className="space-y-2 text-gray-300">
                <div>Features</div>
                <div>Pricing</div>
                <div>Support</div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <div className="space-y-2 text-gray-300">
                <div>About</div>
                <div>Careers</div>
                <div>Contact</div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <div className="space-y-2 text-gray-300">
                <div>Privacy</div>
                <div>Terms</div>
                <div>License</div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
            <p>&copy; 2024 Vruksh Ekatra. All rights reserved. Licensed under MIT.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
