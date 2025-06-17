"use client"

import { useEffect, useState } from "react"
import Link from "next/link" // Added Link import
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Briefcase, Award, Search, Filter, GraduationCap, BookOpen } from "lucide-react" // Consolidated icons

import { getAlumni, getDepartments } from "@/lib/api"
import { AlumniHighlight, Department } from "@/lib/types" // Types

// Static list for graduation years for now
const availableGraduationYears = ["All Years", ...Array.from({ length: 15 }, (_, i) => (new Date().getFullYear() - i).toString())];

export default function AlumniPage() {
  const [alumniList, setAlumniList] = useState<AlumniHighlight[]>([])
  const [departments, setDepartments] = useState<Department[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedGraduationYear, setSelectedGraduationYear] = useState<string | undefined>(undefined)
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

  // Fetch alumni based on filters or page change
  useEffect(() => {
    async function fetchAlumniData(pageToFetch = 1, append = false) {
      if (!append) {
        setLoading(true)
        setAlumniList([]) // Clear alumni when filters change
        setCurrentPage(1)
      } else {
        setLoadingMore(true)
      }

      try {
        const params: { department?: number; graduation_year?: string; search?: string; page?: number } = { page: pageToFetch }
        if (selectedDepartment && selectedDepartment !== "all") {
          params.department = parseInt(selectedDepartment, 10)
        }
        if (selectedGraduationYear && selectedGraduationYear !== "All Years") {
          params.graduation_year = selectedGraduationYear
        }
        if (searchTerm) {
          params.search = searchTerm
        }

        const data = await getAlumni(params)
        if (append) {
          setAlumniList(prevAlumni => [...prevAlumni, ...(data.results || [])]);
        } else {
          setAlumniList(data.results || [])
        }
        setNextPageUrl(data.next || null)
      } catch (error) {
        console.error("Failed to fetch alumni:", error)
        if (!append) setAlumniList([])
      } finally {
        if (!append) setLoading(false)
        setLoadingMore(false)
      }
    }
    fetchAlumniData(1, false) // Initial fetch or filter change
  }, [searchTerm, selectedGraduationYear, selectedDepartment])

  const handleLoadMore = async () => {
    if (nextPageUrl && !loadingMore) {
      const nextPageNum = currentPage + 1;
      setCurrentPage(nextPageNum); // Optimistic update

      setLoadingMore(true);
      try {
        const params: { department?: number; graduation_year?: string; search?: string; page?: number } = { page: nextPageNum };
        if (selectedDepartment && selectedDepartment !== "all") {
          params.department = parseInt(selectedDepartment, 10);
        }
        if (selectedGraduationYear && selectedGraduationYear !== "All Years") {
          params.graduation_year = selectedGraduationYear;
        }
        if (searchTerm) {
          params.search = searchTerm;
        }
        const data = await getAlumni(params);
        setAlumniList(prevAlumni => [...prevAlumni, ...(data.results || [])]);
        setNextPageUrl(data.next || null);
      } catch (error) {
        console.error("Failed to load more alumni:", error);
      } finally {
        setLoadingMore(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Our Alumni</h1>
          <p className="text-xl text-gray-600">Celebrating our graduates making impact worldwide</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Search and Filter Section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-12">
          <div className="grid md:grid-cols-3 gap-4"> {/* Adjusted to 3 columns */}
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search alumni..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => {setSearchTerm(e.target.value); setCurrentPage(1);}}
              />
            </div>
            <Select
              onValueChange={(value) => {setSelectedDepartment(value === "all" ? undefined : value); setCurrentPage(1);}}
              value={selectedDepartment || "all"}
            >
              <SelectTrigger>
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
            <Select
              onValueChange={(value) => {setSelectedGraduationYear(value === "All Years" ? undefined : value); setCurrentPage(1);}}
              value={selectedGraduationYear || "All Years"}
            >
              <SelectTrigger>
                <SelectValue placeholder="Graduation Year" />
              </SelectTrigger>
              <SelectContent>
                {availableGraduationYears.map((year) => (
                  <SelectItem key={year} value={year}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {/* Industry and Location filters removed */}
          </div>
        </div>

        {/* Alumni Stats (remains static for now) */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Alumni Impact</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">45,000+</div>
              <div className="text-gray-600">Total Alumni</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">85+</div>
              <div className="text-gray-600">Countries</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">500+</div>
              <div className="text-gray-600">Companies Founded</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-600 mb-2">1,200+</div>
              <div className="text-gray-600">Patents Filed</div>
            </div>
          </div>
        </div>

        {/* Featured Alumni */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            {searchTerm || selectedDepartment || selectedGraduationYear ? "Search Results" : "Alumni Highlights"}
          </h2>
          {loading && alumniList.length === 0 && <div className="text-center text-gray-600 py-8">Loading alumni...</div>}
          {!loading && alumniList.length === 0 && (
            <div className="text-center text-gray-600 py-8">No alumni found matching your criteria.</div>
          )}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {alumniList.map((alumnus) => ( // Changed variable name to alumnus for clarity
              <Card
                key={alumnus.id}
                className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <div className="relative">
                  <Image
                    src={alumnus.photo_url || "/placeholder.svg"} // Use photo_url
                    alt={alumnus.name}
                    width={300}
                    height={300}
                    className="w-full h-64 object-cover"
                  />
                  {alumnus.graduation_year && (
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-white text-gray-900">Class of {alumnus.graduation_year}</Badge>
                    </div>
                  )}
                </div>

                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-900">{alumnus.name}</CardTitle>
                  {alumnus.department_name && (
                    <div className="text-sm text-gray-600 flex items-center gap-1">
                      <GraduationCap className="h-4 w-4" />
                      {alumnus.department_name}
                    </div>
                  )}
                </CardHeader>

                <CardContent className="space-y-4">
                  {alumnus.current_position && (
                    <div className="text-sm text-gray-700 flex items-center gap-2">
                       <Briefcase className="h-4 w-4 text-blue-500" />
                       <span>{alumnus.current_position}</span>
                    </div>
                  )}

                  {alumnus.bio && (
                    <CardDescription className="text-gray-600 italic line-clamp-3">"{alumnus.bio}"</CardDescription>
                  )}

                  {alumnus.achievement && (
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1 flex items-center gap-2">
                        <Award className="h-4 w-4 text-yellow-500" />
                        Achievement Highlight
                      </h4>
                      <p className="text-sm text-gray-700 line-clamp-2">{alumnus.achievement}</p>
                    </div>
                  )}

                  {alumnus.my_story && (
                     <div>
                       <h4 className="font-semibold text-gray-900 mb-1 flex items-center gap-2">
                         <BookOpen className="h-4 w-4 text-green-500" />
                         My Story
                       </h4>
                       <p className="text-sm text-gray-600 line-clamp-3">{alumnus.my_story}</p>
                     </div>
                  )}

                  {/* Profile Images */}
                  {alumnus.profile_images && alumnus.profile_images.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Gallery</h4>
                      <div className="flex space-x-2 overflow-x-auto pb-2">
                        {alumnus.profile_images.map(img => (
                          <Image key={img.image_url} src={img.image_url} alt={img.caption || alumnus.name} width={80} height={80} className="rounded object-cover h-20 w-20 hover:opacity-80 transition-opacity"/>
                        ))}
                      </div>
                    </div>
                  )}

                  <Link href={`/alumni/${alumnus.id}`} passHref>
                    <Button className="w-full mt-2" variant="outline">
                      View Profile
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        {nextPageUrl && (
          <div className="text-center mt-12">
            <Button size="lg" className="px-8" onClick={handleLoadMore} disabled={loadingMore}>
              {loadingMore ? "Loading..." : "Load More Alumni"}
            </Button>
          </div>
        )}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 text-center text-white mt-12"> {/* Added mt-12 for spacing */}
          <h3 className="text-2xl font-bold mb-4">Join Our Alumni Network</h3>
          <p className="text-lg mb-6 opacity-90">
            Connect with fellow graduates, share your achievements, and give back to the ASTU community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              Update Your Profile
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
              Alumni Directory
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
