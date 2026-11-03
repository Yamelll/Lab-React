import { useTaskForm } from './useTaskForm';
import styles from './TaskForm.module.css';

type TaskFormProps = {
  onSubmit: (title: string) => void;
};

export const TaskForm = ({ onSubmit }: TaskFormProps) => {
  const { title, error, handleChange, handleSubmit } = useTaskForm(onSubmit);

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.row}>
        <input
          value={title}
          onChange={handleChange}
          placeholder="Nueva tarea…"
          aria-label="Título de la nueva tarea"
        />
        <button type="submit" className="primary">
          Agregar
        </button>
      </div>
      {error && <span className={styles.error}>{error}</span>}
    </form>
  );
};