import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
"use client"

import { useEffect, useState } from "react" // Added imports
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Heart, Award, BookOpen, Users, Calendar, Quote, Briefcase, GraduationCap } from "lucide-react" // Added Briefcase, GraduationCap

import { getFacultyTributes } from "@/lib/api" // API import
import { FacultyTribute } from "@/lib/types" // Type import

export default function FacultyTributesPage() {
  const [facultyTributes, setFacultyTributes] = useState<FacultyTribute[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchTributes() {
      try {
        const data = await getFacultyTributes()
        setFacultyTributes(data.results || data || []) // Adjust based on actual API response structure
      } catch (error) {
        console.error("Failed to fetch faculty tributes:", error)
        setFacultyTributes([])
      } finally {
        setLoading(false)
      }
    }
    fetchTributes()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-lg text-gray-600">
        Loading faculty tributes...
      </div>
    )
  }

  if (!loading && facultyTributes.length === 0) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center text-lg text-gray-600">
        <div className="bg-white border-b w-full">
         <div className="container mx-auto px-4 py-8">
           <div className="flex items-center gap-3 mb-4">
             <Heart className="h-8 w-8 text-red-500" />
             <h1 className="text-4xl font-bold text-gray-900">Faculty Tributes</h1>
           </div>
           <p className="text-xl text-gray-600">Honoring our dedicated educators who inspire and shape futures</p>
         </div>
       </div>
        <div className="container mx-auto px-4 py-12 text-center">
          No faculty tributes available at the moment.
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center gap-3 mb-4">
            <Heart className="h-8 w-8 text-red-500" />
            <h1 className="text-4xl font-bold text-gray-900">Faculty Tributes</h1>
          </div>
          <p className="text-xl text-gray-600">Honoring our dedicated educators who inspire and shape futures</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Introduction */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-12 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Celebrating Excellence in Education</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Our faculty members are more than educators—they are mentors, researchers, and inspirations who dedicate
            their lives to nurturing the next generation of leaders. These tributes celebrate their invaluable
            contributions to our university community.
          </p>
        </div>

        {/* Faculty Tributes */}
        <div className="space-y-12">
          {facultyTributes.map((tribute, index) => (
            <Card
              key={tribute.id}
              className={`border-0 shadow-lg overflow-hidden ${index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} lg:flex`}
            >
              <div className="lg:w-1/3">
                <Image
                  src={tribute.photo_url || "/placeholder.svg"} // Use photo_url
                  alt={tribute.name}
                  width={300}
                  height={400}
                  className="w-full h-80 lg:h-full object-cover"
                />
              </div>

              <div className="lg:w-2/3 p-8">
                <CardHeader className="p-0 mb-6">
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                    <div>
                      <CardTitle className="text-2xl font-bold text-gray-900 mb-2">{tribute.name}</CardTitle>
                      {tribute.position && <p className="text-lg text-blue-600 font-medium flex items-center gap-2"><Briefcase className="h-5 w-5"/>{tribute.position}</p>}
                      {tribute.department_name && <p className="text-sm text-gray-600 flex items-center gap-2"><GraduationCap className="h-4 w-4"/>{tribute.department_name}</p>} {/* Adjusted text size & icon size */}
                    </div>
                    <div className="text-right space-y-1">
                      {tribute.years_of_service !== null && tribute.years_of_service !== undefined && (
                        <Badge variant="outline">
                          {tribute.years_of_service} Years of Service
                        </Badge>
                      )}
                      {tribute.specialization && <p className="text-sm text-gray-600">{tribute.specialization}</p>}
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="p-0 space-y-6">
                  {/* Tribute Message */}
                  {tribute.message && (
                    <div className="relative">
                      <Quote className="absolute -top-2 -left-2 h-8 w-8 text-blue-200" />
                      <blockquote className="text-lg text-gray-700 italic leading-relaxed pl-6">
                        {tribute.message}
                      </blockquote>
                    </div>
                  )}
                  {/* Removed Achievements, Courses Taught, Student Testimonial, Submission Info sections
                      as these fields are no longer in the FacultyTribute type from the backend.
                      The `message` field is now the primary content for the tribute.
                  */}
                </CardContent>
              </div>
            </Card>
          ))}
        </div>

        {/* Submit Tribute CTA */}
        <div className="bg-gradient-to-r from-red-500 to-pink-600 rounded-lg p-8 text-center text-white mt-16">
          <Heart className="h-12 w-12 mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-4">Share Your Tribute</h3>
          <p className="text-lg mb-6 opacity-90 max-w-2xl mx-auto">
            Have a faculty member who made a difference in your life? Share your story and help us celebrate the
            educators who inspire us all.
          </p>
          <Button size="lg" className="bg-white text-red-600 hover:bg-gray-100">
            Submit a Tribute
          </Button>
        </div>
      </div>
    </div>
  )
}
