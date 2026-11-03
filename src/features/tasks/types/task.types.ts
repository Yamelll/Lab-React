export type TaskStatus = 'todo' | 'in-progress' | 'done';

export type Task = {
  id: string;
  title: string;
  status: TaskStatus;
  createdAt: string;
};

export type StatusFilterValue = TaskStatus | 'all';