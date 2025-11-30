import React from 'react';
import { LucideIcon } from 'lucide-react';
import { TodoItem } from '../types';

interface TodoListProps {
  todos: TodoItem[];
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, onToggleComplete, onDelete }) => {
  return (
    <ul className="space-y-4">
      {todos.map((todo) => (
        <li key={todo.id} className="flex items-center justify-between p-4 bg-white shadow rounded-lg">
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => onToggleComplete(todo.id)}
              className="mr-3"
              aria-label={`Mark ${todo.title} as ${todo.completed ? 'incomplete' : 'complete'}`}
            />
            <span className={`flex-1 ${todo.completed ? 'line-through text-gray-500' : ''}`}>
              {todo.title}
            </span>
          </div>
          <button
            onClick={() => onDelete(todo.id)}
            className="text-red-500 hover:text-red-700"
            aria-label={`Delete ${todo.title}`}
          >
            <LucideIcon name="trash" size={20} />
          </button>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;