import { Link, useNavigate, useParams } from 'react-router-dom';
import { StatusBadge, TaskMoveButtons, useTasks } from '@/features/tasks';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { formatDate } from '@/utils/formatDate';
import styles from './TaskDetailPage.module.css';

export const TaskDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { tasks, move, remove } = useTasks();
  const task = tasks.find((item) => item.id === id);

  useDocumentTitle(task?.title ?? 'Task Manager');

  if (task === undefined) {
    return (
      <p>
        No se encontró la tarea. <Link to="/">Volver al tablero</Link>
      </p>
    );
  }

  const handleRemove = () => {
    remove(task.id);
    navigate('/');
  };

  return (
    <section className={styles.detail}>
      <Link to="/">← Volver al tablero</Link>
      <h1>{task.title}</h1>
      <p>
        <StatusBadge status={task.status} />
      </p>
      <p>Creada el {formatDate(task.createdAt)}</p>
      <div className={styles.actions}>
        <TaskMoveButtons
          status={task.status}
          onMove={(status) => move(task.id, status)}
        />
        <button className="danger" onClick={handleRemove}>
          Eliminar
        </button>
      </div>
    </section>
  );
};