"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  GraduationCap,
  Award,
  MapPin,
  Calendar,
  Search,
  Filter,
} from "lucide-react"

import { getFeaturedStudents } from "@/lib/api"

export default function StudentsPage() {
  const [students, setStudents] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const programs = [
    "All Programs",
    "Computer Science",
    "Electrical Engineering",
    "Mechanical Engineering",
    "Civil Engineering",
    "Chemical Engineering",
    "Applied Mathematics",
  ]

  const graduationYears = ["All Years", "2024", "2025", "2026", "2027"]

  useEffect(() => {
    async function fetchStudents() {
      try {
        const data = await getFeaturedStudents()
        setStudents(data.results || [])
      } catch (error) {
        console.error("Failed to fetch students:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchStudents()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-lg text-gray-600">
        Loading students...
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Our Students</h1>
          <p className="text-xl text-gray-600">Meet the brilliant minds shaping the future</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Filters */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-12">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input placeholder="Search students by name..." className="pl-10" />
            </div>
            <Select>
              <SelectTrigger className="w-full md:w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Program" />
              </SelectTrigger>
              <SelectContent>
                {programs.map((program) => (
                  <SelectItem key={program} value={program.toLowerCase().replace(/\s+/g, "-")}>
                    {program}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Graduation Year" />
              </SelectTrigger>
              <SelectContent>
                {graduationYears.map((year) => (
                  <SelectItem key={year} value={year.toLowerCase()}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Featured Students */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Featured Students</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {students.map((student) => (
              <Card
                key={student.id}
                className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <div className="relative">
                  <Image
                    src={student.photo || "/placeholder.svg"}
                    alt={student.name}
                    width={300}
                    height={300}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-white text-gray-900">Featured</Badge>
                  </div>
                </div>

                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-900">{student.name}</CardTitle>
                  <div className="text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <GraduationCap className="h-4 w-4" />
                      {student.department_name}
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <CardDescription className="text-gray-600 italic">
                    “{student.quote}”
                  </CardDescription>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1 flex items-center gap-2">
                      <Award className="h-4 w-4 text-yellow-500" />
                      Highlight
                    </h4>
                    <p className="text-sm text-gray-700">{student.highlight_tagline}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Farewell Words</h4>
                    <p className="text-sm text-gray-600">{student.last_words}</p>
                  </div>

                  <div className="text-sm text-gray-600">
                    <strong>Memories:</strong> {student.description}
                  </div>

                  <Button className="w-full" variant="outline">
                    View Profile
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Load More Button */}
        <div className="text-center">
          <Button size="lg" className="px-8">
            Load More Students
          </Button>
        </div>
      </div>
    </div>
  )
}
