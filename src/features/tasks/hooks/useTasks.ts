import { useMemo, useState } from 'react';
import type { Task, TaskStatus } from '@/features/tasks/types/task.types';
import { countByStatus } from '@/features/tasks/utils/countByStatus';

const initialTasks: Task[] = [
  { id: '1', title: 'Aprender JSX', status: 'done', createdAt: '2026-08-03T12:00:00.000Z' },
  { id: '2', title: 'Practicar hooks', status: 'in-progress', createdAt: '2026-08-10T12:00:00.000Z' },
  { id: '3', title: 'Crear mi primer componente', status: 'todo', createdAt: '2026-08-17T12:00:00.000Z' },
];

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const stats = useMemo(() => countByStatus(tasks), [tasks]);

  const add = (title: string) => {
    const created: Task = {
      id: crypto.randomUUID(),
      title,
      status: 'todo',
      createdAt: new Date().toISOString(),
    };
    setTasks((previous) => [...previous, created]);
  };

  const move = (id: string, status: TaskStatus) => {
    setTasks((previous) =>
      previous.map((task) => (task.id === id ? { ...task, status } : task)),
    );
  };

  const remove = (id: string) => {
    setTasks((previous) => previous.filter((task) => task.id !== id));
  };

  return { tasks, stats, add, move, remove };
};