import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Heart, MessageSquare, Calendar, User, Camera, Plus, Filter, Search } from "lucide-react"

// JSON data structure from Django REST API
const memoryBoardData = {
  memories: [
    {
      id: 1,
      title: "First Day at ASTU",
      content:
        "I still remember walking through the gates of ASTU for the first time. The excitement, nervousness, and hope all mixed together. Little did I know this place would become my second home and shape who I am today.",
      author: "Hanan Mohammed",
      author_program: "Computer Science",
      author_year: "Class of 2024",
      date_posted: "2024-01-15",
      category: "Campus Life",
      image: "/placeholder.svg?height=300&width=400",
      likes: 45,
      comments: 12,
      tags: ["freshman", "campus", "memories"],
    },
    {
      id: 2,
      title: "Late Night Lab Sessions",
      content:
        "Those countless hours in the engineering lab, debugging code until 3 AM with my project partners. We complained then, but now I miss those moments of discovery and friendship forged through shared struggles.",
      author: "Daniel Tadesse",
      author_program: "Electrical Engineering",
      author_year: "Class of 2025",
      date_posted: "2024-01-18",
      category: "Academic",
      image: "/placeholder.svg?height=300&width=400",
      likes: 38,
      comments: 8,
      tags: ["lab", "teamwork", "engineering"],
    },
    {
      id: 3,
      title: "Graduation Day Joy",
      content:
        "The moment I walked across that stage and received my diploma, I felt the weight of four years of hard work and the excitement for what's ahead. Thank you ASTU for this incredible journey!",
      author: "Meron Bekele",
      author_program: "Chemical Engineering",
      author_year: "Class of 2023",
      date_posted: "2024-01-20",
      category: "Graduation",
      image: "/placeholder.svg?height=300&width=400",
      likes: 67,
      comments: 23,
      tags: ["graduation", "achievement", "celebration"],
    },
    {
      id: 4,
      title: "Cultural Festival Magic",
      content:
        "The annual cultural festival where students from all backgrounds came together to celebrate our diversity. The music, food, and friendships made that day will forever be etched in my heart.",
      author: "Samuel Girma",
      author_program: "Mechanical Engineering",
      author_year: "Class of 2026",
      date_posted: "2024-01-22",
      category: "Events",
      image: "/placeholder.svg?height=300&width=400",
      likes: 52,
      comments: 15,
      tags: ["culture", "festival", "diversity"],
    },
    {
      id: 5,
      title: "Professor's Life Lesson",
      content:
        "Dr. Alemayehu once told us, 'Technology is not just about code, it's about solving human problems.' That simple statement changed my entire perspective on what it means to be an engineer.",
      author: "Rahel Hailu",
      author_program: "Applied Mathematics",
      author_year: "Class of 2024",
      date_posted: "2024-01-25",
      category: "Inspiration",
      image: "/placeholder.svg?height=300&width=400",
      likes: 41,
      comments: 9,
      tags: ["wisdom", "professor", "inspiration"],
    },
    {
      id: 6,
      title: "Study Group Adventures",
      content:
        "Our study group that started as academic necessity became a lifelong friendship. From cramming for exams to celebrating successes, we did it all together. ASTU gave us more than education—it gave us family.",
      author: "Yonas Tesfaye",
      author_program: "Civil Engineering",
      author_year: "Class of 2025",
      date_posted: "2024-01-28",
      category: "Friendship",
      image: "/placeholder.svg?height=300&width=400",
      likes: 59,
      comments: 18,
      tags: ["friendship", "study", "support"],
    },
  ],
  categories: [
    "All Categories",
    "Campus Life",
    "Academic",
    "Graduation",
    "Events",
    "Inspiration",
    "Friendship",
    "Sports",
    "Clubs",
  ],
  years: ["All Years", "2024", "2023", "2022", "2021", "2020"],
}

export default function MemoryBoardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center gap-3 mb-4">
            <MessageSquare className="h-8 w-8 text-blue-500" />
            <h1 className="text-4xl font-bold text-gray-900">Memory Board</h1>
          </div>
          <p className="text-xl text-gray-600">Share and explore cherished memories from our ASTU community</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Add Memory Section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Plus className="h-6 w-6 text-blue-500" />
            <h2 className="text-xl font-bold text-gray-900">Share Your Memory</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <Input placeholder="Memory title..." />
              <Textarea placeholder="Share your ASTU memory..." className="min-h-32" />
              <div className="flex gap-4">
                <Select>
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {memoryBoardData.categories.slice(1).map((category) => (
                      <SelectItem key={category} value={category.toLowerCase().replace(/\s+/g, "-")}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button variant="outline">
                  <Camera className="h-4 w-4 mr-2" />
                  Add Photo
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-8">
              <div className="text-center text-gray-500">
                <Camera className="h-12 w-12 mx-auto mb-2" />
                <p>Upload a photo to accompany your memory</p>
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <Button className="px-8">Share Memory</Button>
          </div>
        </div>

        {/* Filter Section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input placeholder="Search memories..." className="pl-10" />
            </div>
            <Select>
              <SelectTrigger className="w-full md:w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {memoryBoardData.categories.map((category) => (
                  <SelectItem key={category} value={category.toLowerCase().replace(/\s+/g, "-")}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent>
                {memoryBoardData.years.map((year) => (
                  <SelectItem key={year} value={year.toLowerCase()}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Memories Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {memoryBoardData.memories.map((memory) => (
            <Card
              key={memory.id}
              className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              {memory.image && (
                <div className="relative">
                  <Image
                    src={memory.image || "/placeholder.svg"}
                    alt={memory.title}
                    width={400}
                    height={300}
                    className="w-full h-48 object-cover"
                  />
                  <Badge className="absolute top-4 left-4 bg-white text-gray-900">{memory.category}</Badge>
                </div>
              )}

              <CardHeader>
                <CardTitle className="text-lg font-bold text-gray-900 leading-tight">{memory.title}</CardTitle>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <User className="h-4 w-4" />
                  <span>{memory.author}</span>
                  <span>•</span>
                  <span>{memory.author_program}</span>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <CardDescription className="text-gray-700 leading-relaxed line-clamp-4">
                  {memory.content}
                </CardDescription>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {memory.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      #{tag}
                    </Badge>
                  ))}
                </div>

                {/* Engagement Stats */}
                <div className="flex items-center justify-between pt-2 border-t">
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Heart className="h-4 w-4" />
                      {memory.likes}
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageSquare className="h-4 w-4" />
                      {memory.comments}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Calendar className="h-3 w-3" />
                    {new Date(memory.date_posted).toLocaleDateString()}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Heart className="h-4 w-4 mr-1" />
                    Like
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <MessageSquare className="h-4 w-4 mr-1" />
                    Comment
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button size="lg" variant="outline" className="px-8">
            Load More Memories
          </Button>
        </div>

        {/* Community Guidelines */}
        <div className="bg-blue-50 rounded-lg p-6 mt-12">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Community Guidelines</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
            <div>
              <h4 className="font-semibold mb-2">✓ Do:</h4>
              <ul className="space-y-1">
                <li>• Share genuine ASTU experiences</li>
                <li>• Be respectful and inclusive</li>
                <li>• Use appropriate language</li>
                <li>• Credit others in your stories</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">✗ Don't:</h4>
              <ul className="space-y-1">
                <li>• Share inappropriate content</li>
                <li>• Post without permission</li>
                <li>• Use offensive language</li>
                <li>• Violate privacy</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
