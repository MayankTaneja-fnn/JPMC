"use client"

import type React from "react"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Upload, Download, Search, Plus, Eye, Edit, Trash2, FileText } from "lucide-react"

export default function StudentsPage() {
  const [dragActive, setDragActive] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [previewData, setPreviewData] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState("")

  const existingStudents = [
    {
      id: 1,
      name: "Priya Sharma",
      phone: "+91 98765 43210",
      email: "priya.sharma@email.com",
      enrollmentDate: "2024-01-15",
      courses: 3,
      status: "active",
    },
    {
      id: 2,
      name: "Rajesh Kumar",
      phone: "+91 87654 32109",
      email: "rajesh.kumar@email.com",
      enrollmentDate: "2024-01-20",
      courses: 2,
      status: "active",
    },
    {
      id: 3,
      name: "Anita Patel",
      phone: "+91 76543 21098",
      email: "anita.patel@email.com",
      enrollmentDate: "2024-02-01",
      courses: 1,
      status: "inactive",
    },
  ]

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0]
      if (file.type === "text/csv" || file.name.endsWith(".csv")) {
        setUploadedFile(file)
        // Simulate CSV parsing
        setPreviewData([
          { name: "John Doe", phone: "+91 99999 88888", email: "john@email.com", enrollmentDate: "2024-03-01" },
          { name: "Jane Smith", phone: "+91 88888 77777", email: "jane@email.com", enrollmentDate: "2024-03-01" },
          { name: "Bob Johnson", phone: "+91 77777 66666", email: "bob@email.com", enrollmentDate: "2024-03-01" },
        ])
      }
    }
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      if (file.type === "text/csv" || file.name.endsWith(".csv")) {
        setUploadedFile(file)
        // Simulate CSV parsing
        setPreviewData([
          { name: "John Doe", phone: "+91 99999 88888", email: "john@email.com", enrollmentDate: "2024-03-01" },
          { name: "Jane Smith", phone: "+91 88888 77777", email: "jane@email.com", enrollmentDate: "2024-03-01" },
          { name: "Bob Johnson", phone: "+91 77777 66666", email: "bob@email.com", enrollmentDate: "2024-03-01" },
        ])
      }
    }
  }

  const downloadTemplate = () => {
    const csvContent =
      "Name,Phone,Email,Enrollment Date\nJohn Doe,+91 99999 88888,john@email.com,2024-03-01\nJane Smith,+91 88888 77777,jane@email.com,2024-03-01"
    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "student_template.csv"
    a.click()
  }

  const filteredStudents = existingStudents.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <DashboardLayout role="ngo">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Student Management</h2>
            <p className="text-gray-600 dark:text-gray-300">Add new students and manage existing enrollments</p>
          </div>
          <Button
            onClick={downloadTemplate}
            variant="outline"
            className="border-[#94B6EF] text-[#94B6EF] hover:bg-[#94B6EF] hover:text-white"
          >
            <Download className="mr-2 h-4 w-4" />
            Download Template
          </Button>
        </div>

        {/* Upload Section */}
        <Card>
          <CardHeader>
            <CardTitle>Bulk Upload Students</CardTitle>
            <CardDescription>
              Upload a CSV file with student information. Download the template to see the required format.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                dragActive ? "border-[#E68C3A] bg-[#E68C3A]/5" : "border-gray-300 dark:border-gray-600"
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <div className="space-y-2">
                <p className="text-lg font-medium text-gray-900 dark:text-white">
                  Drop your CSV file here, or click to browse
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Supports CSV files up to 10MB</p>
              </div>
              <input type="file" accept=".csv" onChange={handleFileInput} className="hidden" id="file-upload" />
              <Label htmlFor="file-upload">
                <Button className="mt-4 bg-[#213E60] hover:bg-[#213E60]/90 text-white" asChild>
                  <span>Choose File</span>
                </Button>
              </Label>
            </div>

            {uploadedFile && (
              <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <FileText className="h-5 w-5 text-green-600 mr-2" />
                    <span className="text-sm font-medium text-green-800 dark:text-green-200">{uploadedFile.name}</span>
                  </div>
                  <Badge className="bg-green-100 text-green-800">Ready to import</Badge>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Preview Section */}
        {previewData.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Data Preview</CardTitle>
              <CardDescription>Review the data before importing. {previewData.length} students found.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Enrollment Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {previewData.map((student, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{student.name}</TableCell>
                        <TableCell>{student.phone}</TableCell>
                        <TableCell>{student.email}</TableCell>
                        <TableCell>{student.enrollmentDate}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <div className="flex justify-end space-x-2 mt-4">
                <Button variant="outline" onClick={() => setPreviewData([])}>
                  Cancel
                </Button>
                <Button className="bg-[#213E60] hover:bg-[#213E60]/90 text-white">Import Students</Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Existing Students */}
        <Card>
          <CardHeader>
            <CardTitle>Existing Students</CardTitle>
            <CardDescription>Manage your current student enrollments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search students..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button className="bg-[#213E60] hover:bg-[#213E60]/90 text-white">
                <Plus className="mr-2 h-4 w-4" />
                Add Student
              </Button>
            </div>

            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Enrollment Date</TableHead>
                    <TableHead>Courses</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStudents.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell className="font-medium">{student.name}</TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="text-sm">{student.phone}</div>
                          <div className="text-xs text-gray-500">{student.email}</div>
                        </div>
                      </TableCell>
                      <TableCell>{student.enrollmentDate}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{student.courses} courses</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={student.status === "active" ? "default" : "secondary"}>{student.status}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-1">
                          <Button variant="ghost" size="icon">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="text-red-600 hover:text-red-700">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
