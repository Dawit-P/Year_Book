"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation" // To get ID from route
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { getStudentById } from "@/lib/api"
import { Student, ProfileImage as ProfileImageType } from "@/lib/types" // Renamed ProfileImage to avoid conflict
import { GraduationCap, Award, BookOpen, MessageCircle, Image as ImageIcon } from "lucide-react"

export default function StudentDetailPage() {
  const params = useParams()
  const id = params.id ? parseInt(params.id as string, 10) : null

  const [student, setStudent] = useState<Student | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (id) {
      async function fetchStudent() {
        setLoading(true)
        setError(null)
        try {
          const data = await getStudentById(id)
          setStudent(data)
        } catch (err) {
          console.error("Failed to fetch student:", err)
          setError("Failed to load student profile. Please try again later.")
        } finally {
          setLoading(false)
        }
      }
      fetchStudent()
    } else {
      setError("No student ID found.")
      setLoading(false)
    }
  }, [id])

  if (loading) {
    return <div className="container mx-auto px-4 py-12 text-center text-lg">Loading student profile...</div>
  }

  if (error) {
    return <div className="container mx-auto px-4 py-12 text-center text-red-500 text-lg">{error}</div>
  }

  if (!student) {
    return <div className="container mx-auto px-4 py-12 text-center text-lg">Student profile not found.</div>
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <Card className="overflow-hidden shadow-xl">
          <div className="relative h-48 md:h-64 w-full bg-gray-200">
            {/* Placeholder for a potential cover image or banner */}
            <Image
              src={student.photo_url || "/placeholder.svg"} // Using main photo as a fallback banner for now
              alt={`${student.name}'s cover photo`}
              layout="fill"
              objectFit="cover"
              className="opacity-50"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
          </div>

          <div className="relative p-4 md:p-8 -mt-24 md:-mt-32">
            <div className="flex flex-col md:flex-row items-center md:items-end">
              <div className="relative h-32 w-32 md:h-48 md:w-48 rounded-full border-4 border-white shadow-lg overflow-hidden flex-shrink-0">
                <Image
                  src={student.photo_url || "/placeholder.svg"}
                  alt={student.name}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div className="md:ml-6 mt-4 md:mt-0 text-center md:text-left">
                <CardTitle className="text-3xl md:text-4xl font-bold text-gray-900">{student.name}</CardTitle>
                {student.department_name && (
                  <p className="text-lg text-blue-600 font-medium flex items-center justify-center md:justify-start gap-2">
                    <GraduationCap className="h-5 w-5" /> {student.department_name}
                  </p>
                )}
                {student.is_featured && <Badge className="mt-2">Featured Student</Badge>}
              </div>
            </div>

            <Separator className="my-8" />

            <div className="grid md:grid-cols-3 gap-8">
              {/* Left Column / Main Info */}
              <div className="md:col-span-2 space-y-6">
                {student.quote && (
                  <section>
                    <h2 className="text-xl font-semibold text-gray-800 mb-3 flex items-center gap-2">
                      <MessageCircle className="h-5 w-5 text-blue-500" />
                      My Quote
                    </h2>
                    <blockquote className="text-gray-600 italic text-lg border-l-4 border-blue-500 pl-4 py-2">
                      “{student.quote}”
                    </blockquote>
                  </section>
                )}

                {student.my_story && (
                  <section>
                    <h2 className="text-xl font-semibold text-gray-800 mb-3 flex items-center gap-2">
                      <BookOpen className="h-5 w-5 text-green-500" />
                      My Story
                    </h2>
                    <p className="text-gray-700 whitespace-pre-line leading-relaxed">{student.my_story}</p>
                  </section>
                )}

                {student.description && (
                  <section>
                     <h2 className="text-xl font-semibold text-gray-800 mb-3">Additional Details</h2>
                     <p className="text-gray-700 whitespace-pre-line leading-relaxed">{student.description}</p>
                  </section>
                )}
              </div>

              {/* Right Column / Quick Facts or Other Info */}
              <div className="space-y-6">
                {student.highlight_tagline && (
                  <Card className="shadow-md">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Award className="h-5 w-5 text-yellow-500" /> Highlight
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700">{student.highlight_tagline}</p>
                    </CardContent>
                  </Card>
                )}

                {student.last_words && (
                  <Card className="shadow-md">
                    <CardHeader>
                      <CardTitle className="text-lg">Last Words</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700">{student.last_words}</p>
                    </CardContent>
                  </Card>
                )}
                 <Card className="shadow-md">
                    <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                            <ImageIcon className="h-5 w-5 text-purple-500" /> Gallery
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {student.profile_images && student.profile_images.length > 0 ? (
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                                {student.profile_images.map((img: ProfileImageType, index: number) => (
                                <div key={index} className="relative aspect-square rounded overflow-hidden hover:opacity-80 transition-opacity">
                                    <Image
                                    src={img.image_url}
                                    alt={img.caption || `Profile image ${index + 1}`}
                                    layout="fill"
                                    objectFit="cover"
                                    />
                                    {img.caption && (
                                      <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs p-1 truncate">
                                        {img.caption}
                                      </div>
                                    )}
                                </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-sm text-gray-500">No additional images provided.</p>
                        )}
                    </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
