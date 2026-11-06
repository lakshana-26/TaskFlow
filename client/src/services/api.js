import axios from 'axios';

// Use environment variable if provided, or default to backend port 5000 /api
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 60000 // 60s timeout to handle free-tier cloud host cold starts (e.g. Render)
});

export const getTasks = async () => {
  const response = await apiClient.get('/tasks');
  return response.data;
};

export const createTask = async (title, status = 'Pending') => {
  const response = await apiClient.post('/tasks', { title, status });
  return response.data;
};

export const updateTaskStatus = async (id, status) => {
  const response = await apiClient.patch(`/tasks/${id}`, { status });
  return response.data;
};

export const deleteTask = async (id) => {
  const response = await apiClient.delete(`/tasks/${id}`);
  return response.data;
};

export default apiClient;
