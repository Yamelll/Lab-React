import { StatusBadge } from '@/features/tasks/components/StatusBadge/StatusBadge';
import { TaskMoveButtons } from '@/features/tasks/components/TaskMoveButtons/TaskMoveButtons';
import type { Task, TaskStatus } from '@/features/tasks/types/task.types';
import styles from './TaskItem.module.css';

type TaskItemProps = {
  task: Task;
  onMove: (id: string, status: TaskStatus) => void;
  onRemove: (id: string) => void;
  onOpen: (id: string) => void;
};

export const TaskItem = ({ task, onMove, onRemove, onOpen }: TaskItemProps) => {
  return (
    <li className={styles.item}>
      <button className={styles.title} onClick={() => onOpen(task.id)}>
        {task.title}
      </button>
      <StatusBadge status={task.status} />
      <TaskMoveButtons
        status={task.status}
        onMove={(status) => onMove(task.id, status)}
      />
      <button className="danger" onClick={() => onRemove(task.id)}>
        Eliminar
      </button>
    </li>
  );
};