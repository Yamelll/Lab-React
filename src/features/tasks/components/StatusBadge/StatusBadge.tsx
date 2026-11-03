import { STATUS_LABELS } from '@/features/tasks/constants/task.constants';
import type { TaskStatus } from '@/features/tasks/types/task.types';
import styles from './StatusBadge.module.css';

type StatusBadgeProps = {
  status: TaskStatus;
};

export const StatusBadge = ({ status }: StatusBadgeProps) => {
  return (
    <span className={`${styles.badge} ${styles[status]}`}>
      {STATUS_LABELS[status]}
    </span>
  );
};