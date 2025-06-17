"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { getAlumniById } from "@/lib/api" // Ensure this is created in api.ts
import { AlumniHighlight, ProfileImage as ProfileImageType } from "@/lib/types"
import { GraduationCap, Briefcase, Award, BookOpen, Image as ImageIcon, Calendar } from "lucide-react"

export default function AlumniDetailPage() {
  const params = useParams()
  const id = params.id ? parseInt(params.id as string, 10) : null

  const [alumni, setAlumni] = useState<AlumniHighlight | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (id) {
      async function fetchAlumni() {
        setLoading(true)
        setError(null)
        try {
          const data = await getAlumniById(id)
          setAlumni(data)
        } catch (err) {
          console.error("Failed to fetch alumni:", err)
          setError("Failed to load alumni profile. Please try again later.")
        } finally {
          setLoading(false)
        }
      }
      fetchAlumni()
    } else {
      setError("No alumni ID found.")
      setLoading(false)
    }
  }, [id])

  if (loading) {
    return <div className="container mx-auto px-4 py-12 text-center text-lg">Loading alumni profile...</div>
  }

  if (error) {
    return <div className="container mx-auto px-4 py-12 text-center text-red-500 text-lg">{error}</div>
  }

  if (!alumni) {
    return <div className="container mx-auto px-4 py-12 text-center text-lg">Alumni profile not found.</div>
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <Card className="overflow-hidden shadow-xl">
          <div className="relative h-48 md:h-64 w-full bg-gray-200">
             <Image
              src={alumni.photo_url || "/placeholder.svg"}
              alt={`${alumni.name}'s cover photo`}
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
                  src={alumni.photo_url || "/placeholder.svg"}
                  alt={alumni.name}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div className="md:ml-6 mt-4 md:mt-0 text-center md:text-left">
                <CardTitle className="text-3xl md:text-4xl font-bold text-gray-900">{alumni.name}</CardTitle>
                {alumni.department_name && (
                  <p className="text-lg text-blue-600 font-medium flex items-center justify-center md:justify-start gap-2">
                    <GraduationCap className="h-5 w-5" /> {alumni.department_name}
                    {alumni.graduation_year && (
                        <span className="text-gray-500 text-base">(Class of {alumni.graduation_year})</span>
                    )}
                  </p>
                )}
                 {alumni.current_position && (
                    <p className="text-md text-gray-700 flex items-center justify-center md:justify-start gap-2 mt-1">
                        <Briefcase className="h-5 w-5" /> {alumni.current_position}
                    </p>
                 )}
              </div>
            </div>

            <Separator className="my-8" />

            <div className="grid md:grid-cols-3 gap-8">
              {/* Left Column / Main Info */}
              <div className="md:col-span-2 space-y-6">
                {alumni.bio && (
                  <section>
                    <h2 className="text-xl font-semibold text-gray-800 mb-3">About Me</h2>
                    <p className="text-gray-700 whitespace-pre-line leading-relaxed">{alumni.bio}</p>
                  </section>
                )}

                {alumni.my_story && (
                  <section>
                    <h2 className="text-xl font-semibold text-gray-800 mb-3 flex items-center gap-2">
                      <BookOpen className="h-5 w-5 text-green-500" />
                      My ASTU Story
                    </h2>
                    <p className="text-gray-700 whitespace-pre-line leading-relaxed">{alumni.my_story}</p>
                  </section>
                )}
              </div>

              {/* Right Column / Quick Facts or Other Info */}
              <div className="space-y-6">
                {alumni.achievement && (
                  <Card className="shadow-md">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Award className="h-5 w-5 text-yellow-500" /> Achievement Highlight
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700">{alumni.achievement}</p>
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
                        {alumni.profile_images && alumni.profile_images.length > 0 ? (
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                                {alumni.profile_images.map((img: ProfileImageType, index: number) => (
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

                {alumni.created_at && (
                     <div className="text-sm text-gray-500">
                        Profile last updated: {new Date(alumni.created_at).toLocaleDateString()}
                     </div>
                )}
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
