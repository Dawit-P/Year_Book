import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api'; // Assuming backend runs on port 8000

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Function to handle image URLs, ensuring they are absolute
const processData = (data) => {
  if (Array.isArray(data)) {
    return data.map(item => processItem(item));
  }
  return processItem(data);
};

const processItem = (item) => {
  const newItem = { ...item };
  for (const key in newItem) {
    if (key.endsWith('_url') && newItem[key] && !newItem[key].startsWith('http')) {
      newItem[key] = `http://localhost:8000${newItem[key]}`;
    }
    // Recursively process nested objects (e.g., department within student)
    if (typeof newItem[key] === 'object' && newItem[key] !== null) {
      newItem[key] = processData(newItem[key]);
    }
  }
  return newItem;
};

// Interceptor to process responses
apiClient.interceptors.response.use(response => {
  if (response.data && response.data.results) {
    // Handle paginated results
    response.data.results = processData(response.data.results);
  } else if (response.data) {
    response.data = processData(response.data);
  }
  return response;
}, error => {
  // Handle errors
  return Promise.reject(error);
});

// API functions
export const getDepartments = (params) => apiClient.get('/departments/', { params });
export const getDepartmentById = (id) => apiClient.get(`/departments/${id}/`);

export const getStudents = (params) => apiClient.get('/students/', { params });
export const getStudentById = (id) => apiClient.get(`/students/${id}/`);

export const getFacultyTributes = (params) => apiClient.get('/faculty/', { params });
export const getPresidentMessage = () => apiClient.get('/president/'); // Assuming only one, or latest

export const getMemories = (params) => apiClient.get('/memories/', { params });
export const getMemoryById = (id) => apiClient.get(`/memories/${id}/`);

export const getAlumniHighlights = (params) => apiClient.get('/alumni/', { params });
export const getAlumniById = (id) => apiClient.get(`/alumni/${id}/`);

export const getAboutASTU = () => apiClient.get('/about/'); // Assuming single entry

export default apiClient;
