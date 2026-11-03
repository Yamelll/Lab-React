import { TASK_STATUSES } from '@/features/tasks/constants/task.constants';
import type { Task } from '@/features/tasks/types/task.types';

const STORAGE_KEY = 'lab.tasks';

const seed: Task[] = [
  { id: 'seed-1', title: 'Aprender JSX', status: 'done', createdAt: '2026-08-03T12:00:00.000Z' },
  { id: 'seed-2', title: 'Practicar hooks', status: 'in-progress', createdAt: '2026-08-10T12:00:00.000Z' },
  { id: 'seed-3', title: 'Crear mi primer componente', status: 'todo', createdAt: '2026-08-17T12:00:00.000Z' },
];

const isTask = (value: unknown): value is Task =>
  typeof value === 'object' &&
  value !== null &&
  'id' in value &&
  typeof value.id === 'string' &&
  'title' in value &&
  typeof value.title === 'string' &&
  'status' in value &&
  TASK_STATUSES.some((status) => status === value.status) &&
  'createdAt' in value &&
  typeof value.createdAt === 'string';

export const loadTasks = (): Task[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw === null) return seed;

    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.every(isTask) ? parsed : seed;
  } catch {
    return seed;
  }
};

export const saveTasks = (tasks: Task[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch {
    // Sin almacenamiento disponible (modo privado): la app sigue funcionando en memoria
  }
};