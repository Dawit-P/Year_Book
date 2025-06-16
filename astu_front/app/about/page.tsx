import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Award } from "lucide-react"

// JSON data structure that would come from Django REST API
const aboutData = {
  university: {
    name: "Adama Science and Technology University",
    established: 1993,
    location: "Adama, Ethiopia",
    motto: "Excellence in Science and Technology",
    description:
      "ASTU is a leading institution of higher learning in Ethiopia, dedicated to advancing science, technology, and innovation for national development.",
    vision: "To be a world-class university in science and technology education, research, and innovation.",
    mission:
      "To provide quality education, conduct cutting-edge research, and serve the community through science and technology.",
    image: "/placeholder.svg?height=400&width=600",
  },
  achievements: [
    {
      id: 1,
      title: "Research Excellence Award",
      year: 2023,
      description: "Recognized for outstanding contributions to scientific research in East Africa",
    },
    {
      id: 2,
      title: "Innovation Hub Certification",
      year: 2022,
      description: "Certified as a regional innovation and technology transfer hub",
    },
    {
      id: 3,
      title: "International Partnership",
      year: 2021,
      description: "Established partnerships with 15+ international universities",
    },
  ],
  stats: {
    students: 15420,
    faculty: 890,
    programs: 45,
    research_projects: 120,
  },
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">About ASTU</h1>
          <p className="text-xl text-gray-600">Discover our history, mission, and commitment to excellence</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">{aboutData.university.name}</h2>
            <div className="flex flex-wrap gap-4 mb-6">
              <Badge variant="secondary" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Est. {aboutData.university.established}
              </Badge>
              <Badge variant="secondary" className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                {aboutData.university.location}
              </Badge>
            </div>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">{aboutData.university.description}</p>
            <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-600">
              "{aboutData.university.motto}"
            </blockquote>
          </div>
          <div className="relative">
            <Image
              src={aboutData.university.image || "/placeholder.svg"}
              alt="ASTU Campus"
              width={600}
              height={400}
              className="rounded-lg shadow-lg object-cover w-full h-80"
            />
          </div>
        </div>

        {/* Vision & Mission */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-blue-600">Our Vision</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">{aboutData.university.vision}</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-green-600">Our Mission</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">{aboutData.university.mission}</p>
            </CardContent>
          </Card>
        </div>

        {/* Statistics */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">By the Numbers</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">{aboutData.stats.students.toLocaleString()}</div>
              <div className="text-gray-600">Students</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">{aboutData.stats.faculty}</div>
              <div className="text-gray-600">Faculty Members</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">{aboutData.stats.programs}</div>
              <div className="text-gray-600">Academic Programs</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">{aboutData.stats.research_projects}</div>
              <div className="text-gray-600">Research Projects</div>
            </div>
          </div>
        </div>

        {/* Achievements */}
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-8">Recent Achievements</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {aboutData.achievements.map((achievement) => (
              <Card key={achievement.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <Award className="h-5 w-5 text-yellow-500" />
                    <Badge variant="outline">{achievement.year}</Badge>
                  </div>
                  <CardTitle className="text-lg">{achievement.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">{achievement.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
