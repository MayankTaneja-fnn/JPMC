"use client"

import { useState, useEffect } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Search, Eye, Download, FileText, ImageIcon, Users, Calendar, Plus } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import Link from "next/link"

interface Course {
  id: number
  title: string
  description: string
  uploadDate: string
  fileType: "PDF" | "Image" | "Video"
  enrolledStudents: number
  status: "active" | "draft" | "completed"
  fileUrl?: string
}

export default function ViewCoursesPage() {
  const { t, isRTL } = useLanguage()
  const [searchTerm, setSearchTerm] = useState("")
  const [courses, setCourses] = useState<Course[]>([])
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)

  useEffect(() => {
    // Load courses from localStorage or set mock data
    const storedCourses = JSON.parse(localStorage.getItem("ngo_courses") || "[]")
    if (storedCourses.length === 0) {
      // Set mock data if no courses exist
      const mockCourses: Course[] = [
        {
          id: 1,
          title: "Digital Marketing Fundamentals",
          description:
            "Learn the basics of digital marketing including social media, SEO, and content marketing strategies for small businesses.",
          uploadDate: "2024-01-15",
          fileType: "PDF",
          enrolledStudents: 156,
          status: "active",
          fileUrl: "/placeholder.pdf",
        },
        {
          id: 2,
          title: "Financial Literacy for Entrepreneurs",
          description:
            "Understanding basic financial concepts, budgeting, and financial planning for micro-entrepreneurs.",
          uploadDate: "2024-01-20",
          fileType: "PDF",
          enrolledStudents: 203,
          status: "active",
          fileUrl: "/placeholder.pdf",
        },
        {
          id: 3,
          title: "Basic Computer Skills",
          description: "Introduction to computers, internet usage, and basic software applications for beginners.",
          uploadDate: "2024-02-01",
          fileType: "Image",
          enrolledStudents: 89,
          status: "completed",
          fileUrl: "/placeholder.jpg",
        },
        {
          id: 4,
          title: "Small Business Management",
          description:
            "Essential management skills for running a small business including planning, organizing, and leadership.",
          uploadDate: "2024-02-10",
          fileType: "PDF",
          enrolledStudents: 134,
          status: "active",
          fileUrl: "/placeholder.pdf",
        },
        {
          id: 5,
          title: "Communication Skills Workshop",
          description: "Improve your communication skills for better customer relations and business networking.",
          uploadDate: "2024-02-15",
          fileType: "Video",
          enrolledStudents: 78,
          status: "draft",
          fileUrl: "/placeholder.mp4",
        },
      ]
      setCourses(mockCourses)
      localStorage.setItem("ngo_courses", JSON.stringify(mockCourses))
    } else {
      setCourses(storedCourses)
    }
  }, [])

  const filteredCourses = courses.filter(
    (course) =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getFileIcon = (fileType: string) => {
    switch (fileType) {
      case "PDF":
        return <FileText className="h-5 w-5 text-red-500" />
      case "Image":
        return <ImageIcon className="h-5 w-5 text-blue-500" />
      case "Video":
        return <FileText className="h-5 w-5 text-purple-500" />
      default:
        return <FileText className="h-5 w-5 text-gray-500" />
    }
  }

  const handlePreviewDownload = (course: Course) => {
    // Simulate file download/preview
    if (course.fileType === "PDF") {
      // In a real app, this would open a PDF viewer or download the file
      window.open("/placeholder.pdf", "_blank")
    } else {
      alert(`Preview/Download functionality for ${course.fileType} files would be implemented here.`)
    }
  }

  return (
    <DashboardLayout role="ngo">
      <div className={`space-y-6 ${isRTL ? "rtl" : "ltr"}`}>
        {/* Header */}
        <div className={`flex items-center justify-between ${isRTL ? "flex-row-reverse" : ""}`}>
          <div className={isRTL ? "text-right" : ""}>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t("ngo.viewCourses")}</h2>
            <p className="text-gray-600 dark:text-gray-300">Manage and view all courses uploaded by your NGO</p>
          </div>
          <Link href="/dashboard/ngo/courses/add">
            <Button className="bg-[#213E60] hover:bg-[#213E60]/90 text-white">
              <Plus className={`h-4 w-4 ${isRTL ? "ml-2" : "mr-2"}`} />
              Add New Course
            </Button>
          </Link>
        </div>

        {/* Course Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className={`flex items-center justify-between ${isRTL ? "flex-row-reverse" : ""}`}>
                <div className={isRTL ? "text-right" : ""}>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Total Courses</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{courses.length}</p>
                </div>
                <FileText className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className={`flex items-center justify-between ${isRTL ? "flex-row-reverse" : ""}`}>
                <div className={isRTL ? "text-right" : ""}>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Active Courses</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {courses.filter((c) => c.status === "active").length}
                  </p>
                </div>
                <Badge className="bg-green-100 text-green-800 text-lg px-3 py-1">Active</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className={`flex items-center justify-between ${isRTL ? "flex-row-reverse" : ""}`}>
                <div className={isRTL ? "text-right" : ""}>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Total Students</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {courses.reduce((sum, course) => sum + course.enrolledStudents, 0)}
                  </p>
                </div>
                <Users className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className={`flex items-center justify-between ${isRTL ? "flex-row-reverse" : ""}`}>
                <div className={isRTL ? "text-right" : ""}>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Avg. Enrollment</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {courses.length > 0
                      ? Math.round(courses.reduce((sum, course) => sum + course.enrolledStudents, 0) / courses.length)
                      : 0}
                  </p>
                </div>
                <Calendar className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Courses Table */}
        <Card>
          <CardHeader>
            <CardTitle>Course Library</CardTitle>
            <CardDescription>All courses uploaded and managed by your NGO</CardDescription>
          </CardHeader>
          <CardContent>
            <div className={`flex items-center space-x-2 mb-4 ${isRTL ? "space-x-reverse" : ""}`}>
              <div className="relative flex-1">
                <Search
                  className={`absolute ${isRTL ? "right-3" : "left-3"} top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4`}
                />
                <Input
                  placeholder="Search courses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={isRTL ? "pr-10" : "pl-10"}
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className={isRTL ? "text-right" : ""}>Course Title</TableHead>
                    <TableHead className={isRTL ? "text-right" : ""}>Description</TableHead>
                    <TableHead className={isRTL ? "text-right" : ""}>Upload Date</TableHead>
                    <TableHead className={isRTL ? "text-right" : ""}>File Type</TableHead>
                    <TableHead className={isRTL ? "text-right" : ""}>Students</TableHead>
                    <TableHead className={isRTL ? "text-right" : ""}>Status</TableHead>
                    <TableHead className={isRTL ? "text-right" : ""}>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCourses.map((course) => (
                    <TableRow key={course.id}>
                      <TableCell className={`font-medium ${isRTL ? "text-right" : ""}`}>
                        <div
                          className={`flex items-center space-x-2 ${isRTL ? "space-x-reverse flex-row-reverse" : ""}`}
                        >
                          {getFileIcon(course.fileType)}
                          <span>{course.title}</span>
                        </div>
                      </TableCell>
                      <TableCell className={`max-w-xs truncate ${isRTL ? "text-right" : ""}`}>
                        {course.description}
                      </TableCell>
                      <TableCell className={isRTL ? "text-right" : ""}>
                        {new Date(course.uploadDate).toLocaleDateString()}
                      </TableCell>
                      <TableCell className={isRTL ? "text-right" : ""}>
                        <Badge variant="outline">{course.fileType}</Badge>
                      </TableCell>
                      <TableCell className={isRTL ? "text-right" : ""}>
                        <Badge variant="secondary">{course.enrolledStudents}</Badge>
                      </TableCell>
                      <TableCell className={isRTL ? "text-right" : ""}>
                        <Badge
                          variant={
                            course.status === "active"
                              ? "default"
                              : course.status === "completed"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {course.status}
                        </Badge>
                      </TableCell>
                      <TableCell className={isRTL ? "text-right" : ""}>
                        <div className={`flex space-x-1 ${isRTL ? "space-x-reverse flex-row-reverse" : ""}`}>
                          <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
                            <DialogTrigger asChild>
                              <Button variant="ghost" size="sm" onClick={() => setSelectedCourse(course)}>
                                <Eye className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className={`max-w-2xl ${isRTL ? "rtl" : "ltr"}`}>
                              <DialogHeader>
                                <DialogTitle>Course Details</DialogTitle>
                                <DialogDescription>Detailed information about the course</DialogDescription>
                              </DialogHeader>
                              {selectedCourse && (
                                <div className="space-y-6">
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Course Title</h4>
                                      <p className="text-gray-600 dark:text-gray-300">{selectedCourse.title}</p>
                                    </div>
                                    <div>
                                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">File Type</h4>
                                      <div
                                        className={`flex items-center space-x-2 ${isRTL ? "space-x-reverse flex-row-reverse" : ""}`}
                                      >
                                        {getFileIcon(selectedCourse.fileType)}
                                        <span className="text-gray-600 dark:text-gray-300">
                                          {selectedCourse.fileType}
                                        </span>
                                      </div>
                                    </div>
                                    <div>
                                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Upload Date</h4>
                                      <p className="text-gray-600 dark:text-gray-300">
                                        {new Date(selectedCourse.uploadDate).toLocaleDateString()}
                                      </p>
                                    </div>
                                    <div>
                                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                                        Enrolled Students
                                      </h4>
                                      <p className="text-gray-600 dark:text-gray-300">
                                        {selectedCourse.enrolledStudents}
                                      </p>
                                    </div>
                                    <div>
                                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Status</h4>
                                      <Badge
                                        variant={
                                          selectedCourse.status === "active"
                                            ? "default"
                                            : selectedCourse.status === "completed"
                                              ? "secondary"
                                              : "outline"
                                        }
                                      >
                                        {selectedCourse.status}
                                      </Badge>
                                    </div>
                                  </div>
                                  <div>
                                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Description</h4>
                                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                      {selectedCourse.description}
                                    </p>
                                  </div>
                                  <div className={`flex space-x-2 ${isRTL ? "space-x-reverse flex-row-reverse" : ""}`}>
                                    <Button
                                      onClick={() => handlePreviewDownload(selectedCourse)}
                                      className="bg-[#213E60] hover:bg-[#213E60]/90 text-white"
                                    >
                                      <Download className={`h-4 w-4 ${isRTL ? "ml-2" : "mr-2"}`} />
                                      {selectedCourse.fileType === "PDF" ? "Preview PDF" : "Download File"}
                                    </Button>
                                  </div>
                                </div>
                              )}
                            </DialogContent>
                          </Dialog>
                          <Button variant="ghost" size="sm" onClick={() => handlePreviewDownload(course)}>
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {filteredCourses.length === 0 && (
              <div className="text-center py-8">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No courses found</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {searchTerm ? "No courses match your search criteria." : "You haven't uploaded any courses yet."}
                </p>
                <Link href="/dashboard/ngo/courses/add">
                  <Button className="bg-[#213E60] hover:bg-[#213E60]/90 text-white">
                    <Plus className={`h-4 w-4 ${isRTL ? "ml-2" : "mr-2"}`} />
                    Upload Your First Course
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
