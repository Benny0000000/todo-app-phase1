
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CheckCircle, XCircle, Sun, Moon } from "lucide-react";
import TodoForm from "./components/TodoForm";
import TaskList from "./components/TaskList";
import { useTodos } from "./hooks/useTodos";

function App() {
  const {
    todos,
    loading,
    error,
    createTodo,
    updateTodo,
    deleteTodo,
    toggleComplete,
  } = useTodos();

  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      return (
        localStorage.getItem("theme") === "dark" ||
        (!("theme" in localStorage) &&
          window.matchMedia("(prefers-color-scheme: dark)").matches)
      );
    }
    return false;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  const handleAddTodo = async (title: string, description?: string) => {
    const result = await createTodo({ title, description });

    if (result.success) {
      toast.success("Task added successfully!", {
        icon: <CheckCircle className="h-5 w-5 text-green-500" />,
      });
    } else {
      toast.error(result.error || "Failed to add task", {
        icon: <XCircle className="h-5 w-5 text-red-500" />,
      });
    }

    return result;
  };

  const handleUpdateTodo = async (
    id: number,
    title: string,
    description?: string,
  ) => {
    const result = await updateTodo(id, { title, description });

    if (result.success) {
      toast.success("Task updated successfully!", {
        icon: <CheckCircle className="h-5 w-5 text-green-500" />,
      });
    } else {
      toast.error(result.error || "Failed to update task", {
        icon: <XCircle className="h-5 w-5 text-red-500" />,
      });
      throw new Error(result.error);
    }
  };

  const handleDeleteTodo = async (id: number) => {
    const result = await deleteTodo(id);

    if (result.success) {
      toast.success("Task deleted successfully!", {
        icon: <CheckCircle className="h-5 w-5 text-green-500" />,
      });
    } else {
      toast.error(result.error || "Failed to delete task", {
        icon: <XCircle className="h-5 w-5 text-red-500" />,
      });
    }
  };

  const handleToggleComplete = async (id: number) => {
    const result = await toggleComplete(id);

    if (!result.success) {
      toast.error(result.error || "Failed to toggle task", {
        icon: <XCircle className="h-5 w-5 text-red-500" />,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors">
      <div className="max-w-4xl mx-auto px-4 py-8">
        
        <header className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              Todo App
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              A modern todo app with persistence
            </p>
          </div>

          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2 rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300 transition-colors"
            aria-label={
              isDarkMode ? "Switch to light mode" : "Switch to dark mode"
            }
          >
            {isDarkMode ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </button>
        </header>

       
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4">
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {todos.length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Total Tasks
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {todos.filter((t) => !t.isCompleted).length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Pending
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              {todos.filter((t) => t.isCompleted).length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Completed
            </div>
          </div>
        </div>

       
        <div className="mb-8">
          <TodoForm onSubmit={handleAddTodo} isLoading={loading} />
        </div>

       
        <TaskList
          todos={todos}
          onToggleComplete={handleToggleComplete}
          onDelete={handleDeleteTodo}
          onUpdate={handleUpdateTodo}
          loading={loading}
          error={error}
        />
      </div>

      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={isDarkMode ? "dark" : "light"}
      />
    </div>
  );
}

export default App;