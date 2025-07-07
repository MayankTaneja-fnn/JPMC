"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/components/language-provider"
import { User, Users, GraduationCap, Eye, EyeOff } from "lucide-react"
import { useRouter } from "next/navigation"
import axios from "axios"
import { set } from "date-fns"

export default function LoginPage() {
  const { t } = useLanguage()
  const router = useRouter()
  const [selectedRole, setSelectedRole] = useState<"admin" | "ngo" | "student" | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  const [credentials, setCredentials] = useState({ email: "", password: "" ,role:""})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  // const roles = [
  //   {
  //     id: "admin" as const,
  //     title: t("login.admin"),
  //     description: "Manage platform, NGOs, and analytics",
  //     icon: User,
  //     color: "bg-red-500",
  //     demoCredentials: { email: "admin@vruksh.org", password: "admin123" },
  //   },
  //   {
  //     id: "ngo" as const,
  //     title: t("login.ngo"),
  //     description: "Create courses and manage students",
  //     icon: Users,
  //     color: "bg-blue-500",
  //     demoCredentials: { email: "ngo@vruksh.org", password: "ngo123" },
  //   },
  //   {
  //     id: "student" as const,
  //     title: t("login.student"),
  //     description: "Access courses and join community",
  //     icon: GraduationCap,
  //     color: "bg-green-500",
  //     demoCredentials: { email: "student@vruksh.org", password: "student123" },
  //   },
  // ]

  // const router = useRouter()
  const roles = [
    {
      id: "admin" as const,
      title: t("login.admin"),
      description: "Manage platform, NGOs, and analytics",
      icon: User,
      color: "bg-red-500",
      // demoCredentials: { email: "admin@vruksh.org", password: "admin123" },
    },
    {
      id: "ngo" as const,
      title: t("login.ngo"),
      description: "Create courses and manage students",
      icon: Users,
      color: "bg-blue-500",
      // demoCredentials: { email: "ngo@vruksh.org", password: "ngo123" },
    },
    {
      id: "student" as const,
      title: t("login.student"),
      description: "Access courses and join community",
      icon: GraduationCap,
      color: "bg-green-500",
      // demoCredentials: { email: "student@vruksh.org", password: "student123" },
    },
  ]
  // const roles = [
  // { id: "admin", label: "Admin" },
  // { id: "educator", label: "Educator" },
  // ]

  const handleLogin = async () => {
    setLoading(true)
    setError(null)
    setSuccess(false)
    try {
      const res = await axios.post("https://jpmc-j87f.onrender.com/api/auth/login", {
        username: credentials.email,
        password: credentials.password,
        role: credentials.role,
      })
      localStorage.setItem("token", res.data.token);
      setSuccess(true)
      console.log(credentials)
      if (credentials.role === "admin") {
        router.push("/dashboard/admin")
      } else if (credentials.role === "ngo") {
        router.push("/dashboard/ngo")
      }
      // Handle redirect or token storage here
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed")
      setSuccess(false)
    } finally {
      setLoading(false)
    }
  }


  const handleRoleSelect = (role: typeof selectedRole) => {
    setSelectedRole(role)
    const roleData = roles.find((r) => r.id === role)
    if( roleData) {
      setCredentials((prev) => ({ ...prev, role: roleData.id}))
    }
    // if (roleData) {
    //   setCredentials(roleData.demoCredentials)
    // }
  }

  // const handleLogin = () => {
  //   if (selectedRole) {
  //     router.push(`/dashboard/${selectedRole}`)
  //   }
  // }

  // const fillDemoCredentials = () => {
  //   if (selectedRole) {
  //     const roleData = roles.find((r) => r.id === selectedRole)
  //     if (roleData) {
  //       setCredentials(roleData.demoCredentials)
  //     }
  //   }
  // }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }



  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F4F2EF] to-white dark:from-gray-900 dark:to-gray-800">
      <Navbar />

      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] p-4">
        <div className="w-full max-w-4xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl lg:text-4xl font-bold text-[#213E60] dark:text-white mb-4">{t("login.title")}</h1>
            <p className="text-gray-600 dark:text-gray-300 text-lg">{t("login.subtitle")}</p>
          </div>

          {!selectedRole ? (
            <div className="grid md:grid-cols-3 gap-6">
              {roles.map((role) => (
                <Card
                  key={role.id}
                  className="cursor-pointer card-hover border-2 hover:border-[#E68C3A] transition-all"
                  onClick={() => handleRoleSelect(role.id)}
                >
                  <CardHeader className="text-center">
                    <div
                      className={`w-16 h-16 ${role.color} rounded-full flex items-center justify-center mx-auto mb-4`}
                    >
                      <role.icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-[#213E60] dark:text-white">{role.title}</CardTitle>
                    <CardDescription>{role.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                    <Badge variant="outline" className="border-[#E68C3A] text-[#E68C3A]">
                      Click to Login
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="max-w-md mx-auto">
              <CardHeader className="text-center">
                <div className="flex items-center justify-center mb-4">
                  {(() => {
                    const role = roles.find((r) => r.id === selectedRole)
                    if (!role) return null
                    return (
                      <div className={`w-12 h-12 ${role.color} rounded-full flex items-center justify-center mr-3`}>
                        <role.icon className="h-6 w-6 text-white" />
                      </div>
                    )
                  })()}
                  <div>
                    <CardTitle className="text-[#213E60] dark:text-white">
                      {roles.find((r) => r.id === selectedRole)?.title} Login
                    </CardTitle>
                  </div>
                </div>
                {/* <Button
                  variant="outline"
                  size="sm"
                  onClick={fillDemoCredentials}
                  className="border-[#94B6EF] text-[#94B6EF] hover:bg-[#94B6EF] hover:text-white"
                >
                  Use Demo Credentials
                </Button> */}
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">UserName</Label>
                  <Input
                    id="email"
                    type="email"
                    value={credentials.email}
                    onChange={(e) => setCredentials((prev) => ({ ...prev, email: e.target.value }))}
                    placeholder="Enter your email"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={credentials.password}
                      onChange={(e) => setCredentials((prev) => ({ ...prev, password: e.target.value }))}
                      placeholder="Enter your password"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                <div className="space-y-4">
                   {error && <div className="text-red-600 text-sm text-center">{error}</div>}
                {success && <div className="text-green-600 text-sm text-center">Login successful!</div>}
                  <Button onClick={handleLogin} className="w-full bg-[#213E60] hover:bg-[#213E60]/90 text-white">
                    Login as {roles.find((r) => r.id === selectedRole)?.title}
                      {loading ? "Logging in..." : "Login"}
                  </Button>
                  <Button variant="outline" onClick={() => setSelectedRole(null)} className="w-full">
                    Back to Role Selection
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
// "use client"

// import { useState } from "react"
// import axios from "axios"
// import { useRouter } from "next/navigation"

  
// const roles = [
//   { id: "admin", label: "Admin" },
//   { id: "educator", label: "Educator" },
// ]

// export default function LoginPage() {
//   const [credentials, setCredentials] = useState({ email: "", password: "", role: "admin" })
//   const [showPassword, setShowPassword] = useState(false)
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState<string | null>(null)
//   const [success, setSuccess] = useState(false)

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     setCredentials({ ...credentials, [e.target.name]: e.target.value })
//   }

//   const router = useRouter()

//   const handleLogin = async () => {
//     setLoading(true)
//     setError(null)
//     setSuccess(false)
//     try {
//       const res = await axios.post("http://localhost:5000/api/auth/login", {
//         username: credentials.email,
//         password: credentials.password,
//         role: credentials.role,
//       })
//       localStorage.setItem("token", res.data.token);
//       setSuccess(true)
//       if (credentials.role === "admin") {
//         router.push("/dashboard/admin")
//       } else if (credentials.role === "educator") {
//         router.push("/dashboard/ngo")
//       }
//       // Handle redirect or token storage here
//     } catch (err: any) {
//       setError(err.response?.data?.message || "Login failed")
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#F4F2EF] to-white">
//       <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 space-y-6">
//         <h2 className="text-3xl font-bold text-center text-[#213E60] mb-2">Login</h2>
//         <div className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium mb-1" htmlFor="email">UserName</label>
//             <input
//               id="email"
//               name="email"
//               // type="email"
//               autoComplete="email"
//               className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#213E60]"
//               value={credentials.email}
//               onChange={handleChange}
//               placeholder="Enter your email"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium mb-1" htmlFor="password">Password</label>
//             <div className="relative">
//               <input
//                 id="password"
//                 name="password"
//                 type={showPassword ? "text" : "password"}
//                 autoComplete="current-password"
//                 className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#213E60]"
//                 value={credentials.password}
//                 onChange={handleChange}
//                 placeholder="Enter your password"
//               />
//               <button
//                 type="button"
//                 className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
//                 onClick={() => setShowPassword((v) => !v)}
//                 tabIndex={-1}
//               >
//                 {showPassword ? (
//                   <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10 0-1.657.336-3.234.938-4.675M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//                   </svg>
//                 ) : (
//                   <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-.274.832-.642 1.624-1.09 2.357M15.54 15.54A5.978 5.978 0 0112 17c-3.314 0-6-2.686-6-6 0-.828.164-1.617.46-2.34" />
//                   </svg>
//                 )}
//               </button>
//             </div>
//           </div>
//           <div>
//             <label className="block text-sm font-medium mb-1" htmlFor="role">Role</label>
//             <select
//               id="role"
//               name="role"
//               className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#213E60]"
//               value={credentials.role}
//               onChange={handleChange}
//             >
//               {roles.map((role) => (
//                 <option key={role.id} value={role.id}>{role.label}</option>
//               ))}
//             </select>
//           </div>
//         </div>
//         {error && <div className="text-red-600 text-sm text-center">{error}</div>}
//         {success && <div className="text-green-600 text-sm text-center">Login successful!</div>}
//         <button
//           className="w-full py-2 bg-[#213E60] hover:bg-[#213E60]/90 text-white font-semibold rounded transition"
//           onClick={handleLogin}
//           disabled={loading}
//         >
//           {loading ? "Logging in..." : "Login"}
//         </button>
//       </div>
//     </div>
//   )
// }