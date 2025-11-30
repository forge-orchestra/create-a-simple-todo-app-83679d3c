import { LucideIcon } from 'lucide-react';

/**
 * Type representing a task in the todo app.
 */
export type Task = {
  id: string;
  title: string;
  completed: boolean;
};

/**
 * Type representing an error object.
 */
export type AppError = {
  message: string;
  code?: number;
};

/**
 * Function to create a new task.
 * @param title - The title of the task.
 * @returns The newly created task.
 * @throws Will throw an error if the title is empty.
 */
export function createTask(title: string): Task {
  if (!title) {
    throw new Error('Task title cannot be empty');
  }
  return {
    id: generateUniqueId(),
    title,
    completed: false,
  };
}

/**
 * Function to toggle the completion status of a task.
 * @param task - The task to toggle.
 * @returns The updated task with toggled completion status.
 */
export function toggleTaskCompletion(task: Task): Task {
  return { ...task, completed: !task.completed };
}

/**
 * Function to delete a task.
 * @param tasks - The list of tasks.
 * @param taskId - The ID of the task to delete.
 * @returns A new list of tasks without the deleted task.
 */
export function deleteTask(tasks: Task[], taskId: string): Task[] {
  return tasks.filter(task => task.id !== taskId);
}

/**
 * Function to update a task's title.
 * @param task - The task to update.
 * @param newTitle - The new title for the task.
 * @returns The updated task with the new title.
 * @throws Will throw an error if the new title is empty.
 */
export function updateTaskTitle(task: Task, newTitle: string): Task {
  if (!newTitle) {
    throw new Error('New task title cannot be empty');
  }
  return { ...task, title: newTitle };
}

/**
 * Function to handle errors in the application.
 * @param error - The error object.
 * @returns A formatted error message.
 */
export function handleError(error: unknown): AppError {
  if (error instanceof Error) {
    return { message: error.message };
  }
  return { message: 'An unknown error occurred' };
}

/**
 * Function to generate a unique ID for tasks.
 * @returns A unique string ID.
 */
function generateUniqueId(): string {
  return Math.random().toString(36).substr(2, 9);
}

export {
  createTask,
  toggleTaskCompletion,
  deleteTask,
  updateTaskTitle,
  handleError,
};