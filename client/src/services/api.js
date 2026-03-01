import axios from 'axios';

// FIX: Changed port from 5000 to 3000 to match your backend index.js
const API_URL = 'https://ai-powered-job-portal-ed0i.onrender.com';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Optional: Logic to clear token if it's expired
      // localStorage.removeItem('token');
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  // FIX: Updated register to handle the specific body requirements of your backend
  register: (data) => {
    if (data.role === 'jobseeker') {
      return api.post('/auth/api/signup-jobseeker', {
        name: data.name,
        email: data.email,
        password: data.password,
        phone: data.phone, // Passing phone is now required
      });
    } else {
      return api.post('/auth/api/signup-company', {
        companyName: data.name, // Mapping frontend 'name' to backend 'companyName'
        email: data.email,
        password: data.password,
        phone: data.phone,
      });
    }
  },
  login: (data) => api.post('/auth/api/login', data),
  getMe: () => api.get('/auth/api/auth-check'),
};

// Job APIs - Server uses /job/api
export const jobAPI = {
  getAllJobs: (params) => api.get('/job/api', { params }),
  getJob: (id) => api.get(`/job/api/${id}`),
  createJob: (data) => api.post('/job/api', data),
  updateJob: (id, data) => api.put(`/job/api/${id}`, data),
  deleteJob: (id) => api.delete(`/job/api/${id}`),
  getMyJobs: () => api.get('/job/api/my-jobs'),
};

// Application APIs - Server uses /application/api
export const applicationAPI = {
  applyToJob: (jobId, data) => api.post(`/application/api/apply/${jobId}`, data),
  getMyApplications: () => api.get('/application/api/my-applications'),
  getRecruiterApplications: (params) => api.get('/application/api/job/:jobId/applicants', { params }),
  updateApplicationStatus: (id, status) => api.put(`/application/api/${id}/status`, { status }),
};

export default api;
