import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { tasksAPI } from "../services/api";
import { Task, CreateTaskData } from "../types";
import toast from "react-hot-toast";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, ListTodo } from "lucide-react";

function stringToInitials(email: string | undefined) {
  if (!email) return "";
  return email[0].toUpperCase();
}

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const location = useLocation();

  useEffect(() => {
    fetchTasks();
    // eslint-disable-next-line
  }, []);

  const fetchTasks = async () => {
    try {
      const fetchedTasks = await tasksAPI.getAll();
      setTasks(fetchedTasks);
    } catch (error: any) {
      toast.error("Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async (taskData: CreateTaskData) => {
    try {
      const newTask = await tasksAPI.create(taskData);
      setTasks([newTask, ...tasks]);
      setShowTaskForm(false);
      toast.success("Task created successfully!");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to create task");
    }
  };

  const handleUpdateTask = async (id: string, taskData: CreateTaskData) => {
    try {
      const updatedTask = await tasksAPI.update(id, taskData);
      setTasks(tasks.map((task) => (task._id === id ? updatedTask : task)));
      setEditingTask(null);
      toast.success("Task updated successfully!");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to update task");
    }
  };

  const handleDeleteTask = async (id: string) => {
    try {
      await tasksAPI.delete(id);
      setTasks(tasks.filter((task) => task._id !== id));
      toast.success("Task deleted successfully!");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to delete task");
    }
  };

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully!");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <aside className="w-56 bg-white border-r h-screen flex flex-col p-6">
        <span className="text-2xl font-bold text-gray-900 tracking-tight mb-8">
          Task Manager
        </span>
        <nav className="flex flex-col gap-2">
          <Link
            to="/dashboard"
            className={`flex items-center gap-2 py-2 px-3 rounded transition-colors font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50 ${
              location.pathname === "/dashboard"
                ? "bg-primary-100 text-primary-700"
                : ""
            }`}
          >
            <LayoutDashboard size={18} /> Dashboard
          </Link>
        </nav>
      </aside>

      <div className="flex-1 flex flex-col min-h-screen">
        <header className="w-full flex justify-end items-center px-8 py-4 bg-transparent">
          <div className="flex items-center bg-white rounded-xl shadow px-4 py-2 gap-3 min-w-[220px]">
            <div className="w-9 h-9 rounded-full bg-primary-600 flex items-center justify-center text-white text-lg font-bold">
              {stringToInitials(user?.email)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="truncate text-sm font-medium text-gray-900">
                {user?.email}
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="btn-secondary text-xs px-3 py-1"
            >
              Logout
            </button>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 flex flex-col items-center px-4 py-8">
          <div className="w-full max-w-xl">
            <h2 className="text-2xl font-bold mb-2">My Tasks</h2>
            <div className="border-b mb-6" />
          </div>
          {/* Add Task Button */}
          <div className="w-full max-w-xl flex justify-end mb-4">
            <button
              onClick={() => setShowTaskForm(true)}
              className="btn-primary"
            >
              Add New Task
            </button>
          </div>

          {/* Task List */}
          <div className="w-full max-w-xl">
            <TaskList
              tasks={tasks}
              onEdit={setEditingTask}
              onDelete={handleDeleteTask}
            />
          </div>
        </main>
      </div>

      {/* Task Form Modal */}
      {showTaskForm && (
        <TaskForm
          onSubmit={handleCreateTask}
          onCancel={() => setShowTaskForm(false)}
        />
      )}

      {editingTask && (
        <TaskForm
          task={editingTask}
          onSubmit={(taskData) => handleUpdateTask(editingTask._id, taskData)}
          onCancel={() => setEditingTask(null)}
        />
      )}
    </div>
  );
};

export default Dashboard;
