import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Users, GraduationCap, Heart, MessageSquare, Building } from "lucide-react"

// Placeholder data that would come from Django REST API
const heroData = {
  title: "ASTU Yearbook 2024",
  subtitle: "Celebrating Excellence, Innovation, and Community",
  description: "Discover the stories, achievements, and memories that define our university community.",
  backgroundImage: "/placeholder.svg?height=600&width=1200",
}

const statsData = {
  students: 15420,
  faculty: 890,
  departments: 12,
  alumni: 45000,
}

const featuredSections = [
  {
    id: "about",
    title: "About ASTU",
    description: "Learn about our university's rich history, mission, and vision for the future.",
    icon: BookOpen,
    href: "/about",
    color: "bg-blue-500",
  },
  {
    id: "departments",
    title: "Departments",
    description: "Explore our diverse academic departments and their outstanding achievements.",
    icon: Building,
    href: "/departments",
    color: "bg-green-500",
  },
  {
    id: "students",
    title: "Students",
    description: "Meet our brilliant students and discover their remarkable journeys.",
    icon: Users,
    href: "/students",
    color: "bg-purple-500",
  },
  {
    id: "alumni",
    title: "Alumni",
    description: "Connect with our successful graduates making impact worldwide.",
    icon: GraduationCap,
    href: "/alumni",
    color: "bg-orange-500",
  },
  {
    id: "faculty-tributes",
    title: "Faculty Tributes",
    description: "Honor our dedicated educators who shape minds and inspire futures.",
    icon: Heart,
    href: "/faculty-tributes",
    color: "bg-red-500",
  },
  {
    id: "memory-board",
    title: "Memory Board",
    description: "Share and explore cherished memories from our university community.",
    icon: MessageSquare,
    href: "/memory-board",
    color: "bg-indigo-500",
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Navigation */}
      <nav className="bg-white/95 backdrop-blur-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">ASTU Yearbook</span>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              {featuredSections.map((section) => (
                <Link
                  key={section.id}
                  href={section.href}
                  className="text-gray-600 hover:text-blue-600 transition-colors font-medium"
                >
                  {section.title}
                </Link>
              ))}
            </div>
            <Button className="md:hidden">Menu</Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-purple-600/90" />
        <Image
          src={heroData.backgroundImage || "/placeholder.svg"}
          alt="ASTU Campus"
          fill
          className="object-cover -z-10"
        />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">{heroData.title}</h1>
            <p className="text-xl md:text-2xl mb-4 font-medium">{heroData.subtitle}</p>
            <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">{heroData.description}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                Explore Stories
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-blue-600"
              >
                View Gallery
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                {statsData.students.toLocaleString()}
              </div>
              <div className="text-gray-600 font-medium">Students</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-green-600 mb-2">{statsData.faculty}</div>
              <div className="text-gray-600 font-medium">Faculty</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-purple-600 mb-2">{statsData.departments}</div>
              <div className="text-gray-600 font-medium">Departments</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-orange-600 mb-2">
                {statsData.alumni.toLocaleString()}
              </div>
              <div className="text-gray-600 font-medium">Alumni</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Sections */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Explore Our Community</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Dive into the rich tapestry of stories, achievements, and memories that make ASTU special.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredSections.map((section) => {
              const IconComponent = section.icon
              return (
                <Card key={section.id} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                  <CardHeader className="pb-4">
                    <div
                      className={`w-12 h-12 rounded-lg ${section.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                    >
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-xl font-bold text-gray-900">{section.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-600 mb-6 leading-relaxed">
                      {section.description}
                    </CardDescription>
                    <Link href={section.href}>
                      <Button className="w-full group-hover:bg-gray-900 transition-colors">
                        Explore {section.title}
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Be Part of Our Story</h2>
            <p className="text-xl mb-8 opacity-90">
              Share your memories, connect with classmates, and celebrate the ASTU community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                Share Your Story
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-blue-600"
              >
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <BookOpen className="h-6 w-6" />
                <span className="text-xl font-bold">ASTU Yearbook</span>
              </div>
              <p className="text-gray-400">
                Preserving memories and celebrating achievements of our university community.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/about" className="hover:text-white transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/departments" className="hover:text-white transition-colors">
                    Departments
                  </Link>
                </li>
                <li>
                  <Link href="/students" className="hover:text-white transition-colors">
                    Students
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Community</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/alumni" className="hover:text-white transition-colors">
                    Alumni
                  </Link>
                </li>
                <li>
                  <Link href="/faculty-tributes" className="hover:text-white transition-colors">
                    Faculty
                  </Link>
                </li>
                <li>
                  <Link href="/memory-board" className="hover:text-white transition-colors">
                    Memories
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Contact</h3>
              <p className="text-gray-400">
                Adama Science and Technology University
                <br />
                Adama, Ethiopia
                <br />
                info@astu.edu.et
              </p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 ASTU Yearbook. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
