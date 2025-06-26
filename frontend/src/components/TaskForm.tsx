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
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="mt-3">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            {task ? 'Edit Task' : 'Create New Task'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div>
              <label htmlFor="taskName" className="block text-sm font-medium text-gray-700">
                Task Name *
              </label>
              <input
                type="text"
                id="taskName"
                name="taskName"
                required
                className={`input-field mt-1 ${errors.taskName ? 'border-red-500' : ''}`}
                placeholder="Enter task name"
                value={formData.taskName}
                onChange={handleChange}
              />
              {errors.taskName && (
                <p className="text-red-500 text-xs mt-1">{errors.taskName}</p>
              )}
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows={3}
                className="input-field mt-1"
                placeholder="Enter task description"
                value={formData.description}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700">
                Due Date *
              </label>
              <input
                type="date"
                id="dueDate"
                name="dueDate"
                required
                className={`input-field mt-1 ${errors.dueDate ? 'border-red-500' : ''}`}
                value={formData.dueDate}
                onChange={handleChange}
              />
              {errors.dueDate && (
                <p className="text-red-500 text-xs mt-1">{errors.dueDate}</p>
              )}
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={onCancel}
                className="btn-secondary"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn-primary"
              >
                {task ? 'Update Task' : 'Create Task'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TaskForm; 