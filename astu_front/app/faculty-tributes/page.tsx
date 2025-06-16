import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Heart, Award, BookOpen, Users, Calendar, Quote } from "lucide-react"

// JSON data structure from Django REST API
const facultyTributesData = {
  featured_tributes: [
    {
      id: 1,
      name: "Dr. Alemayehu Tadesse",
      title: "Professor of Computer Science",
      department: "Computer Science and Engineering",
      years_of_service: 25,
      specialization: "Artificial Intelligence & Machine Learning",
      image: "/placeholder.svg?height=300&width=300",
      tribute:
        "Dr. Alemayehu has been an inspiring mentor who transformed countless students into innovative thinkers. His dedication to research and teaching excellence has shaped the future of AI in Ethiopia.",
      achievements: ["Excellence in Teaching Award 2023", "Research Innovation Grant", "Best Mentor Award"],
      courses_taught: ["Introduction to AI", "Machine Learning", "Data Structures"],
      student_testimonial:
        "Dr. Alemayehu didn't just teach us algorithms; he taught us how to think and solve real-world problems.",
      submitted_by: "Class of 2023 Students",
      submission_date: "2024-01-15",
    },
    {
      id: 2,
      name: "Prof. Meron Zeleke",
      title: "Professor of Electrical Engineering",
      department: "Electrical and Electronics Engineering",
      years_of_service: 20,
      specialization: "Power Systems & Renewable Energy",
      image: "/placeholder.svg?height=300&width=300",
      tribute:
        "Professor Meron's passion for sustainable energy has inspired a generation of engineers. Her groundbreaking research in renewable energy systems continues to impact Ethiopia's energy sector.",
      achievements: ["National Science Award", "Green Energy Pioneer", "Industry Partnership Excellence"],
      courses_taught: ["Power Systems", "Renewable Energy", "Circuit Analysis"],
      student_testimonial: "Prof. Meron showed us that engineering can change the world and protect our environment.",
      submitted_by: "EEE Alumni Association",
      submission_date: "2024-01-20",
    },
    {
      id: 3,
      name: "Dr. Bekele Worku",
      title: "Associate Professor of Mechanical Engineering",
      department: "Mechanical Engineering",
      years_of_service: 18,
      specialization: "Manufacturing & Design",
      image: "/placeholder.svg?height=300&width=300",
      tribute:
        "Dr. Bekele's innovative approach to mechanical design has revolutionized how we think about manufacturing in Ethiopia. His mentorship extends far beyond the classroom.",
      achievements: ["Innovation in Education Award", "Industry Collaboration Excellence", "Student Choice Award"],
      courses_taught: ["Manufacturing Processes", "Mechanical Design", "CAD/CAM"],
      student_testimonial: "Dr. Bekele taught us that every design should serve humanity and improve lives.",
      submitted_by: "Mechanical Engineering Faculty",
      submission_date: "2024-01-25",
    },
    {
      id: 4,
      name: "Dr. Tigist Hailu",
      title: "Professor of Civil Engineering",
      department: "Civil and Environmental Engineering",
      years_of_service: 22,
      specialization: "Structural Engineering & Sustainability",
      image: "/placeholder.svg?height=300&width=300",
      tribute:
        "Dr. Tigist has been a pillar of strength in our department. Her commitment to sustainable construction practices has influenced infrastructure development across the region.",
      achievements: ["Lifetime Achievement Award", "Sustainable Development Champion", "Research Excellence"],
      courses_taught: ["Structural Analysis", "Sustainable Construction", "Project Management"],
      student_testimonial: "Dr. Tigist taught us to build not just structures, but sustainable futures.",
      submitted_by: "Civil Engineering Students",
      submission_date: "2024-02-01",
    },
    {
      id: 5,
      name: "Prof. Samuel Teshome",
      title: "Professor of Chemical Engineering",
      department: "Chemical Engineering",
      years_of_service: 19,
      specialization: "Process Engineering & Environmental Protection",
      image: "/placeholder.svg?height=300&width=300",
      tribute:
        "Professor Samuel's dedication to environmental protection through chemical engineering has inspired countless students to pursue careers in sustainable technology.",
      achievements: ["Environmental Excellence Award", "Process Innovation Recognition", "Mentorship Excellence"],
      courses_taught: ["Chemical Process Design", "Environmental Engineering", "Reaction Engineering"],
      student_testimonial: "Prof. Samuel showed us how chemistry can heal our planet.",
      submitted_by: "Chemical Engineering Alumni",
      submission_date: "2024-02-05",
    },
    {
      id: 6,
      name: "Dr. Rahel Belete",
      title: "Associate Professor of Applied Mathematics",
      department: "Applied Mathematics",
      years_of_service: 15,
      specialization: "Computational Mathematics & Data Science",
      image: "/placeholder.svg?height=300&width=300",
      tribute:
        "Dr. Rahel has made mathematics accessible and exciting for thousands of students. Her innovative teaching methods have transformed how we approach mathematical problem-solving.",
      achievements: ["Teaching Innovation Award", "Mathematical Excellence Recognition", "Student Impact Award"],
      courses_taught: ["Calculus", "Linear Algebra", "Computational Methods"],
      student_testimonial: "Dr. Rahel made us fall in love with mathematics and see its beauty in everything.",
      submitted_by: "Mathematics Department",
      submission_date: "2024-02-10",
    },
  ],
}

export default function FacultyTributesPage() {
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
          {facultyTributesData.featured_tributes.map((tribute, index) => (
            <Card
              key={tribute.id}
              className={`border-0 shadow-lg overflow-hidden ${index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} lg:flex`}
            >
              <div className="lg:w-1/3">
                <Image
                  src={tribute.image || "/placeholder.svg"}
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
                      <p className="text-lg text-blue-600 font-medium">{tribute.title}</p>
                      <p className="text-gray-600">{tribute.department}</p>
                    </div>
                    <div className="text-right">
                      <Badge variant="outline" className="mb-2">
                        {tribute.years_of_service} Years of Service
                      </Badge>
                      <p className="text-sm text-gray-600">{tribute.specialization}</p>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="p-0 space-y-6">
                  {/* Tribute Text */}
                  <div className="relative">
                    <Quote className="absolute -top-2 -left-2 h-8 w-8 text-blue-200" />
                    <blockquote className="text-lg text-gray-700 italic leading-relaxed pl-6">
                      {tribute.tribute}
                    </blockquote>
                  </div>

                  {/* Student Testimonial */}
                  <div className="bg-blue-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <Users className="h-4 w-4 text-blue-500" />
                      Student Voice
                    </h4>
                    <p className="text-gray-700 italic">"{tribute.student_testimonial}"</p>
                  </div>

                  {/* Achievements */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <Award className="h-4 w-4 text-yellow-500" />
                      Key Achievements
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {tribute.achievements.map((achievement, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {achievement}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Courses Taught */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-green-500" />
                      Courses Taught
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {tribute.courses_taught.map((course, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {course}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Submission Info */}
                  <div className="flex justify-between items-center pt-4 border-t text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {new Date(tribute.submission_date).toLocaleDateString()}
                    </div>
                    <div>
                      <span className="font-medium">Submitted by:</span> {tribute.submitted_by}
                    </div>
                  </div>
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
