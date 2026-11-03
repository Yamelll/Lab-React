import type { TaskStatus } from '@/features/tasks/types/task.types';

export const TASK_STATUSES: TaskStatus[] = ['todo', 'in-progress', 'done'];

export const STATUS_LABELS: Record<TaskStatus, string> = {
  todo: 'Pendiente',
  'in-progress': 'En progreso',
  done: 'Terminada',
};