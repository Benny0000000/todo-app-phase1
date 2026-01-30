import React, { useState } from 'react';
import * as Checkbox from '@radix-ui/react-checkbox';
import { Pencil, Trash2, Check } from 'lucide-react';
import { Todo } from '../lib/types';
import { cn, formatDate } from '../lib/utils';
import EditDialog from './EditDialog';

interface TodoItemProps {
  todo: Todo;
  onToggleComplete: (id: number) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
  onUpdate: (id: number, title: string, description?: string) => Promise<void>;
}

const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  onToggleComplete,
  onDelete,
  onUpdate,
}) => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isToggling, setIsToggling] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleToggleComplete = async () => {
    if (isToggling) return;
    setIsToggling(true);
    try {
      await onToggleComplete(todo.id);
    } catch (error) {
      console.error('Failed to toggle todo:', error);
    } finally {
      setIsToggling(false);
    }
  };

  const handleDelete = async () => {
    if (isDeleting) return;
    setIsDeleting(true);
    try {
      await onDelete(todo.id);
    } catch (error) {
      console.error('Failed to delete todo:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleUpdate = async (id: number, title: string, description?: string) => {
    try {
      await onUpdate(id, title, description);
    } catch (error) {
      console.error('Failed to update todo:', error);
      throw error;
    }
  };

  return (
    <>
      <div className={cn(
        "flex items-center justify-between p-4 border rounded-lg transition-all",
        "bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800",
        "hover:shadow-sm hover:border-gray-300 dark:hover:border-gray-700",
        todo.isCompleted && "opacity-60",
        isToggling && "opacity-50"
      )}>
        <div className="flex items-center gap-3 flex-1">
          <Checkbox.Root
            checked={todo.isCompleted}
            onCheckedChange={handleToggleComplete}
            disabled={isToggling}
            className={cn(
              "h-5 w-5 rounded border-2 flex items-center justify-center",
              "border-gray-300 dark:border-gray-600",
              "data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600",
              "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
              "disabled:opacity-50 disabled:cursor-not-allowed"
            )}
          >
            <Checkbox.Indicator>
              <Check className="h-3.5 w-3.5 text-white" />
            </Checkbox.Indicator>
          </Checkbox.Root>

          <div className="flex-1">
            <h3 className={cn(
              "font-medium text-gray-900 dark:text-gray-100",
              todo.isCompleted && "line-through text-gray-500 dark:text-gray-400"
            )}>
              {todo.title}
            </h3>
            {todo.description && (
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {todo.description}
              </p>
            )}
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
              {formatDate(todo.createdAt)}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsEditDialogOpen(true)}
            className="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors disabled:opacity-50"
            aria-label="Edit todo"
            disabled={isToggling || isDeleting}
          >
            <Pencil className="h-4 w-4" />
          </button>
          
          <button
            onClick={handleDelete}
            disabled={isDeleting || isToggling}
            className="p-2 rounded-lg text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors disabled:opacity-50"
            aria-label="Delete todo"
          >
            {isDeleting ? (
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-red-600 border-t-transparent" />
            ) : (
              <Trash2 className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      <EditDialog
        isOpen={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        todo={todo}
        onSave={handleUpdate}
      />
    </>
  );
};

export default TodoItem;