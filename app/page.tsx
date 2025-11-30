'use client';

import React, { useState, useEffect } from 'react';
import { LucideIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

type Task = {
  id: string;
  title: string;
  completed: boolean;
};

const Page: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/tasks');
        if (!response.ok) throw new Error('Failed to fetch tasks');
        const data = await response.json();
        setTasks(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
  if (error) return <div className="flex justify-center items-center h-screen">Error: {error}</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <header className="text-center py-8">
        <h1 className="text-4xl font-bold text-gray-800">Forge-app</h1>
        <p className="text-lg text-gray-600 mt-2">Efficiently manage your tasks</p>
      </header>
      <main className="max-w-2xl mx-auto">
        <section className="bg-white shadow-md rounded-lg p-6 mb-4">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your Tasks</h2>
          <ul>
            {tasks.map(task => (
              <li key={task.id} className="flex items-center justify-between mb-2">
                <span className={`text-lg ${task.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                  {task.title}
                </span>
                <button
                  className="text-blue-500 hover:text-blue-700"
                  onClick={() => router.push(`/tasks/${task.id}`)}
                >
                  <LucideIcon name="edit" size={20} />
                </button>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
};

export default Page;