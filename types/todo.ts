import { LucideIcon } from 'lucide-react';

export interface Todo {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface TodoIconProps {
  icon: LucideIcon;
  size?: number;
  color?: string;
}