import React from 'react';
import TodoItem from './TodoItem';
import { Todo } from '../lib/types';
import { ClipboardList, Loader2 } from 'lucide-react';
import { cn } from '../lib/utils';

interface TaskListProps {
  todos: Todo[];
  onToggleComplete: (id: number) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
  onUpdate: (id: number, title: string, description?: string) => Promise<void>;
  loading?: boolean;
  error?: string | null;
}

const TaskList: React.FC<TaskListProps> = ({
  todos,
  onToggleComplete,
  onDelete,
  onUpdate,
  loading = false,
  error = null,
}) => {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-12 space-y-4">
        <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
        <p className="text-gray-500 dark:text-gray-400">Loading todos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="p-3 bg-red-100 dark:bg-red-900/20 rounded-full mb-4">
          <ClipboardList className="h-8 w-8 text-red-600 dark:text-red-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
          Something went wrong
        </h3>
        <p className="text-gray-500 dark:text-gray-400 mt-1">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (todos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <ClipboardList className="h-12 w-12 text-gray-400 dark:text-gray-600 mb-4" />
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
          No tasks yet
        </h3>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Add your first task above to get started
        </p>
      </div>
    );
  }

  const completedTodos = todos.filter(todo => todo.isCompleted);
  const pendingTodos = todos.filter(todo => !todo.isCompleted);

  return (
    <div className="space-y-6">
     
      {pendingTodos.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Pending ({pendingTodos.length})
            </h2>
          </div>
          <div className="space-y-3">
            {pendingTodos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggleComplete={onToggleComplete}
                onDelete={onDelete}
                onUpdate={onUpdate}
              />
            ))}
          </div>
        </div>
      )}

      
      {completedTodos.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Completed ({completedTodos.length})
            </h2>
          </div>
          <div className={cn(
            "space-y-3",
            completedTodos.length > 0 && "opacity-80"
          )}>
            {completedTodos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggleComplete={onToggleComplete}
                onDelete={onDelete}
                onUpdate={onUpdate}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskList;