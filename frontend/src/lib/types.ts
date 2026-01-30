export interface Todo {
  id: number;
  title: string;
  description: string | null;
  isCompleted: boolean;
  createdAt: string;
}

export interface CreateTodoData {
  title: string;
  description?: string;
}

export interface UpdateTodoData {
  title?: string;
  description?: string;
  isCompleted?: boolean;
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
  count?: number;
}