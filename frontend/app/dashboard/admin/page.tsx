"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts"
import { Users, BookOpen, TrendingUp, Activity, Plus, Eye, CalendarIcon } from "lucide-react"
import { useState , useEffect} from "react"
import axios from "axios"
import { useLanguage } from "@/components/language-provider"
import { ImportCSVAdminButton } from "@/components/ui/import_csv_admin"

export default function AdminDashboard() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const { isRTL } = useLanguage()

  const [numberOfNgos, setNumberOfNgos] = useState<number | null>();
    
    useEffect(() => {
        axios.get(https://vruksh-ekatra.onrender.com/api/admin/number_ngos")
          .then(res => setNumberOfNgos(res.data.numberOfngos))
          .catch(() => setNumberOfNgos(null));
      }, []);

  const stats = [
    {
      title: "Total NGOs",
      value: numberOfNgos,
      change: "+12%",
      icon: Users,
      color: "text-blue-600",
    },
    {
      title: "Active Students",
      value: "12,847",
      change: "+8%",
      icon: BookOpen,
      color: "text-green-600",
    },
    {
      title: "Courses Published",
      value: "1,234",
      change: "+15%",
      icon: Activity,
      color: "text-purple-600",
    },
    {
      title: "Engagement Rate",
      value: "87%",
      change: "+3%",
      icon: TrendingUp,
      color: "text-orange-600",
    },
  ]

  const ngoData = [
    { month: "Jan", active: 120, new: 15 },
    { month: "Feb", active: 132, new: 18 },
    { month: "Mar", active: 145, new: 22 },
    { month: "Apr", active: 156, new: 12 },
    { month: "May", active: 168, new: 25 },
    { month: "Jun", active: 180, new: 20 },
  ]

  const studentsActiveData = [
    { day: "Mon", logins: 2450 },
    { day: "Tue", logins: 2680 },
    { day: "Wed", logins: 2340 },
    { day: "Thu", logins: 2890 },
    { day: "Fri", logins: 3100 },
    { day: "Sat", logins: 2750 },
    { day: "Sun", logins: 2200 },
  ]

  const recentActivities = [
    { id: 1, action: "New NGO registered", org: "Education First", time: "2 hours ago", type: "success" },
    { id: 2, action: "Course published", org: "Learning Hub", time: "4 hours ago", type: "info" },
    { id: 3, action: "Student milestone reached", org: "Community Learn", time: "6 hours ago", type: "success" },
    { id: 4, action: "System maintenance", org: "System", time: "1 day ago", type: "warning" },
  ]

  return (
    <DashboardLayout role="admin">
      <div className={`space-y-6 ${isRTL ? "rtl" : "ltr"}`}>
        {/* Welcome Section */}
        <div className={`flex items-center justify-between ${isRTL ? "flex-row-reverse" : ""}`}>
          <div className={isRTL ? "text-right" : ""}>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Welcome back, Admin</h2>
            <p className="text-gray-600 dark:text-gray-300">Here's what's happening with your platform today.</p>
          </div>
          <div className="ml-40 mr-2 mt-4">
          <ImportCSVAdminButton />
          </div>
          <Button className="bg-[#213E60] hover:bg-[#213E60]/90 text-white">
            <Plus className={`h-4 w-4 ${isRTL ? "ml-2" : "mr-2"}`} />
            Add NGO
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="card-hover">
              <CardContent className="p-6">
                <div className={`flex items-center justify-between ${isRTL ? "flex-row-reverse" : ""}`}>
                  <div className={isRTL ? "text-right" : ""}>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-300">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                    <Badge variant="outline" className={`mt-1 ${stat.color}`}>
                      {stat.change}
                    </Badge>
                  </div>
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* NGO Growth Chart */}
          <Card>
            <CardHeader>
              <CardTitle>NGO Growth</CardTitle>
              <CardDescription>Active and new NGO registrations over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={ngoData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="active" fill="#213E60" />
                  <Bar dataKey="new" fill="#E68C3A" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Students Active Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Students Active</CardTitle>
              <CardDescription>Daily student login activity trends</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={studentsActiveData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="logins" stroke="#94B6EF" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activities */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Recent Activities</CardTitle>
              <CardDescription>Latest platform activities and updates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div
                    key={activity.id}
                    className={`flex items-center space-x-4 p-3 rounded-lg bg-gray-50 dark:bg-gray-800 ${isRTL ? "space-x-reverse flex-row-reverse" : ""}`}
                  >
                    <div
                      className={`w-2 h-2 rounded-full ${
                        activity.type === "success"
                          ? "bg-green-500"
                          : activity.type === "info"
                            ? "bg-blue-500"
                            : "bg-yellow-500"
                      }`}
                    />
                    <div className={`flex-1 ${isRTL ? "text-right" : ""}`}>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{activity.action}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {activity.org} • {activity.time}
                      </p>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Calendar */}
          <Card>
            <CardHeader>
              <CardTitle className={`flex items-center ${isRTL ? "flex-row-reverse" : ""}`}>
                <CalendarIcon className={`h-5 w-5 ${isRTL ? "ml-2" : "mr-2"}`} />
                Calendar
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" />
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
