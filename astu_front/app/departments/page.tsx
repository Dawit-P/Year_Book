import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Users, BookOpen, Award, ExternalLink } from "lucide-react"

// JSON data structure from Django REST API
const departmentsData = {
  departments: [
    {
      id: 1,
      name: "Computer Science and Engineering",
      code: "CSE",
      description: "Leading innovation in software development, artificial intelligence, and computer systems.",
      head: "Dr. Alemayehu Tadesse",
      faculty_count: 45,
      student_count: 1200,
      programs: ["BSc Computer Science", "MSc Software Engineering", "PhD Computer Science"],
      achievements: ["Best Research Department 2023", "Innovation Award 2022"],
      image: "/placeholder.svg?height=300&width=400",
      established: 1995,
    },
    {
      id: 2,
      name: "Electrical and Electronics Engineering",
      code: "EEE",
      description: "Advancing electrical systems, renewable energy, and electronics innovation.",
      head: "Dr. Meron Zeleke",
      faculty_count: 38,
      student_count: 980,
      programs: ["BSc Electrical Engineering", "MSc Power Systems", "PhD Electronics"],
      achievements: ["Energy Innovation Award 2023", "Research Excellence 2022"],
      image: "/placeholder.svg?height=300&width=400",
      established: 1993,
    },
    {
      id: 3,
      name: "Mechanical Engineering",
      code: "ME",
      description: "Engineering solutions for manufacturing, automotive, and industrial systems.",
      head: "Dr. Bekele Worku",
      faculty_count: 42,
      student_count: 1100,
      programs: ["BSc Mechanical Engineering", "MSc Manufacturing", "PhD Mechanical Systems"],
      achievements: ["Industry Partnership Award 2023", "Design Excellence 2022"],
      image: "/placeholder.svg?height=300&width=400",
      established: 1994,
    },
    {
      id: 4,
      name: "Civil and Environmental Engineering",
      code: "CEE",
      description: "Building sustainable infrastructure and environmental solutions.",
      head: "Dr. Tigist Hailu",
      faculty_count: 35,
      student_count: 850,
      programs: ["BSc Civil Engineering", "MSc Environmental Engineering", "PhD Infrastructure"],
      achievements: ["Sustainability Award 2023", "Infrastructure Innovation 2022"],
      image: "/placeholder.svg?height=300&width=400",
      established: 1996,
    },
    {
      id: 5,
      name: "Chemical Engineering",
      code: "ChE",
      description: "Developing processes for chemical production and environmental protection.",
      head: "Dr. Samuel Teshome",
      faculty_count: 28,
      student_count: 650,
      programs: ["BSc Chemical Engineering", "MSc Process Engineering", "PhD Chemical Systems"],
      achievements: ["Process Innovation Award 2023", "Safety Excellence 2022"],
      image: "/placeholder.svg?height=300&width=400",
      established: 1998,
    },
    {
      id: 6,
      name: "Applied Mathematics",
      code: "AM",
      description: "Mathematical modeling and computational solutions for real-world problems.",
      head: "Dr. Rahel Belete",
      faculty_count: 25,
      student_count: 450,
      programs: ["BSc Applied Mathematics", "MSc Computational Mathematics", "PhD Mathematics"],
      achievements: ["Mathematical Excellence 2023", "Research Impact 2022"],
      image: "/placeholder.svg?height=300&width=400",
      established: 2000,
    },
  ],
}

export default function DepartmentsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Academic Departments</h1>
          <p className="text-xl text-gray-600">Explore our diverse academic departments and their excellence</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Overview Stats */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">{departmentsData.departments.length}</div>
              <div className="text-gray-600">Departments</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">
                {departmentsData.departments.reduce((sum, dept) => sum + dept.faculty_count, 0)}
              </div>
              <div className="text-gray-600">Faculty Members</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">
                {departmentsData.departments.reduce((sum, dept) => sum + dept.student_count, 0).toLocaleString()}
              </div>
              <div className="text-gray-600">Students</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-600 mb-2">
                {departmentsData.departments.reduce((sum, dept) => sum + dept.programs.length, 0)}
              </div>
              <div className="text-gray-600">Programs</div>
            </div>
          </div>
        </div>

        {/* Departments Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {departmentsData.departments.map((department) => (
            <Card key={department.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="relative">
                <Image
                  src={department.image || "/placeholder.svg"}
                  alt={department.name}
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <Badge className="absolute top-4 left-4 bg-white text-gray-900">{department.code}</Badge>
              </div>

              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <CardTitle className="text-xl font-bold text-gray-900 leading-tight">{department.name}</CardTitle>
                  <Badge variant="outline">Est. {department.established}</Badge>
                </div>
                <CardDescription className="text-gray-600 leading-relaxed">{department.description}</CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Department Head */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Department Head</h4>
                  <p className="text-gray-600">{department.head}</p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-blue-500" />
                    <span className="text-sm text-gray-600">{department.faculty_count} Faculty</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-green-500" />
                    <span className="text-sm text-gray-600">{department.student_count} Students</span>
                  </div>
                </div>

                {/* Programs */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Programs Offered</h4>
                  <div className="flex flex-wrap gap-2">
                    {department.programs.map((program, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {program}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Achievements */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Recent Achievements</h4>
                  <div className="space-y-1">
                    {department.achievements.map((achievement, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Award className="h-3 w-3 text-yellow-500" />
                        <span className="text-sm text-gray-600">{achievement}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Button */}
                <Button className="w-full" variant="outline">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View Department Details
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
