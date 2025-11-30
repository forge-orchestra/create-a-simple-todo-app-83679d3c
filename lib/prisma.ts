import { PrismaClient } from '@prisma/client';

/**
 * Initializes and exports a singleton instance of PrismaClient.
 * Ensures that the client is not re-instantiated during hot reloading in development.
 */
const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') global.prisma = prisma;

/**
 * Type representing a task in the todo application.
 */
export type Task = {
  id: string;
  title: string;
  description: string | null;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
};

/**
 * Fetches all tasks from the database.
 * @returns {Promise<Task[]>} A promise that resolves to an array of tasks.
 */
export async function getTasks(): Promise<Task[]> {
  try {
    return await prisma.task.findMany();
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw new Error('Could not fetch tasks');
  }
}

/**
 * Creates a new task in the database.
 * @param {string} title - The title of the task.
 * @param {string | null} description - The description of the task.
 * @returns {Promise<Task>} A promise that resolves to the created task.
 */
export async function createTask(title: string, description: string | null): Promise<Task> {
  try {
    return await prisma.task.create({
      data: {
        title,
        description,
        completed: false,
      },
    });
  } catch (error) {
    console.error('Error creating task:', error);
    throw new Error('Could not create task');
  }
}

/**
 * Updates an existing task in the database.
 * @param {string} id - The ID of the task to update.
 * @param {Partial<Omit<Task, 'id' | 'createdAt' | 'updatedAt'>>} data - The data to update.
 * @returns {Promise<Task>} A promise that resolves to the updated task.
 */
export async function updateTask(id: string, data: Partial<Omit<Task, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Task> {
  try {
    return await prisma.task.update({
      where: { id },
      data,
    });
  } catch (error) {
    console.error('Error updating task:', error);
    throw new Error('Could not update task');
  }
}

/**
 * Deletes a task from the database.
 * @param {string} id - The ID of the task to delete.
 * @returns {Promise<Task>} A promise that resolves to the deleted task.
 */
export async function deleteTask(id: string): Promise<Task> {
  try {
    return await prisma.task.delete({
      where: { id },
    });
  } catch (error) {
    console.error('Error deleting task:', error);
    throw new Error('Could not delete task');
  }
}

export { prisma };