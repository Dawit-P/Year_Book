import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Briefcase, MapPin, Award, Search, Filter, ExternalLink, Linkedin } from "lucide-react"

// JSON data structure from Django REST API
const alumniData = {
  featured_alumni: [
    {
      id: 1,
      name: "Dr. Alemayehu Worku",
      graduation_year: 2010,
      program: "Computer Science",
      current_position: "Senior Software Engineer",
      company: "Google",
      location: "Mountain View, CA",
      achievements: ["Tech Innovation Award", "Published 15+ Papers", "Patent Holder"],
      image: "/placeholder.svg?height=300&width=300",
      bio: "Leading AI research at Google with focus on natural language processing and machine learning.",
      linkedin: "https://linkedin.com/in/alemayehu-worku",
      industry: "Technology",
    },
    {
      id: 2,
      name: "Meron Tadesse",
      graduation_year: 2012,
      program: "Electrical Engineering",
      current_position: "Renewable Energy Director",
      company: "Ethiopian Electric Power",
      location: "Addis Ababa, Ethiopia",
      achievements: ["Energy Leadership Award", "Sustainable Development Champion", "Industry Pioneer"],
      image: "/placeholder.svg?height=300&width=300",
      bio: "Pioneering renewable energy initiatives across Ethiopia and East Africa.",
      linkedin: "https://linkedin.com/in/meron-tadesse",
      industry: "Energy",
    },
    {
      id: 3,
      name: "Samuel Bekele",
      graduation_year: 2008,
      program: "Mechanical Engineering",
      current_position: "Chief Technology Officer",
      company: "Automotive Solutions Ltd",
      location: "Nairobi, Kenya",
      achievements: ["Innovation Excellence", "Startup Founder", "Industry Mentor"],
      image: "/placeholder.svg?height=300&width=300",
      bio: "Building the future of automotive technology in Africa through innovative solutions.",
      linkedin: "https://linkedin.com/in/samuel-bekele",
      industry: "Automotive",
    },
    {
      id: 4,
      name: "Dr. Tigist Hailu",
      graduation_year: 2009,
      program: "Civil Engineering",
      current_position: "Infrastructure Development Manager",
      company: "World Bank",
      location: "Washington, DC",
      achievements: ["Global Impact Award", "Infrastructure Excellence", "Policy Advisor"],
      image: "/placeholder.svg?height=300&width=300",
      bio: "Driving sustainable infrastructure development across developing nations.",
      linkedin: "https://linkedin.com/in/tigist-hailu",
      industry: "Development",
    },
    {
      id: 5,
      name: "Yohannes Tesfaye",
      graduation_year: 2011,
      program: "Chemical Engineering",
      current_position: "Research Scientist",
      company: "Pfizer",
      location: "New York, NY",
      achievements: ["Drug Discovery Award", "Research Excellence", "Patent Inventor"],
      image: "/placeholder.svg?height=300&width=300",
      bio: "Contributing to life-saving pharmaceutical research and drug development.",
      linkedin: "https://linkedin.com/in/yohannes-tesfaye",
      industry: "Pharmaceuticals",
    },
    {
      id: 6,
      name: "Rahel Girma",
      graduation_year: 2013,
      program: "Applied Mathematics",
      current_position: "Data Science Lead",
      company: "Microsoft",
      location: "Seattle, WA",
      achievements: ["AI Innovation Award", "Team Leadership", "Open Source Contributor"],
      image: "/placeholder.svg?height=300&width=300",
      bio: "Leading data science initiatives and AI product development at Microsoft.",
      linkedin: "https://linkedin.com/in/rahel-girma",
      industry: "Technology",
    },
  ],
  industries: [
    "All Industries",
    "Technology",
    "Energy",
    "Automotive",
    "Development",
    "Pharmaceuticals",
    "Finance",
    "Education",
  ],
  graduation_years: ["All Years", "2008", "2009", "2010", "2011", "2012", "2013", "2014", "2015"],
  locations: ["All Locations", "Ethiopia", "United States", "Kenya", "Germany", "Canada", "United Kingdom"],
}

export default function AlumniPage() {
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
          <div className="grid md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input placeholder="Search alumni..." className="pl-10" />
            </div>
            <Select>
              <SelectTrigger>
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Industry" />
              </SelectTrigger>
              <SelectContent>
                {alumniData.industries.map((industry) => (
                  <SelectItem key={industry} value={industry.toLowerCase().replace(/\s+/g, "-")}>
                    {industry}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Graduation Year" />
              </SelectTrigger>
              <SelectContent>
                {alumniData.graduation_years.map((year) => (
                  <SelectItem key={year} value={year.toLowerCase()}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                {alumniData.locations.map((location) => (
                  <SelectItem key={location} value={location.toLowerCase().replace(/\s+/g, "-")}>
                    {location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Alumni Stats */}
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
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Featured Alumni</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {alumniData.featured_alumni.map((alumni) => (
              <Card
                key={alumni.id}
                className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <div className="relative">
                  <Image
                    src={alumni.image || "/placeholder.svg"}
                    alt={alumni.name}
                    width={300}
                    height={300}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-white text-gray-900">Class of {alumni.graduation_year}</Badge>
                  </div>
                </div>

                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-900">{alumni.name}</CardTitle>
                  <div className="space-y-1 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Briefcase className="h-4 w-4" />
                      {alumni.current_position}
                    </div>
                    <div className="font-medium text-blue-600">{alumni.company}</div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {alumni.location}
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <CardDescription className="text-gray-600 leading-relaxed">{alumni.bio}</CardDescription>

                  {/* Program */}
                  <div>
                    <Badge variant="outline" className="mb-2">
                      {alumni.program}
                    </Badge>
                  </div>

                  {/* Achievements */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <Award className="h-4 w-4 text-yellow-500" />
                      Key Achievements
                    </h4>
                    <div className="space-y-1">
                      {alumni.achievements.slice(0, 2).map((achievement, index) => (
                        <div key={index} className="text-sm text-gray-600">
                          • {achievement}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Industry */}
                  <div className="flex justify-between items-center pt-2 border-t">
                    <span className="text-sm text-gray-600">Industry</span>
                    <Badge variant="secondary">{alumni.industry}</Badge>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <Button className="flex-1" variant="outline" size="sm">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Profile
                    </Button>
                    <Button size="sm" variant="outline">
                      <Linkedin className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 text-center text-white">
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
