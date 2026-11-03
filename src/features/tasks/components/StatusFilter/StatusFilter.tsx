import { STATUS_LABELS, TASK_STATUSES } from '@/features/tasks/constants/task.constants';
import type { StatusFilterValue } from '@/features/tasks/types/task.types';
import styles from './StatusFilter.module.css';

type StatusFilterProps = {
  value: StatusFilterValue;
  onChange: (value: StatusFilterValue) => void;
};

const OPTIONS: StatusFilterValue[] = ['all', ...TASK_STATUSES];

export const StatusFilter = ({ value, onChange }: StatusFilterProps) => {
  return (
    <div className={styles.filter} role="group" aria-label="Filtrar por estado">
      {OPTIONS.map((option) => (
        <button
          key={option}
          className={option === value ? styles.active : undefined}
          aria-pressed={option === value}
          onClick={() => onChange(option)}
        >
          {option === 'all' ? 'Todas' : STATUS_LABELS[option]}
        </button>
      ))}
    </div>
  );
};