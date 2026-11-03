import type { TaskStatus } from '@/features/tasks/types/task.types';

type Move = { to: TaskStatus; label: string };

// A qué estados puede pasar una tarea desde cada estado
const MOVES: Record<TaskStatus, Move[]> = {
  todo: [{ to: 'in-progress', label: 'Iniciar →' }],
  'in-progress': [
    { to: 'todo', label: '← Pendiente' },
    { to: 'done', label: 'Terminar ✔' },
  ],
  done: [{ to: 'in-progress', label: '← Reabrir' }],
};

type TaskMoveButtonsProps = {
  status: TaskStatus;
  onMove: (status: TaskStatus) => void;
};

export const TaskMoveButtons = ({ status, onMove }: TaskMoveButtonsProps) => {
  return (
    <>
      {MOVES[status].map((move) => (
        <button key={move.to} onClick={() => onMove(move.to)}>
          {move.label}
        </button>
      ))}
    </>
  );
};