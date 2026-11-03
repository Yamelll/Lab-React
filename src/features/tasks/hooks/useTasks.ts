import { useEffect, useMemo, useState } from 'react';
import { loadTasks, saveTasks } from '@/features/tasks/api/tasks.repository';
import { STATUS_LABELS } from '@/features/tasks/constants/task.constants';
import type { Task, TaskStatus } from '@/features/tasks/types/task.types';
import { countByStatus } from '@/features/tasks/utils/countByStatus';
import { useNotifications } from '@/stores/notifications/useNotifications';

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>(loadTasks);
  const { notify } = useNotifications();

  // Sincroniza con un sistema externo (localStorage): un uso legítimo de useEffect
  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  const stats = useMemo(() => countByStatus(tasks), [tasks]);

  const add = (title: string) => {
    const created: Task = {
      id: crypto.randomUUID(),
      title,
      status: 'todo',
      createdAt: new Date().toISOString(),
    };
    setTasks((previous) => [...previous, created]);
    notify('Tarea creada');
  };

  const move = (id: string, status: TaskStatus) => {
    setTasks((previous) =>
      previous.map((task) => (task.id === id ? { ...task, status } : task)),
    );
    notify(`Tarea movida a "${STATUS_LABELS[status]}"`);
  };

  const remove = (id: string) => {
    setTasks((previous) => previous.filter((task) => task.id !== id));
    notify('Tarea eliminada');
  };

  return { tasks, stats, add, move, remove };
};