'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { PlusCircle } from 'lucide-react';
import { getTodos, deleteTodo } from '@/lib/api'; // hypothetical API functions
import { Todo } from '@/types'; // hypothetical type definition
import LoadingSpinner from '@/components/LoadingSpinner'; // hypothetical loading spinner component
import ErrorBoundary from '@/components/ErrorBoundary'; // hypothetical error boundary component

const DashboardPage: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const data = await getTodos();
        setTodos(data);
      } catch (err) {
        setError('Failed to load todos');
      } finally {
        setLoading(false);
      }
    };
    fetchTodos();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await deleteTodo(id);
      setTodos(todos.filter(todo => todo.id !== id));
    } catch {
      setError('Failed to delete todo');
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <ErrorBoundary>
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">My Todos</h1>
          <button
            className="flex items-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={() => router.push('/dashboard/create')}
          >
            <PlusCircle className="mr-2" />
            Add Todo
          </button>
        </div>
        <ul className="space-y-4">
          {todos.map(todo => (
            <li key={todo.id} className="flex justify-between items-center p-4 bg-gray-100 rounded shadow">
              <span>{todo.title}</span>
              <button
                className="text-red-500 hover:text-red-700"
                onClick={() => handleDelete(todo.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </ErrorBoundary>
  );
};

export default DashboardPage;