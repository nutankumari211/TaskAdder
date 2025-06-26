import React from 'react';
import { Task } from '../types';
import ActionMenu from './ActionMenu';

interface TaskListProps {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onEdit, onDelete }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const getStatusColor = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return 'text-red-600';
    if (diffDays <= 3) return 'text-yellow-600';
    return 'text-green-600';
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      onDelete(id);
    }
  };

  if (tasks.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-900 mb-2">No tasks yet</h3>
        <p className="text-gray-600">Create your first task to get started!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <div key={task._id} className="card transition-shadow hover:shadow-lg">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {task.taskName}
              </h3>
              {task.description && (
                <p className="text-gray-600 mb-3">{task.description}</p>
              )}
              <div className="flex items-center space-x-4 text-sm">
                <span className={`font-medium ${getStatusColor(task.dueDate)}`}>
                  Due: {formatDate(task.dueDate)}
                </span>
                <span className="text-gray-500">
                  Created: {formatDate(task.createdAt)}
                </span>
              </div>
            </div>
            <div className="flex space-x-2 ml-4">
              <ActionMenu
                onEdit={() => onEdit(task)}
                onDelete={() => handleDelete(task._id)}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList; 