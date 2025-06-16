// API functions to connect with Django REST API
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8085/yearbook/api"

// Generic API function
async function apiRequest(endpoint: string, options: RequestInit = {}) {
  const url = `${API_BASE_URL}${endpoint}`

  const config: RequestInit = {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  }

  try {
    const response = await fetch(url, config)

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error("API Request failed:", error)
    throw error
  }
}

// University/About API calls
export async function getUniversityInfo() {
  return apiRequest("/university/info/")
}

export async function getUniversityStats() {
  return apiRequest("/university/stats/")
}

export async function getUniversityAchievements() {
  return apiRequest("/university/achievements/")
}

// Departments API calls
export async function getDepartments() {
  return apiRequest("/departments/")
}

export async function getDepartmentById(id: number) {
  return apiRequest(`/departments/${id}/`)
}

export async function getDepartmentStats() {
  return apiRequest("/departments/stats/")
}

// Students API calls

export async function getStudents() {
  return apiRequest("/students")
}

export async function getFeaturedStudents() {
  return apiRequest("/students")
}

export async function getStudentById(id: number) {
  return apiRequest(`/students/${id}/`)
}

// Alumni API calls
export async function getAlumni(params?: {
  industry?: string
  graduation_year?: string
  location?: string
  search?: string
  page?: number
}) {
  const searchParams = new URLSearchParams()

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value) searchParams.append(key, value.toString())
    })
  }

  const queryString = searchParams.toString()
  return apiRequest(`/alumni/${queryString ? `?${queryString}` : ""}`)
}

export async function getFeaturedAlumni() {
  return apiRequest("/alumni/featured/")
}

export async function getAlumniStats() {
  return apiRequest("/alumni/stats/")
}

// Faculty Tributes API calls
export async function getFacultyTributes() {
  return apiRequest("/faculty-tributes/")
}

export async function getFeaturedTributes() {
  return apiRequest("/faculty-tributes/featured/")
}

export async function submitFacultyTribute(tribute: {
  faculty_name: string
  department: string
  tribute_text: string
  submitted_by: string
}) {
  return apiRequest("/faculty-tributes/", {
    method: "POST",
    body: JSON.stringify(tribute),
  })
}

// Memory Board API calls
export async function getMemories(params?: {
  category?: string
  year?: string
  search?: string
  page?: number
}) {
  const searchParams = new URLSearchParams()

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value) searchParams.append(key, value.toString())
    })
  }

  const queryString = searchParams.toString()
  return apiRequest(`/memories/${queryString ? `?${queryString}` : ""}`)
}

export async function submitMemory(memory: {
  title: string
  content: string
  category: string
  author: string
  author_program: string
  author_year: string
  image?: File
}) {
  const formData = new FormData()

  Object.entries(memory).forEach(([key, value]) => {
    if (value) {
      formData.append(key, value)
    }
  })

  return apiRequest("/memories/", {
    method: "POST",
    headers: {}, // Remove Content-Type to let browser set it for FormData
    body: formData,
  })
}

export async function likeMemory(memoryId: number) {
  return apiRequest(`/memories/${memoryId}/like/`, {
    method: "POST",
  })
}

export async function addMemoryComment(
  memoryId: number,
  comment: {
    content: string
    author: string
  },
) {
  return apiRequest(`/memories/${memoryId}/comments/`, {
    method: "POST",
    body: JSON.stringify(comment),
  })
}

// General API calls
export async function getHeroData() {
  return apiRequest("/hero/")
}

export async function getNavigationData() {
  return apiRequest("/navigation/")
}

export async function contactForm(data: {
  name: string
  email: string
  message: string
}) {
  return apiRequest("/contact/", {
    method: "POST",
    body: JSON.stringify(data),
  })
}
