"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type Language = "en" | "hi" | "ar"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
  isRTL: boolean
}

const translations = {
  en: {
    "nav.home": "Home",
    "nav.about": "About",
    "nav.login": "Login",
    "nav.partner": "Become a Partner",
    "hero.title": "Empowering Micro-Entrepreneurs Through Education",
    "hero.subtitle": "Join Vruksh Ekatra platform to access educational micro-content and build stronger communities",
    "stats.lives": "Lives Impacted",
    "stats.ngos": "NGO Partners",
    "stats.courses": "Courses Available",
    "login.title": "Welcome Back",
    "login.subtitle": "Choose your role to continue",
    "login.admin": "Admin",
    "login.ngo": "NGO Partner",
    "login.student": "Student",
    "dashboard.welcome": "Welcome to Dashboard",
    "signup.title": "Become a Partner",
    "signup.subtitle": "Join our network of educational partners",
    "signup.ngoName": "NGO Name",
    "signup.country": "Country",
    "signup.email": "Admin Email",
    "signup.phone": "Phone Number",
    "signup.password": "Create Password",
    "signup.confirmPassword": "Confirm Password",
    "signup.submit": "Register NGO",
    "admin.manageNgos": "Manage NGOs",
    "admin.analytics": "Analytics",
    "admin.settings": "Settings",
    "admin.generateReport": "Generate Report",
    "ngo.addStudent": "Add Student",
    "ngo.addCourse": "Add Course",
    "ngo.viewCourses": "View Courses",
    "about.title": "About Vruksh Ekatra",
    "about.description":
      "Vruksh Ekatra is dedicated to empowering micro-entrepreneurs and underserved communities through innovative educational technology and community engagement.",
    "about.mission":
      "Our mission is to bridge the digital divide and provide equitable access to quality education for all.",
    "ekatra.title": "Ekatra – A Low-Data, High-Impact Learning Platform",
    "ekatra.description":
      "Ekatra is the first low data / no data learning platform. As per a report by Stanford's Center for Education Policy Analysis, text message learning is remarkably accessible and effective. Ekatra helps institutions create, deploy, and assess text message-based micro-courses that dramatically improve learning and training.",
    "ekatra.features":
      "We use spaced learning and microlearning models that significantly boost retention and engagement compared to standard digital platforms. Despite the effectiveness, text message learning is often overlooked—Ekatra empowers nonprofits and learning organizations to close this gap.",
    "ekatra.delivery":
      "Once courses are uploaded, educators can choose timing and delivery modes (SMS or WhatsApp). Visual cues are sent via images and audio calls enable synchronous doubt-solving sessions.",
    "why.title": "Why Are We Building This?",
    "why.description":
      "The digital divide between urban and rural students is widening. Many students lack access to OTT-based learning. Ekatra is designed for underserved communities, offering equitable access to education.",
    "why.stats": "With our shift from OTT tools to phone/audio/SMS-based tools, we've seen:",
    "why.stat1": "15x increase in student signups with phone audio vs. Zoom",
    "why.stat2": "30% increase in responses using SMS over WhatsApp",
    "covid.title": "COVID Relevance",
    "covid.description":
      "Over 1.05 billion global learners were impacted by COVID-19 school closures. In India, 285 million learners were affected. Ekatra bridges the gap caused by digital exclusion during such crises.",
    "team.title": "Team",
    "team.abheejit": "Abheejit (Founder & CEO) – 10+ years in consulting, ex-Tata Trusts",
    "team.ramsha": "Ramsha – Leads backend & R&D",
    "team.mahima": "Mahima – Heads Product GTM",
    "credits.title": "Special Credits",
    "credits.kalpit": "Kalpit Bhawalkar – AI Research Mentor",
    "credits.jitendra": "Jitendra Gupta – Tech Advisor",
    "credits.hrishikesh": "Hrishikesh Somchatwar – Security Expert",
    "credits.gopal": "Dr. Gopal Sakarkar – NLP Research Support",
  },
  hi: {
    "nav.home": "होम",
    "nav.about": "के बारे में",
    "nav.login": "लॉगिन",
    "nav.partner": "पार्टनर बनें",
    "hero.title": "शिक्षा के माध्यम से सूक्ष्म उद्यमियों को सशक्त बनाना",
    "hero.subtitle": "शैक्षिक माइक्रो-कंटेंट तक पहुंचने और मजबूत समुदाय बनाने के लिए वृक्ष एकत्र प्लेटफॉर्म से जुड़ें",
    "stats.lives": "प्रभावित जीवन",
    "stats.ngos": "एनजीओ पार्टनर",
    "stats.courses": "उपलब्ध कोर्स",
    "login.title": "वापसी पर स्वागत है",
    "login.subtitle": "जारी रखने के लिए अपनी भूमिका चुनें",
    "login.admin": "व्यवस्थापक",
    "login.ngo": "एनजीओ पार्टनर",
    "login.student": "छात्र",
    "dashboard.welcome": "डैशबोर्ड में आपका स्वागत है",
    "signup.title": "पार्टनर बनें",
    "signup.subtitle": "हमारे शैक्षिक भागीदारों के नेटवर्क में शामिल हों",
    "signup.ngoName": "एनजीओ का नाम",
    "signup.country": "देश",
    "signup.email": "व्यवस्थापक ईमेल",
    "signup.phone": "फोन नंबर",
    "signup.password": "पासवर्ड बनाएं",
    "signup.confirmPassword": "पासवर्ड की पुष्टि करें",
    "signup.submit": "एनजीओ पंजीकृत करें",
    "admin.manageNgos": "एनजीओ प्रबंधन",
    "admin.analytics": "विश्लेषण",
    "admin.settings": "सेटिंग्स",
    "admin.generateReport": "रिपोर्ट जेनरेट करें",
    "ngo.addStudent": "छात्र जोड़ें",
    "ngo.addCourse": "कोर्स जोड़ें",
    "ngo.viewCourses": "कोर्स देखें",
    "about.title": "वृक्ष एकत्र के बारे में",
    "about.description":
      "वृक्ष एकत्र नवाचार शैक्षिक प्रौद्योगिकी और सामुदायिक सहभागिता के माध्यम से सूक्ष्म उद्यमियों और वंचित समुदायों को सशक्त बनाने के लिए समर्पित है।",
    "about.mission": "हमारा मिशन डिजिटल विभाजन को पाटना और सभी के लिए गुणवत्तापूर्ण शिक्षा तक समान पहुंच प्रदान करना है।",
    "ekatra.title": "एकत्र – एक कम डेटा, उच्च प्रभाव शिक्षण मंच",
    "why.title": "हम इसे क्यों बना रहे हैं?",
    "covid.title": "कोविड प्रासंगिकता",
    "team.title": "टीम",
    "credits.title": "विशेष श्रेय",
  },
  ar: {
    "nav.home": "الرئيسية",
    "nav.about": "حول",
    "nav.login": "تسجيل الدخول",
    "nav.partner": "كن شريكاً",
    "hero.title": "تمكين رواد الأعمال الصغار من خلال التعليم",
    "hero.subtitle": "انضم إلى منصة فروكش إيكاترا للوصول إلى المحتوى التعليمي المصغر وبناء مجتمعات أقوى",
    "stats.lives": "الأرواح المتأثرة",
    "stats.ngos": "شركاء المنظمات غير الحكومية",
    "stats.courses": "الدورات المتاحة",
    "login.title": "مرحباً بعودتك",
    "login.subtitle": "اختر دورك للمتابعة",
    "login.admin": "مدير",
    "login.ngo": "شريك منظمة غير حكومية",
    "login.student": "طالب",
    "dashboard.welcome": "مرحباً بك في لوحة التحكم",
    "signup.title": "كن شريكاً",
    "signup.subtitle": "انضم إلى شبكة شركائنا التعليميين",
    "signup.ngoName": "اسم المنظمة",
    "signup.country": "البلد",
    "signup.email": "البريد الإلكتروني للمدير",
    "signup.phone": "رقم الهاتف",
    "signup.password": "إنشاء كلمة مرور",
    "signup.confirmPassword": "تأكيد كلمة المرور",
    "signup.submit": "تسجيل المنظمة",
    "admin.manageNgos": "إدارة المنظمات",
    "admin.analytics": "التحليلات",
    "admin.settings": "الإعدادات",
    "admin.generateReport": "إنشاء تقرير",
    "ngo.addStudent": "إضافة طالب",
    "ngo.addCourse": "إضافة دورة",
    "ngo.viewCourses": "عرض الدورات",
    "about.title": "حول فروكش إيكاترا",
    "about.description":
      "فروكش إيكاترا مكرسة لتمكين رواد الأعمال الصغار والمجتمعات المحرومة من خلال التكنولوجيا التعليمية المبتكرة والمشاركة المجتمعية.",
    "about.mission": "مهمتنا هي سد الفجوة الرقمية وتوفير الوصول العادل إلى التعليم الجيد للجميع.",
    "ekatra.title": "إيكاترا – منصة تعلم منخفضة البيانات عالية التأثير",
    "why.title": "لماذا نبني هذا؟",
    "covid.title": "صلة كوفيد",
    "team.title": "الفريق",
    "credits.title": "شكر خاص",
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")
  const isRTL = language === "ar"

  useEffect(() => {
    document.documentElement.dir = isRTL ? "rtl" : "ltr"
    document.documentElement.lang = language
  }, [language, isRTL])

  const t = (key: string): string => {
    return translations[language][key as keyof (typeof translations)["en"]] || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t, isRTL }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
