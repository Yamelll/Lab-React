import type { Task, TaskStatus } from '@/features/tasks/types/task.types';

export type TaskStats = Record<TaskStatus, number> & { total: number };

export const countByStatus = (tasks: Task[]): TaskStats => {
  const stats: TaskStats = { todo: 0, 'in-progress': 0, done: 0, total: tasks.length };

  tasks.forEach((task) => {
    stats[task.status] += 1;
  });

  return stats;
};