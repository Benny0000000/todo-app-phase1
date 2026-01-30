import { useState, useEffect, useCallback } from 'react';
import { Todo, CreateTodoData, UpdateTodoData } from '../lib/types';
import { todoApi } from '../lib/api';

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTodos = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await todoApi.getAll();
      setTodos(data);
    } catch (err) {
      setError('Failed to load todos. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const createTodo = async (todoData: CreateTodoData) => {
    try {
      const newTodo = await todoApi.create(todoData);
      setTodos(prev => [newTodo, ...prev]);
      return { success: true, data: newTodo };
    } catch (err) {
      console.error('Failed to create todo:', err);
      return { success: false, error: 'Failed to create todo' };
    }
  };

  const updateTodo = async (id: number, todoData: UpdateTodoData) => {
    try {
      const updatedTodo = await todoApi.update(id, todoData);
      setTodos(prev => prev.map(todo => 
        todo.id === id ? updatedTodo : todo
      ));
      return { success: true, data: updatedTodo };
    } catch (err) {
      console.error('Failed to update todo:', err);
      return { success: false, error: 'Failed to update todo' };
    }
  };

  const deleteTodo = async (id: number) => {
    try {
      await todoApi.delete(id);
      setTodos(prev => prev.filter(todo => todo.id !== id));
      return { success: true };
    } catch (err) {
      console.error('Failed to delete todo:', err);
      return { success: false, error: 'Failed to delete todo' };
    }
  };

  const toggleComplete = async (id: number) => {
    try {
      const updatedTodo = await todoApi.toggleComplete(id);
      setTodos(prev => prev.map(todo => 
        todo.id === id ? updatedTodo : todo
      ));
      return { success: true, data: updatedTodo };
    } catch (err) {
      console.error('Failed to toggle todo:', err);
      return { success: false, error: 'Failed to toggle todo' };
    }
  };

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  return {
    todos,
    loading,
    error,
    fetchTodos,
    createTodo,
    updateTodo,
    deleteTodo,
    toggleComplete,
  };
}