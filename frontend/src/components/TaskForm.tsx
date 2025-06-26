import React, { useState, useEffect } from 'react';
import { CreateTaskData, Task } from '../types';

interface TaskFormProps {
  task?: Task;
  onSubmit: (taskData: CreateTaskData) => void;
  onCancel: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ task, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<CreateTaskData>({
    taskName: '',
    description: '',
    dueDate: '',
  });
  const [errors, setErrors] = useState<{ taskName?: string; dueDate?: string }>({});

  useEffect(() => {
    if (task) {
      setFormData({
        taskName: task.taskName,
        description: task.description || '',
        dueDate: new Date(task.dueDate).toISOString().split('T')[0],
      });
    }
  }, [task]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setErrors({ ...errors, [e.target.name]: undefined });
  };

  const validate = () => {
    const newErrors: { taskName?: string; dueDate?: string } = {};
    if (!formData.taskName.trim()) {
      newErrors.taskName = 'Task name is required.';
    }
    if (!formData.dueDate) {
      newErrors.dueDate = 'Due date is required.';
    } else {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const due = new Date(formData.dueDate);
      if (due < today) {
        newErrors.dueDate = 'Due date cannot be in the past.';
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-40 flex items-center justify-center z-50">
      <div className="w-full max-w-lg bg-white rounded-2xl p-10 md:p-14 flex flex-col items-center">
        <h3 className="text-2xl md:text-3xl font-bold text-black mb-8 text-center">
          {task ? 'Edit Task' : 'Add Task'}
        </h3>
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6" noValidate>
          <input
            type="text"
            id="taskName"
            name="taskName"
            required
            className={`w-full bg-gray-100 rounded-lg px-4 py-3 text-base placeholder-gray-500 focus:outline-none ${errors.taskName ? 'border border-red-500' : ''}`}
            placeholder="Enter Task Name"
            value={formData.taskName}
            onChange={handleChange}
          />
          <textarea
            id="description"
            name="description"
            rows={2}
            className="w-full bg-gray-100 rounded-lg px-4 py-3 text-base placeholder-gray-500 focus:outline-none resize-none"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
          />
          <input
            type="date"
            id="dueDate"
            name="dueDate"
            required
            className={`w-full bg-gray-100 rounded-lg px-4 py-3 text-base placeholder-gray-500 focus:outline-none ${errors.dueDate ? 'border border-red-500' : ''}`}
            placeholder="Date Picker"
            value={formData.dueDate}
            onChange={handleChange}
          />
          <button
            type="submit"
            className="w-32 mx-auto mt-2 bg-[#233BA9] hover:bg-[#1a2d7c] text-white font-semibold rounded-full py-2 text-lg transition-colors"
          >
            {task ? 'Save' : 'Save'}
          </button>
        </form>
        <button
          type="button"
          onClick={onCancel}
          className="mt-6 text-base text-black hover:underline focus:outline-none"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default TaskForm; 