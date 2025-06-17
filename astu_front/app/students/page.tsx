"use client"

import { useEffect, useState } from "react"
import Link from "next/link" // Added Link import
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

import { getStudents, getDepartments } from "@/lib/api" // Updated imports
import { Student, Department } from "@/lib/types" // Added type imports

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>([])
  const [departments, setDepartments] = useState<Department[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState<string | undefined>(undefined)
  const [nextPageUrl, setNextPageUrl] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [loadingMore, setLoadingMore] = useState(false)

  // Fetch departments for filter
  useEffect(() => {
    async function fetchDepartments() {
      try {
        const data = await getDepartments()
        setDepartments(data.results || [])
      } catch (error) {
        console.error("Failed to fetch departments:", error)
      }
    }
    fetchDepartments()
  }, [])

  // Fetch students based on filters or page change
  useEffect(() => {
    async function fetchStudentsData(pageToFetch = 1, append = false) {
      if (!append) {
        setLoading(true)
        setStudents([]) // Clear students when filters change
        setCurrentPage(1)
      } else {
        setLoadingMore(true)
      }

      try {
        const params: { department?: number; search?: string; is_featured?: boolean, page?: number } = { page: pageToFetch }
        if (selectedDepartment && selectedDepartment !== "all") {
          params.department = parseInt(selectedDepartment, 10)
        }
        if (searchTerm) {
          params.search = searchTerm
        }
        // Default to all students unless specific filters active (is_featured could be a separate toggle later)

        const data = await getStudents(params)
        if (append) {
          setStudents(prevStudents => [...prevStudents, ...(data.results || [])]);
        } else {
          setStudents(data.results || [])
        }
        setNextPageUrl(data.next || null)
      } catch (error) {
        console.error("Failed to fetch students:", error)
        if (!append) setStudents([])
      } finally {
        if (!append) setLoading(false)
        setLoadingMore(false)
      }
    }

    fetchStudentsData(1, false) // Initial fetch or filter change
  }, [searchTerm, selectedDepartment])


  const handleLoadMore = async () => {
    if (nextPageUrl && !loadingMore) {
      const nextPageNum = currentPage + 1
      setCurrentPage(nextPageNum) // Optimistically update current page

      setLoadingMore(true)
      try {
         const params: { department?: number; search?: string; is_featured?: boolean, page?: number } = { page: nextPageNum }
        if (selectedDepartment && selectedDepartment !== "all") {
          params.department = parseInt(selectedDepartment, 10)
        }
        if (searchTerm) {
          params.search = searchTerm
        }
        const data = await getStudents(params)
        setStudents(prevStudents => [...prevStudents, ...(data.results || [])]);
        setNextPageUrl(data.next || null)
      } catch (error) {
        console.error("Failed to load more students:", error)
        // Potentially revert currentPage if fetch fails, or show error
      } finally {
        setLoadingMore(false)
      }
    }
  }

  if (loading && students.length === 0) {
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
              <Input
                placeholder="Search students by name..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => {setSearchTerm(e.target.value); setCurrentPage(1); /* Reset page on new search */}}
              />
            </div>
            <Select
              onValueChange={(value) => {setSelectedDepartment(value === "all" ? undefined : value); setCurrentPage(1);  /* Reset page on new filter */}}
              value={selectedDepartment || "all"}
            >
              <SelectTrigger className="w-full md:w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                {departments.map((dept) => (
                  <SelectItem key={dept.id} value={dept.id.toString()}>
                    {dept.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {/* Graduation Year filter removed */}
          </div>
        </div>

        {/* Students List */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            {selectedDepartment || searchTerm ? "Search Results" : "All Students"}
          </h2>
          {loading && students.length === 0 && <div className="text-center text-gray-600">Loading...</div>}
          {!loading && students.length === 0 && (
            <div className="text-center text-gray-600">No students found.</div>
          )}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {students.map((student) => (
              <Card
                key={student.id}
                className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <div className="relative">
                  <Image
                    src={student.photo_url || "/placeholder.svg"}
                    alt={student.name}
                    width={300}
                    height={300}
                    className="w-full h-64 object-cover"
                  />
                  {student.is_featured && (
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-white text-gray-900">Featured</Badge>
                    </div>
                  )}
                </div>

                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-900">{student.name}</CardTitle>
                  <div className="text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <GraduationCap className="h-4 w-4" />
                      {student.department_name || student.department?.toString()}
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {student.quote && (
                    <CardDescription className="text-gray-600 italic">
                      “{student.quote}”
                    </CardDescription>
                  )}

                  {student.highlight_tagline && (
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1 flex items-center gap-2">
                        <Award className="h-4 w-4 text-yellow-500" />
                        Highlight
                      </h4>
                      <p className="text-sm text-gray-700">{student.highlight_tagline}</p>
                    </div>
                  )}

                  {student.my_story && (
                     <div>
                       <h4 className="font-semibold text-gray-900 mb-1">My Story</h4>
                       <p className="text-sm text-gray-600 line-clamp-3">{student.my_story}</p>
                     </div>
                  )}

                  {student.last_words && (
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Farewell Words</h4>
                      <p className="text-sm text-gray-600 line-clamp-3">{student.last_words}</p>
                    </div>
                  )}

                  {student.description && (
                    <div className="text-sm text-gray-600">
                      <strong>Description:</strong> {student.description}
                    </div>
                  )}

                  <Link href={`/students/${student.id}`} passHref>
                    <Button className="w-full mt-2" variant="outline">
                      View Profile
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Load More Button */}
        {nextPageUrl && (
          <div className="text-center">
            <Button size="lg" className="px-8" onClick={handleLoadMore} disabled={loadingMore}>
              {loadingMore ? "Loading..." : "Load More Students"}
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
