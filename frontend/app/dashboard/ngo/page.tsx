"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Progress } from "@/components/ui/progress"
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts"
import { Users, BookOpen, Star, TrendingUp, Plus, Upload, MessageCircle, CalendarIcon } from "lucide-react"
import { useState , useEffect } from "react"
import Link from "next/link"
import { useLanguage } from "@/components/language-provider"
import { ImportCSVButton } from "@/components/ui/import_csv_students"
import axios from "axios"


export default function NGODashboard() {
  const [numberOfStudents, setNumberOfStudents] = useState<number | null>();
  
  useEffect(() => {
      axios.get("https://vruksh-ekatra.onrender.com/api/educator/number_students")
        .then(res => setNumberOfStudents(res.data.numberOfStudents))
        .catch(() => setNumberOfStudents(null));
    }, []);
  const [date, setDate] = useState<Date | undefined>(new Date())
  const { isRTL } = useLanguage()

  const stats = [
    {
      title: "Total Students",
      value: numberOfStudents,
      change: "+23 this week",
      icon: Users,
      color: "text-blue-600",
    },
    {
      title: "Active Courses",
      value: "12",
      change: "+2 this month",
      icon: BookOpen,
      color: "text-green-600",
    },
    {
      title: "Avg. Rating",
      value: "4.8",
      change: "+0.2 this month",
      icon: Star,
      color: "text-yellow-600",
    },
    {
      title: "Completion Rate",
      value: "89%",
      change: "+5% this month",
      icon: TrendingUp,
      color: "text-purple-600",
    },
  ]
  // console.log(stats[0].value);
  // Sample data for learner progress chart

  const learnerProgress = [
    { week: "Week 1", completed: 45, enrolled: 60 },
    { week: "Week 2", completed: 52, enrolled: 65 },
    { week: "Week 3", completed: 48, enrolled: 70 },
    { week: "Week 4", completed: 61, enrolled: 75 },
    { week: "Week 5", completed: 58, enrolled: 80 },
    { week: "Week 6", completed: 67, enrolled: 85 },
  ]

  const recentCourses = [
    {
      id: 1,
      title: "Digital Marketing Basics",
      students: 156,
      completion: 78,
      rating: 4.6,
      status: "active",
    },
    {
      id: 2,
      title: "Financial Literacy",
      students: 203,
      completion: 85,
      rating: 4.8,
      status: "active",
    },
    {
      id: 3,
      title: "Small Business Management",
      students: 89,
      completion: 92,
      rating: 4.9,
      status: "completed",
    },
  ]

  const notifications = [
    { id: 1, message: "New student enrolled in Digital Marketing", time: "2 hours ago", type: "info" },
    { id: 2, message: "Course feedback received from 5 students", time: "4 hours ago", type: "success" },
    { id: 3, message: "Monthly report is ready for download", time: "1 day ago", type: "info" },
  ]

  return (
    <DashboardLayout role="ngo">
      <div className={`space-y-6 ${isRTL ? "rtl" : "ltr"}`}>
        {/* Welcome Section */}
        <div className={`flex items-center justify-between ${isRTL ? "flex-row-reverse" : ""}`}>
          <div className={isRTL ? "text-right" : ""}>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Welcome back,SPACECE Educator</h2>
            <p className="text-gray-600 dark:text-gray-300">Track your students' progress and manage your courses.</p>
          </div>
          <div className={`flex space-x-2 ${isRTL ? "space-x-reverse" : ""}`}>
            <ImportCSVButton />
            <Link href="/dashboard/ngo/students">
              <Button variant="outline" className="border-[#E68C3A] text-[#E68C3A] hover:bg-[#E68C3A] hover:text-white">
                <Users className={`h-4 w-4 ${isRTL ? "ml-2" : "mr-2"}`} />
                Add Students
              </Button>
            </Link>
            <Link href="/dashboard/ngo/courses/add">
              <Button className="bg-[#213E60] hover:bg-[#213E60]/90 text-white">
                <Plus className={`h-4 w-4 ${isRTL ? "ml-2" : "mr-2"}`} />
                Add Course
              </Button>
            </Link>
          </div>
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
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{stat.change}</p>
                  </div>
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Learner Progress Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Learner Progress</CardTitle>
              <CardDescription>Weekly completion vs enrollment trends</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={learnerProgress}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="enrolled" stroke="#94B6EF" strokeWidth={2} />
                  <Line type="monotone" dataKey="completed" stroke="#E68C3A" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Frequently used features</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Link href="/dashboard/ngo/students">
                <Button variant="outline" className={`w-full justify-start ${isRTL ? "flex-row-reverse" : ""}`}>
                  <Upload className={`h-4 w-4 ${isRTL ? "ml-2" : "mr-2"}`} />
                  Upload Student CSV
                </Button>
              </Link>
              <Link href="/dashboard/ngo/courses/add">
                <Button variant="outline" className={`w-full justify-start ${isRTL ? "flex-row-reverse" : ""}`}>
                  <BookOpen className={`h-4 w-4 ${isRTL ? "ml-2" : "mr-2"}`} />
                  Create New Course
                </Button>
              </Link>
              <Button variant="outline" className={`w-full justify-start ${isRTL ? "flex-row-reverse" : ""}`}>
                <MessageCircle className={`h-4 w-4 ${isRTL ? "ml-2" : "mr-2"}`} />
                Send WhatsApp Broadcast
              </Button>
              <Button variant="outline" className={`w-full justify-start ${isRTL ? "flex-row-reverse" : ""}`}>
                <TrendingUp className={`h-4 w-4 ${isRTL ? "ml-2" : "mr-2"}`} />
                Generate Report
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Courses */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Course Performance</CardTitle>
              <CardDescription>Overview of your active courses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentCourses.map((course) => (
                  <div key={course.id} className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
                    <div className={`flex items-center justify-between mb-2 ${isRTL ? "flex-row-reverse" : ""}`}>
                      <h4 className="font-medium text-gray-900 dark:text-white">{course.title}</h4>
                      <Badge variant={course.status === "active" ? "default" : "secondary"}>{course.status}</Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div className={isRTL ? "text-right" : ""}>
                        <p className="text-gray-500 dark:text-gray-400">Students</p>
                        <p className="font-medium">{course.students}</p>
                      </div>
                      <div className={isRTL ? "text-right" : ""}>
                        <p className="text-gray-500 dark:text-gray-400">Completion</p>
                        <div
                          className={`flex items-center space-x-2 ${isRTL ? "space-x-reverse flex-row-reverse" : ""}`}
                        >
                          <Progress value={course.completion} className="flex-1" />
                          <span className="text-xs">{course.completion}%</span>
                        </div>
                      </div>
                      <div className={isRTL ? "text-right" : ""}>
                        <p className="text-gray-500 dark:text-gray-400">Rating</p>
                        <div className={`flex items-center ${isRTL ? "flex-row-reverse" : ""}`}>
                          <Star className={`h-4 w-4 text-yellow-500 ${isRTL ? "ml-1" : "mr-1"}`} />
                          <span className="font-medium">{course.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Calendar & Notifications */}
          <div className="space-y-6">
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

            <Card>
              <CardHeader>
                <CardTitle>Notifications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`flex items-start space-x-3 p-2 rounded-lg bg-gray-50 dark:bg-gray-800 ${isRTL ? "space-x-reverse flex-row-reverse" : ""}`}
                    >
                      <div
                        className={`w-2 h-2 rounded-full mt-2 ${
                          notification.type === "success" ? "bg-green-500" : "bg-blue-500"
                        }`}
                      />
                      <div className={`flex-1 ${isRTL ? "text-right" : ""}`}>
                        <p className="text-sm text-gray-900 dark:text-white">{notification.message}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{notification.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
