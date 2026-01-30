import React, { useState } from "react";
import { Plus } from "lucide-react";

interface TodoFormProps {
  onSubmit: (
    title: string,
    description?: string,
  ) => Promise<{ success: boolean }>;
  isLoading?: boolean;
}

const TodoForm: React.FC<TodoFormProps> = ({ onSubmit, isLoading = false }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!title.trim()) {
      setError("Title is required");
      return;
    }

    if (title.length > 255) {
      setError("Title must be less than 255 characters");
      return;
    }

    const result = await onSubmit(
      title.trim(),
      description.trim() || undefined,
    );

    if (result.success) {
      setTitle("");
      setDescription("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && e.ctrlKey) {
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 shadow-sm">
        <div className="space-y-3">
          <div>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="What needs to be done?"
              className="w-full px-3 py-2 text-lg font-medium bg-gray-950 border-0 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-0"
              disabled={isLoading}
              autoFocus
            />
            {error && (
              <p className="text-sm text-red-600 dark:text-red-400 mt-1">
                {error}
              </p>
            )}
          </div>

          <div>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Add a description (optional)"
              className="w-full px-3 py-3 bg-gray-950 border-0 text-gray-400 dark:text-gray-300 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-0 resize-none"
              rows={2}
              disabled={isLoading}
            />
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-gray-800">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Press Ctrl+Enter to add
            </div>
            <button
              type="submit"
              disabled={isLoading || !title.trim()}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors
                ${
                  title.trim() && !isLoading
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed"
                }
              `}
            >
              {isLoading ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Adding...
                </>
              ) : (
                <>
                  <Plus className="h-4 w-4" />
                  Add Task
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default TodoForm;
