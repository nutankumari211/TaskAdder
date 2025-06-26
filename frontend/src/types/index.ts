export interface User {
  id: string;
  email: string;
  createdAt: string;
}

export interface Task {
  _id: string;
  taskName: string;
  description?: string;
  dueDate: string;
  createdAt: string;
  user: string;
}

export interface AuthResponse {
  message: string;
  token: string;
  user: User;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials extends LoginCredentials {}

export interface CreateTaskData {
  taskName: string;
  description?: string;
  dueDate: string;
}

export interface UpdateTaskData extends CreateTaskData {} 