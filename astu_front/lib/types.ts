// TypeScript interfaces for Django REST API data structures

export interface University {
  id: number
  name: string
  established: number
  location: string
  motto: string
  description: string
  vision: string
  mission: string
  image: string
}

export interface UniversityStats {
  students: number
  faculty: number
  departments: number
  alumni: number
  programs: number
  research_projects: number
}

export interface Achievement {
  id: number
  title: string
  year: number
  description: string
  category: string
}

export interface Department {
  id: number
  name: string
  code: string
  description: string
  head: string
  faculty_count: number
  student_count: number
  programs: string[]
  achievements: string[]
  image: string
  established: number
}

export interface Student {
  id: number
  name: string
  program: string
  year: string
  gpa: number
  achievements: string[]
  hometown: string
  image: string
  bio: string
  graduation_year: number
  email?: string
  linkedin?: string
}

export interface Alumni {
  id: number
  name: string
  graduation_year: number
  program: string
  current_position: string
  company: string
  location: string
  achievements: string[]
  image: string
  bio: string
  linkedin?: string
  industry: string
  email?: string
}

export interface AlumniStats {
  total_alumni: number
  countries: number
  companies_founded: number
  patents_filed: number
}

export interface FacultyTribute {
  id: number
  name: string
  title: string
  department: string
  years_of_service: number
  specialization: string
  image: string
  tribute: string
  achievements: string[]
  courses_taught: string[]
  student_testimonial: string
  submitted_by: string
  submission_date: string
}

export interface Memory {
  id: number
  title: string
  content: string
  author: string
  author_program: string
  author_year: string
  date_posted: string
  category: string
  image?: string
  likes: number
  comments: number
  tags: string[]
}

export interface MemoryComment {
  id: number
  memory: number
  content: string
  author: string
  date_posted: string
}

export interface HeroData {
  title: string
  subtitle: string
  description: string
  background_image: string
  cta_primary: string
  cta_secondary: string
}

export interface NavigationItem {
  id: number
  title: string
  href: string
  order: number
  is_active: boolean
}

// API Response types
export interface PaginatedResponse<T> {
  count: number
  next: string | null
  previous: string | null
  results: T[]
}

export interface APIError {
  detail: string
  code?: string
}

// Form types
export interface ContactFormData {
  name: string
  email: string
  message: string
}

export interface MemoryFormData {
  title: string
  content: string
  category: string
  author: string
  author_program: string
  author_year: string
  image?: File
}

export interface TributeFormData {
  faculty_name: string
  department: string
  tribute_text: string
  submitted_by: string
}

// Filter types
export interface StudentFilters {
  program?: string
  year?: string
  search?: string
  page?: number
}

export interface AlumniFilters {
  industry?: string
  graduation_year?: string
  location?: string
  search?: string
  page?: number
}

export interface MemoryFilters {
  category?: string
  year?: string
  search?: string
  page?: number
}
