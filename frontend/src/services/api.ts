import axios from 'axios';
import { 
  AuthResponse, 
  LoginCredentials, 
  RegisterCredentials, 
  Task, 
  CreateTaskData, 
  UpdateTaskData 
} from '../types';

const API_BASE_URL = 'https://task-adder-ij64.vercel.app/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API
export const authAPI = {
  register: async (credentials: RegisterCredentials): Promise<AuthResponse> => {
    const response = await api.post('/auth/register', credentials);
    return response.data;
  },

  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },
};

// Tasks API
export const tasksAPI = {
  getAll: async (): Promise<Task[]> => {
    const response = await api.get('/tasks');
    return response.data;
  },

  getById: async (id: string): Promise<Task> => {
    const response = await api.get(`/tasks/${id}`);
    return response.data;
  },

  create: async (taskData: CreateTaskData): Promise<Task> => {
    const response = await api.post('/tasks', taskData);
    return response.data;
  },

  update: async (id: string, taskData: UpdateTaskData): Promise<Task> => {
    const response = await api.put(`/tasks/${id}`, taskData);
    return response.data;
  },

  delete: async (id: string): Promise<{ message: string }> => {
    const response = await api.delete(`/tasks/${id}`);
    return response.data;
  },
};

export default api; 