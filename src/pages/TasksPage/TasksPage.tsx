import { useMemo, useState } from 'react';
import type { FormEvent } from 'react';
import { STATUS_LABELS } from '@/features/tasks/constants/task.constants';
import type { Task, TaskStatus } from '@/features/tasks/types/task.types';

const initialTasks: Task[] = [
  { id: '1', title: 'Aprender JSX', status: 'done', createdAt: '2026-08-03T12:00:00.000Z' },
  { id: '2', title: 'Practicar hooks', status: 'in-progress', createdAt: '2026-08-10T12:00:00.000Z' },
  { id: '3', title: 'Crear mi primer componente', status: 'todo', createdAt: '2026-08-17T12:00:00.000Z' },
];

export const TasksPage = () => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [title, setTitle] = useState('');
  const [search, setSearch] = useState('');

  const doneCount = tasks.filter((task) => task.status === 'done').length;

  const visible = useMemo(() => {
    const term = search.trim().toLowerCase();
    return tasks.filter((task) => task.title.toLowerCase().includes(term));
  }, [tasks, search]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = title.trim();
    if (trimmed === '') return;

    setTasks((previous) => [
      ...previous,
      {
        id: crypto.randomUUID(),
        title: trimmed,
        status: 'todo',
        createdAt: new Date().toISOString(),
      },
    ]);
    setTitle('');
  };

  const handleMove = (id: string, status: TaskStatus) => {
    setTasks((previous) =>
      previous.map((task) => (task.id === id ? { ...task, status } : task)),
    );
  };

  return (
    <>
      <h1>Mis tareas</h1>
      <p>
        {doneCount} de {tasks.length} completadas
      </p>
      <form onSubmit={handleSubmit}>
        <input
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Nueva tarea…"
        />
        <button type="submit">Agregar</button>
      </form>
      <input
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        placeholder="Buscar tarea…"
      />
      <ul>
        {visible.map((task) => (
          <li key={task.id}>
            {task.title} — {STATUS_LABELS[task.status]}
            <button onClick={() => handleMove(task.id, 'in-progress')}>Iniciar</button>
            <button onClick={() => handleMove(task.id, 'done')}>Terminar</button>
          </li>
        ))}
      </ul>
    </>
  );
};