"use client"

import type React from "react"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import axios from "axios"
import { Upload, FileText, CheckCircle, AlertCircle, Lightbulb, Eye, Users, Clock } from "lucide-react"

export default function AddCoursePage() {
  const [dragActive, setDragActive] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [aiAnalysis, setAiAnalysis] = useState<any>(null)
  const [courseData, setCourseData] = useState({
    courseName: "",
    module1Text: "",
    educatorUserName: "",
    targetAudience: "",
  })

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handlePublishCourse = async () => {
  try {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : ""
    const res = await axios.post(
      "https://vruksh-ekatra.onrender.com/api/educator/course",
      {
        courseName: courseData.courseName,
        module1Text: courseData.module1Text,
        educator: courseData.educatorUserName,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    alert("Course published successfully!")
    setCourseData({
      courseName: "",
      module1Text: "",
      educatorUserName: "", 
      targetAudience: "",
    })
    // Optionally reset form or redirect here
  } catch (err: any) {
    alert(err.response?.data?.error || "Failed to publish course.")
  }
}
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0]
      if (file.type === "application/pdf") {
        setUploadedFile(file)
        // Simulate AI analysis
        setTimeout(() => {
          setAiAnalysis({
            clarity: 85,
            engagement: 78,
            visualAppeal: 65,
            suggestions: [
              "Add more interactive elements to increase engagement",
              "Include visual diagrams for better understanding",
              "Break down complex concepts into smaller sections",
              "Add practical examples and case studies",
            ],
            strengths: [
              "Well-structured content flow",
              "Clear learning objectives",
              "Good use of headings and subheadings",
            ],
          })
        }, 2000)
      }
    }
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      if (file.type === "application/pdf") {
        setUploadedFile(file)
        // Simulate AI analysis
        setTimeout(() => {
          setAiAnalysis({
            clarity: 85,
            engagement: 78,
            visualAppeal: 65,
            suggestions: [
              "Add more interactive elements to increase engagement",
              "Include visual diagrams for better understanding",
              "Break down complex concepts into smaller sections",
              "Add practical examples and case studies",
            ],
            strengths: [
              "Well-structured content flow",
              "Clear learning objectives",
              "Good use of headings and subheadings",
            ],
          })
        }, 2000)
      }
    }
  }

  return (
    <DashboardLayout role="ngo">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Create New Course</h2>
            <p className="text-gray-600 dark:text-gray-300">Upload your course content and get AI-powered feedback</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Course Information */}
          <Card>
            <CardHeader>
              <CardTitle>Course Information</CardTitle>
              <CardDescription>Provide basic details about your course</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Course Name</Label>
                <Input
                  id="title"
                  placeholder="e.g., Digital Marketing for Small Businesses"
                  value={courseData.courseName}
                  onChange={(e) => setCourseData((prev) => ({ ...prev, courseName: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Module</Label>
                <Textarea
                  id="description"
                  placeholder="Describe what students will learn in this course..."
                  rows={4}
                  value={courseData.module1Text}
                  onChange={(e) => setCourseData((prev) => ({ ...prev, module1Text: e.target.value }))}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="duration">Educator UserName</Label>
                  <Input
                    id="duration"
                    // placeholder="e.g., 4 "
                    value={courseData.educatorUserName}
                    onChange={(e) => setCourseData((prev) => ({ ...prev, educatorUserName: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="audience">Target Audience</Label>
                  <Input
                    id="audience"
                    placeholder="e.g., Entrepreneurs"
                    value={courseData.targetAudience}
                    onChange={(e) => setCourseData((prev) => ({ ...prev, targetAudience: e.target.value }))}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* File Upload */}
          <Card>
            <CardHeader>
              <CardTitle>Upload Course Content</CardTitle>
              <CardDescription>Upload a PDF file containing your course material</CardDescription>
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
                    Drop your PDF here, or click to browse
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Supports PDF files up to 50MB</p>
                </div>
                <input type="file" accept=".pdf" onChange={handleFileInput} className="hidden" id="pdf-upload" />
                <Label htmlFor="pdf-upload">
                  <Button className="mt-4 bg-[#213E60] hover:bg-[#213E60]/90 text-white" asChild>
                    <span>Choose PDF File</span>
                  </Button>
                </Label>
              </div>

              {uploadedFile && (
                <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <FileText className="h-5 w-5 text-blue-600 mr-2" />
                      <span className="text-sm font-medium text-blue-800 dark:text-blue-200">{uploadedFile.name}</span>
                    </div>
                    <Badge className="bg-blue-100 text-blue-800">{aiAnalysis ? "Analyzed" : "Analyzing..."}</Badge>
                  </div>
                  {!aiAnalysis && (
                    <div className="mt-2">
                      <Progress value={65} className="h-2" />
                      <p className="text-xs text-blue-600 mt-1">AI analysis in progress...</p>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* AI Analysis Results */}
        {aiAnalysis && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Lightbulb className="mr-2 h-5 w-5 text-yellow-500" />
                  AI Content Analysis
                </CardTitle>
                <CardDescription>Our AI has analyzed your content and provided feedback</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600 mb-1">{aiAnalysis.clarity}%</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Clarity</div>
                    <Progress value={aiAnalysis.clarity} className="mt-2" />
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600 mb-1">{aiAnalysis.engagement}%</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Engagement</div>
                    <Progress value={aiAnalysis.engagement} className="mt-2" />
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600 mb-1">{aiAnalysis.visualAppeal}%</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Visual Appeal</div>
                    <Progress value={aiAnalysis.visualAppeal} className="mt-2" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                      Strengths
                    </h4>
                    <ul className="space-y-2">
                      {aiAnalysis.strengths.map((strength: string, index: number) => (
                        <li key={index} className="text-sm text-gray-600 dark:text-gray-300 flex items-start">
                          <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-2 flex-shrink-0" />
                          {strength}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                      <AlertCircle className="mr-2 h-4 w-4 text-orange-500" />
                      Suggestions for Improvement
                    </h4>
                    <ul className="space-y-2">
                      {aiAnalysis.suggestions.map((suggestion: string, index: number) => (
                        <li key={index} className="text-sm text-gray-600 dark:text-gray-300 flex items-start">
                          <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-2 flex-shrink-0" />
                          {suggestion}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Course Preview */}
            <Card>
              <CardHeader>
                <CardTitle>Course Preview</CardTitle>
                <CardDescription>How your course will appear to students</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg p-6 bg-gray-50 dark:bg-gray-800">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        {courseData.courseName || "Course Title"}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-4">
                        {courseData.module1Text || "Course description will appear here..."}
                      </p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {courseData.educatorUserName || "Duration"}
                        </div>
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-1" />
                          {courseData.targetAudience || "Target Audience"}
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-1" />
                      Preview
                    </Button>
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t">
                    <Badge className="bg-[#94B6EF]/20 text-[#213E60]">Ready to Publish</Badge>
                    <div className="flex space-x-2">
                      <Button variant="outline">Save as Draft</Button>
                      <Button className="bg-[#213E60] hover:bg-[#213E60]/90 text-white">Publish Course</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
        <Button
          className="bg-[#213E60] hover:bg-[#213E60]/90 text-white"
          onClick={handlePublishCourse}
        >
          Publish Course
        </Button>
      </div>
    </DashboardLayout>
  )
}
