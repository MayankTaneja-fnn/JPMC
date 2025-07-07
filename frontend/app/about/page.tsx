"use client"

import { Navbar } from "@/components/navbar"
import { Card, CardContent } from "@/components/ui/card"
import { useLanguage } from "@/components/language-provider"
import { Users, Target, Globe, Heart, Phone, MessageSquare, Smartphone } from "lucide-react"

export default function AboutPage() {
  const { t, isRTL } = useLanguage()

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

  const values = [
    {
      icon: Users,
      title: "Community First",
      description: "We prioritize community needs and grassroots engagement in everything we do.",
    },
    {
      icon: Target,
      title: "Impact Driven",
      description: "Every feature and decision is made with measurable social impact in mind.",
    },
    {
      icon: Globe,
      title: "Inclusive Access",
      description: "Breaking down barriers to education through low-data, accessible solutions.",
    },
    {
      icon: Heart,
      title: "Empowerment",
      description: "Empowering micro-entrepreneurs and underserved communities to thrive.",
    },
  ]

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-[#F4F2EF] to-white dark:from-gray-900 dark:to-gray-800 ${isRTL ? "rtl" : "ltr"}`}
    >
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 ${isRTL ? "text-right" : ""}`}>
            <h1 className="text-4xl lg:text-6xl font-bold text-[#213E60] dark:text-white mb-6">{t("about.title")}</h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed mb-6">
              {t("about.description")}
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-4xl mx-auto">{t("about.mission")}</p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-12 ${isRTL ? "text-right" : ""}`}>
            <h2 className="text-3xl lg:text-4xl font-bold text-[#213E60] dark:text-white mb-4">Our Values</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">The principles that guide our mission and vision</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="card-hover border-0 shadow-lg">
                <CardContent className="p-6 text-center">
                  <value.icon className="h-12 w-12 mx-auto mb-4 text-[#E68C3A]" />
                  <h3 className="text-xl font-semibold text-[#213E60] dark:text-white mb-3">{value.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{value.description}</p>
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
                <div className="text-white text-center">
                  <Smartphone className="h-16 w-16 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">App Screen {index}</h3>
                  <p className="text-sm opacity-90">Mobile Interface Preview</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ekatra Platform Description */}
      <section className="py-20 bg-gradient-to-r from-[#F4F2EF] to-white dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`space-y-16 ${isRTL ? "text-right" : ""}`}>
            {/* Main Ekatra Description */}
            <div className="space-y-8">
              <h2 className="text-3xl lg:text-4xl font-bold text-[#213E60] dark:text-white">{t("ekatra.title")}</h2>
              <div className="space-y-6 text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                <p>
                  Ekatra is the first low data / no data learning platform. As per a report by Stanford's Center for
                  Education Policy Analysis, text message learning is remarkably accessible and effective. Ekatra helps
                  institutions create, deploy, and assess text message-based micro-courses that dramatically improve
                  learning and training.
                </p>
                <p>
                  We use spaced learning and microlearning models that significantly boost retention and engagement
                  compared to standard digital platforms. Despite the effectiveness, text message learning is often
                  overlooked—Ekatra empowers nonprofits and learning organizations to close this gap.
                </p>
                <p>
                  Once courses are uploaded, educators can choose timing and delivery modes (SMS or WhatsApp). Visual
                  cues are sent via images and audio calls enable synchronous doubt-solving sessions.
                </p>
              </div>
            </div>

            {/* Why Are We Building This */}
            <div className="space-y-8">
              <h2 className="text-3xl lg:text-4xl font-bold text-[#213E60] dark:text-white">
                Why Are We Building This?
              </h2>
              <div className="space-y-6 text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                <p>
                  The digital divide between urban and rural students is widening. Many students lack access to
                  OTT-based learning. Ekatra is designed for underserved communities, offering equitable access to
                  education.
                </p>
                <p className="font-semibold">
                  With our shift from OTT tools to phone/audio/SMS-based tools, we've seen:
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="p-6 bg-[#94B6EF]/10 border-[#94B6EF]/20">
                    <div className={`flex items-center space-x-4 ${isRTL ? "space-x-reverse flex-row-reverse" : ""}`}>
                      <Phone className="h-8 w-8 text-[#213E60]" />
                      <div className={isRTL ? "text-right" : ""}>
                        <div className="text-2xl font-bold text-[#213E60] dark:text-white">15x</div>
                        <div className="text-sm">increase in student signups with phone audio vs. Zoom</div>
                      </div>
                    </div>
                  </Card>
                  <Card className="p-6 bg-[#E68C3A]/10 border-[#E68C3A]/20">
                    <div className={`flex items-center space-x-4 ${isRTL ? "space-x-reverse flex-row-reverse" : ""}`}>
                      <MessageSquare className="h-8 w-8 text-[#E68C3A]" />
                      <div className={isRTL ? "text-right" : ""}>
                        <div className="text-2xl font-bold text-[#E68C3A]">30%</div>
                        <div className="text-sm">increase in responses using SMS over WhatsApp</div>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            </div>

            {/* COVID Relevance */}
            <div className="space-y-8">
              <h2 className="text-3xl lg:text-4xl font-bold text-[#213E60] dark:text-white">COVID Relevance</h2>
              <div className="space-y-6 text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                <p>
                  Over 1.05 billion global learners were impacted by COVID-19 school closures. In India, 285 million
                  learners were affected. Ekatra bridges the gap caused by digital exclusion during such crises.
                </p>
              </div>
            </div>

            {/* Team Section */}
            <div className="space-y-8">
              <h2 className="text-3xl lg:text-4xl font-bold text-[#213E60] dark:text-white">Team</h2>
              <div className="grid md:grid-cols-3 gap-8">
                {teamMembers.map((member, index) => (
                  <Card key={index} className="p-6 text-center card-hover">
                    <div className="text-4xl mb-4">{member.avatar}</div>
                    <h3 className="text-xl font-semibold text-[#213E60] dark:text-white mb-2">{member.name}</h3>
                    <p className="text-[#E68C3A] font-medium mb-2">{member.role}</p>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">{member.description}</p>
                  </Card>
                ))}
              </div>
            </div>

            {/* Special Credits */}
            <div className="space-y-8">
              <h2 className="text-3xl lg:text-4xl font-bold text-[#213E60] dark:text-white">Special Credits</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {credits.map((credit, index) => (
                  <Card key={index} className="p-4 bg-gray-50 dark:bg-gray-800">
                    <div className={`flex items-center space-x-3 ${isRTL ? "space-x-reverse flex-row-reverse" : ""}`}>
                      <div className="w-2 h-2 bg-[#E68C3A] rounded-full"></div>
                      <div className={isRTL ? "text-right" : ""}>
                        <p className="font-semibold text-[#213E60] dark:text-white">{credit.name}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">{credit.role}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
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
