import { TaskItem } from '@/features/tasks/components/TaskItem/TaskItem';
import type { Task, TaskStatus } from '@/features/tasks/types/task.types';
import styles from './TaskList.module.css';

type TaskListProps = {
  tasks: Task[];
  onMove: (id: string, status: TaskStatus) => void;
  onRemove: (id: string) => void;
  onOpen: (id: string) => void;
};

export const TaskList = ({ tasks, onMove, onRemove, onOpen }: TaskListProps) => {
  if (tasks.length === 0) {
    return <p>No hay tareas.</p>;
  }

  return (
    <ul className={styles.list}>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onMove={onMove}
          onRemove={onRemove}
          onOpen={onOpen}
        />
      ))}
    </ul>
  );
};