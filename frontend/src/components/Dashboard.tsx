import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { tasksAPI } from "../services/api";
import { Task, CreateTaskData } from "../types";
import toast from "react-hot-toast";
import TaskForm from "./TaskForm";
import ActionMenu from "./ActionMenu";

const PAGE_SIZE = 5;

const Dashboard: React.FC = () => {
  const { logout } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [page, setPage] = useState(1);

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

  // Pagination logic
  const totalPages = Math.ceil(tasks.length / PAGE_SIZE);
  const paginatedTasks = tasks.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-white">
      <div className="w-full max-w-5xl mx-auto mt-12">
        <div className="flex flex-row md:flex-row flex-col md:items-center md:justify-between mb-4 px-2 gap-4 md:gap-0">
          <h2 className="text-3xl font-semibold text-[#2346A9]">Tasks Management</h2>
          <div className="flex gap-3 w-full md:w-auto">
            <button
              onClick={() => setShowTaskForm(true)}
              className="bg-[#2346A9] hover:bg-[#1a2d7c] text-white font-semibold px-8 py-2 rounded-full transition-colors text-lg ml-auto mt-2 md:mt-0"
            >
              + Add Task
            </button>
            <button
              onClick={logout}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium px-6 py-2 rounded-full border border-gray-200 text-base ml-0"
            >
              Logout
            </button>
          </div>
        </div>
        <div className="w-full bg-white">
          {/* Header row: hide on mobile, show on md+ */}
          <div className="grid grid-cols-12 px-6 py-3 ml-3 mr-2 text-[#2346A9] text-lg font-semibold rounded-t-xl hidden md:grid">
            <div className="col-span-1">No</div>
            <div className="col-span-2">Date & Time</div>
            <div className="col-span-2">Task</div>
            <div className="col-span-6">Description</div>
            <div className="col-span-1 text-right">Action</div>
          </div>
          <div className="flex flex-col gap-2 mt-2">
            {loading ? (
              <div className="text-center py-8 text-gray-500 col-span-12">Loading...</div>
            ) : paginatedTasks.length === 0 ? (
              <div className="text-center py-8 text-gray-500 col-span-12">No tasks found.</div>
            ) : (
              paginatedTasks.map((task, idx) => (
                <div
                  key={task._id}
                  className="grid grid-cols-12 md:grid-cols-12 items-center bg-white px-6 ml-3 mr-2 py-4 border border-[#E5EAF2] shadow-none md:shadow-lg"
                  style={{
                    boxShadow: "0 4px 12px rgba(22, 57, 153, 0.1)",
                    borderLeft: "6px solid rgba(19, 31, 63, 0.1)",
                  }}
                >
                  {/* Desktop layout */}
                  <>
                    <div className="col-span-1 hidden md:block text-base font-medium">{(page - 1) * PAGE_SIZE + idx + 1}</div>
                    <div className="col-span-2 hidden md:block text-base font-semibold">{new Date(task.dueDate).toLocaleDateString()} {new Date(task.dueDate).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}</div>
                    <div className="col-span-2 hidden md:block text-base font-semibold">{task.taskName}</div>
                    <div className="col-span-6 hidden md:block text-base font-semibold">{task.description}</div>
                    <div className="col-span-1 hidden md:flex justify-end text-right">
                      <ActionMenu
                        onEdit={() => setEditingTask(task)}
                        onDelete={() => {
                          if (window.confirm('Are you sure you want to delete this task?')) handleDeleteTask(task._id);
                        }}
                      />
                    </div>
                  </>
                  {/* Mobile layout */}
                  <div className="block md:hidden col-span-12 w-full">
                    <div className="flex justify-between items-start w-full" >
                      <div>
                        <div className="font-semibold text-base mb-1 font-semibold">{task.taskName}</div>
                        <div className="text-sm text-gray-700 mb-1 break-words font-semibold">{task.description}</div>
                        <div className="text-xs text-gray-500 font-semibold">{new Date(task.dueDate).toLocaleDateString()} {new Date(task.dueDate).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}</div>
                      </div>
                      <div className="ml-2">
                        <ActionMenu
                          onEdit={() => setEditingTask(task)}
                          onDelete={() => {
                            if (window.confirm('Are you sure you want to delete this task?')) handleDeleteTask(task._id);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center mt-8 w-full">
            {/* Mobile: Only arrows */}
            <div className="flex md:hidden gap-6">
              <button
                className="w-12 h-12 flex items-center justify-center text-xl text-[#2346A9] bg-white rounded-xl shadow"
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
                aria-label="Previous page"
              >
                &lt;
              </button>
              <button
                className="w-12 h-12 flex items-center justify-center text-xl text-[#2346A9] bg-white rounded-xl shadow"
                onClick={() => setPage(page + 1)}
                disabled={page === totalPages}
                aria-label="Next page"
              >
                &gt;
              </button>
            </div>
            {/* Desktop: Full pagination */}
            <div className="hidden md:flex items-center bg-white rounded-full shadow-sm px-2 py-1 mx-auto" style={{ boxShadow: '0 2px 8px 0 rgba(60,72,88,0.08)' }}>
              <button
                className="w-8 h-8 flex items-center justify-center text-lg text-[#2346A9] bg-transparent hover:bg-blue-50 transition disabled:opacity-40 rounded-full"
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
                aria-label="Previous page"
              >
                &lt;
              </button>
              <div className="flex items-center space-x-2 px-2">
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i}
                    className={`text-lg font-semibold rounded-full px-2 py-1 ${page === i + 1 ? 'text-[#2346A9] font-bold' : 'text-gray-400'}`}
                    onClick={() => setPage(i + 1)}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
              <button
                className="w-8 h-8 flex items-center justify-center text-lg text-[#2346A9] bg-transparent hover:bg-blue-50 transition disabled:opacity-40 rounded-full"
                onClick={() => setPage(page + 1)}
                disabled={page === totalPages}
                aria-label="Next page"
              >
                &gt;
              </button>
            </div>
          </div>
        )}
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
