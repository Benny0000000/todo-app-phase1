import axios from 'axios';
import type { Todo, CreateTodoData, UpdateTodoData, ApiResponse } from './types';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export const todoApi = {
  async getAll(): Promise<Todo[]> {
    try {
      const response = await api.get<ApiResponse<Todo[]>>('/todos');
      return response.data.data;
    } catch (error) {
      console.error('Failed to fetch todos:', error);
      throw error;
    }
  },

  async create(todoData: CreateTodoData): Promise<Todo> {
    try {
      const response = await api.post<ApiResponse<Todo>>('/todos', todoData);
      return response.data.data;
    } catch (error) {
      console.error('Failed to create todo:', error);
      throw error;
    }
  },

  async update(id: number, todoData: UpdateTodoData): Promise<Todo> {
    try {
      const response = await api.patch<ApiResponse<Todo>>(`/todos/${id}`, todoData);
      return response.data.data;
    } catch (error) {
      console.error(`Failed to update todo ${id}:`, error);
      throw error;
    }
  },

  async delete(id: number): Promise<void> {
    try {
      await api.delete(`/todos/${id}`);
    } catch (error) {
      console.error(`Failed to delete todo ${id}:`, error);
      throw error;
    }
  },

  async toggleComplete(id: number): Promise<Todo> {
    try {
      const response = await api.patch<ApiResponse<Todo>>(`/todos/${id}/toggle`);
      return response.data.data;
    } catch (error) {
      console.error(`Failed to toggle todo ${id}:`, error);
      throw error;
    }
  },
};