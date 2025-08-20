import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API
export const authAPI = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  getProfile: () => api.get('/auth/profile'),
  updateProfile: (profileData) => api.put('/auth/profile', profileData),
};

// Gigs API
export const gigsAPI = {
  getGigs: (params) => api.get('/gigs', { params }),
  getGigById: (id) => api.get(`/gigs/${id}`),
  getMyGigs: () => api.get('/gigs/my-gigs'),
  createGig: (gigData) => api.post('/gigs', gigData),
  updateGig: (id, gigData) => api.put(`/gigs/${id}`, gigData),
  deleteGig: (id) => api.delete(`/gigs/${id}`),
};

// Applications API
export const applicationsAPI = {
  applyToGig: (applicationData) => api.post('/applications/apply', applicationData),
  getMyApplications: () => api.get('/applications/my-applications'),
  getGigApplications: (gigId) => api.get(`/applications/gig/${gigId}`),
  updateApplicationStatus: (id, statusData) => api.put(`/applications/${id}/status`, statusData),
};

export default api;