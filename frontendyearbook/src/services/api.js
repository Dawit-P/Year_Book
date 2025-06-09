// src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api/',
  timeout: 10000,
});

export default {
  getDepartments: () => api.get('departments/'),
  getStudents: (params) => api.get('students/', { params }),
  getFeaturedStudents: () => api.get('students/?is_featured=true'),
  getMemories: () => api.get('memories/'),
  getAlumni: () => api.get('alumni/'),
  getPresidentMessage: () => api.get('president/'),
};