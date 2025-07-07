// Add this to your file (e.g., below your LoginPage component)
import React, { useRef, useState } from "react"
import axios from "axios"

// const token = localStorage.getItem("token");

export function ImportCSVButton() {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
  const [message, setMessage] = useState("")

  const handleButtonClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const formData = new FormData()
    formData.append("file", file)

    setUploading(true)
    setMessage("")
    try {
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : ""
      // console.log(token);
      const res = await axios.post("http://localhost:5000/api/educator/add-students", formData, {
        headers: { "Content-Type": "multipart/form-data",Authorization: `Bearer ${token}`, },
      })
      setMessage(res.data.message || "Students imported successfully!")
    } catch (err: any) {
      setMessage(err.response?.data?.error || "Failed to import students.")
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="flex items-center space-x-4 mb-4">
      <button
        type="button"
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        onClick={handleButtonClick}
        disabled={uploading}
      >
        {uploading ? "Importing..." : "Import CSV"}
      </button>
      <input
        type="file"
        accept=".csv"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      {message && <span className="text-sm">{message}</span>}
    </div>
  )
}