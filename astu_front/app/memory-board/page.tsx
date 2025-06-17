import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, User, Camera, Plus, Filter, Search, GraduationCap, MessageSquare } from "lucide-react"

import { getMemories, getDepartments } from "@/lib/api"
import { Memory, Department } from "@/lib/types"

// MEMORY_TYPES from backend model:
// MEMORY_TYPES = [ ('GRAD', 'Graduation'), ('PARTY', 'Party'), ('STUDY', 'Study Session'), ('SPORT', 'Sports Event'), ('OTHER', 'Other'), ]
const MEMORY_TYPES = [
  { value: "ALL", label: "All Categories" },
  { value: "GRAD", label: "Graduation" },
  { value: "PARTY", label: "Party" },
  { value: "STUDY", label: "Study Session" },
  { value: "SPORT", label: "Sports Event" },
  { value: "OTHER", label: "Other" },
]


export default function MemoryBoardPage() {
  const [memories, setMemories] = useState<Memory[]>([])
  const [departments, setDepartments] = useState<Department[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedMemoryType, setSelectedMemoryType] = useState<string | undefined>(undefined)
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
      } catch (error)_ {
        console.error("Failed to fetch departments:", error)
      }
    }
    fetchDepartments()
  }, [])

  // Fetch memories
  useEffect(() => {
    async function fetchMemoriesData(pageToFetch = 1, append = false) {
      if (!append) {
        setLoading(true);
        setMemories([]); // Clear memories on filter change
        setCurrentPage(1);
      } else {
        setLoadingMore(true);
      }

      try {
        const params: { memory_type?: string; department?: number; search?: string; page?: number } = { page: pageToFetch };
        if (selectedMemoryType && selectedMemoryType !== "ALL") {
          params.memory_type = selectedMemoryType;
        }
        if (selectedDepartment && selectedDepartment !== "all") {
          params.department = parseInt(selectedDepartment, 10);
        }
        if (searchTerm) {
          params.search = searchTerm;
        }
        const data = await getMemories(params);
        if (append) {
          setMemories(prevMemories => [...prevMemories, ...(data.results || [])]);
        } else {
          setMemories(data.results || []);
        }
        setNextPageUrl(data.next || null);
      } catch (error) {
        console.error("Failed to fetch memories:", error);
        if (!append) setMemories([]);
      } finally {
        if (!append) setLoading(false);
        setLoadingMore(false);
      }
    }
    fetchMemoriesData(1, false); // Initial fetch or filter change
  }, [searchTerm, selectedMemoryType, selectedDepartment]);

  const handleLoadMore = async () => {
    if (nextPageUrl && !loadingMore) {
      const nextPageNum = currentPage + 1;
      setCurrentPage(nextPageNum);

      setLoadingMore(true);
      try {
        const params: { memory_type?: string; department?: number; search?: string; page?: number } = { page: nextPageNum };
         if (selectedMemoryType && selectedMemoryType !== "ALL") {
          params.memory_type = selectedMemoryType;
        }
        if (selectedDepartment && selectedDepartment !== "all") {
          params.department = parseInt(selectedDepartment, 10);
        }
        if (searchTerm) {
          params.search = searchTerm;
        }
        const data = await getMemories(params);
        setMemories(prevMemories => [...prevMemories, ...(data.results || [])]);
        setNextPageUrl(data.next || null);
      } catch (error) {
        console.error("Failed to load more memories:", error);
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
          <div className="flex items-center gap-3 mb-4">
            <MessageSquare className="h-8 w-8 text-blue-500" />
            <h1 className="text-4xl font-bold text-gray-900">Memory Board</h1>
          </div>
          <p className="text-xl text-gray-600">Share and explore cherished memories from our ASTU community</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Add Memory Section (UI only, no functionality for now) */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Plus className="h-6 w-6 text-blue-500" />
            <h2 className="text-xl font-bold text-gray-900">Share Your Memory</h2>
          </div>
          {/* Form elements remain for UI, but are not wired up */}
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
                    {MEMORY_TYPES.slice(1).map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
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
          <div className="grid md:grid-cols-3 gap-4"> {/* Changed to 3 columns */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search memories..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => {setSearchTerm(e.target.value); setCurrentPage(1);}}
              />
            </div>
            <Select
              onValueChange={(value) => {setSelectedMemoryType(value === "ALL" ? undefined : value); setCurrentPage(1);}}
              value={selectedMemoryType || "ALL"}
            >
              <SelectTrigger className="w-full md:w-auto">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {MEMORY_TYPES.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              onValueChange={(value) => {setSelectedDepartment(value === "all" ? undefined : value); setCurrentPage(1);}}
              value={selectedDepartment || "all"}
            >
              <SelectTrigger className="w-full md:w-auto">
                 <GraduationCap className="h-4 w-4 mr-2" /> {/* Changed Icon */}
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
            {/* Year filter removed, Department filter added */}
          </div>
        </div>

        {/* Memories Grid */}
        {loading && memories.length === 0 && <div className="text-center text-gray-600 py-8">Loading memories...</div>}
        {!loading && memories.length === 0 && (
          <div className="text-center text-gray-600 py-8">No memories found matching your criteria.</div>
        )}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {memories.map((memory) => (
            <Card
              key={memory.id}
              className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col"
            >
              {memory.photo_url && (
                <div className="relative">
                  <Image
                    src={memory.photo_url || "/placeholder.svg"} // Use photo_url
                    alt={memory.title || "Memory image"}
                    width={400}
                    height={300}
                    className="w-full h-48 object-cover"
                  />
                  {memory.memory_type && (
                    <Badge className="absolute top-4 left-4 bg-white text-gray-900">
                      {MEMORY_TYPES.find(mt => mt.value === memory.memory_type)?.label || memory.memory_type}
                    </Badge>
                  )}
                </div>
              )}

              <CardHeader className="pb-3"> {/* Increased padding bottom slightly */}
                <CardTitle className="text-xl font-bold text-gray-900 leading-tight">{memory.title}</CardTitle> {/* Matched student card title size */}
                {(memory.author_name || memory.author_program || memory.department_name) && (
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-gray-600 pt-1"> {/* Matched student card secondary info size */}
                    {memory.author_name && <span className="flex items-center"><User className="h-4 w-4 mr-1" />{memory.author_name}</span>}
                    {memory.author_program && memory.author_name && <span className="font-semibold">·</span>}
                    {memory.author_program && <span>{memory.author_program} {memory.author_year && `(${memory.author_year})`}</span>}
                    {/* Display department if no author info, or as additional info if desired */}
                    {memory.department_name && (!memory.author_name || !memory.author_program) && <span className="flex items-center"><GraduationCap className="h-4 w-4 mr-1" />{memory.department_name}</span>}
                  </div>
                )}
              </CardHeader>

              <CardContent className="space-y-3 flex-grow flex flex-col justify-between pt-0"> {/* Removed CardHeader's pb and CardContent's pt for tighter coupling */}
                {memory.caption && (
                  <CardDescription className="text-gray-600 italic leading-relaxed line-clamp-4"> {/* Matched student card quote style */}
                    {memory.caption}
                  </CardDescription>
                )}

                {/* Engagement Stats and Action Buttons removed as fields not in type */}
                <div className="pt-3 mt-auto border-t flex items-center justify-end"> {/* Added mt-auto to push to bottom */}
                  {memory.created_at && (
                    <div className="flex items-center gap-1 text-sm text-gray-500"> {/* Matched font size */}
                      <Calendar className="h-4 w-4" /> {/* Matched icon size */}
                      {new Date(memory.created_at).toLocaleDateString()}
                    </div>
                  )}
                </div>
                {/* Like/Comment buttons removed */}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        {nextPageUrl && (
          <div className="text-center mt-12">
            <Button size="lg" variant="outline" className="px-8" onClick={handleLoadMore} disabled={loadingMore}>
              {loadingMore ? "Loading..." : "Load More Memories"}
            </Button>
          </div>
        )}

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
