import React from 'react';
import { CheckCircle, Circle, Trash2 } from 'lucide-react';

interface TodoItemProps {
  id: string;
  title: string;
  completed: boolean;
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ id, title, completed, onToggleComplete, onDelete }) => {
  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md hover:bg-gray-50 transition duration-200">
      <button
        onClick={() => onToggleComplete(id)}
        aria-label={completed ? 'Mark as incomplete' : 'Mark as complete'}
        className="flex items-center focus:outline-none"
      >
        {completed ? (
          <CheckCircle className="text-green-500" aria-hidden="true" />
        ) : (
          <Circle className="text-gray-400" aria-hidden="true" />
        )}
        <span className={`ml-3 text-lg ${completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
          {title}
        </span>
      </button>
      <button
        onClick={() => onDelete(id)}
        aria-label="Delete task"
        className="text-red-500 hover:text-red-700 focus:outline-none"
      >
        <Trash2 aria-hidden="true" />
      </button>
    </div>
  );
};

export default TodoItem;