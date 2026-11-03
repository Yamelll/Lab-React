import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { FormEvent } from 'react';
import { ProgressBar } from '@/components/PogressBar/ProgressBar';
import { SearchInput } from '@/components/SearchInput/SearchInput';
import { StatusFilter } from '@/features/tasks/components/StatusFilter/StatusFilter';
import { TaskCounter } from '@/features/tasks/components/TaskCounter/TaskCounter';
import { TaskList } from '@/features/tasks/components/TaskList/TaskList';
import type {
  StatusFilterValue,
  Task,
  TaskStatus,
} from '@/features/tasks/types/task.types';
import styles from './TasksPage.module.css';

const initialTasks: Task[] = [
  { id: '1', title: 'Aprender JSX', status: 'done', createdAt: '2026-08-03T12:00:00.000Z' },
  { id: '2', title: 'Practicar hooks', status: 'in-progress', createdAt: '2026-08-10T12:00:00.000Z' },
  { id: '3', title: 'Crear mi primer componente', status: 'todo', createdAt: '2026-08-17T12:00:00.000Z' },
];

export const TasksPage = () => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [title, setTitle] = useState('');
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<StatusFilterValue>('all');
  const searchRef = useRef<HTMLInputElement>(null);

  const doneCount = tasks.filter((task) => task.status === 'done').length;

  const visible = useMemo(() => {
    const term = search.trim().toLowerCase();
    return tasks.filter(
      (task) =>
        (status === 'all' || task.status === status) &&
        task.title.toLowerCase().includes(term),
    );
  }, [tasks, status, search]);

  const focusSearch = useCallback((event: KeyboardEvent) => {
    event.preventDefault();
    searchRef.current?.focus();
  }, []);

  useEffect(() => {
    document.title = `Task Manager (${tasks.length - doneCount} pendientes)`;
  }, [tasks.length, doneCount]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === '/' && document.activeElement !== searchRef.current) {
        focusSearch(event);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [focusSearch]);

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

  const handleMove = (id: string, newStatus: TaskStatus) => {
    setTasks((previous) =>
      previous.map((task) => (task.id === id ? { ...task, status: newStatus } : task)),
    );
  };

  const handleRemove = (id: string) => {
    setTasks((previous) => previous.filter((task) => task.id !== id));
  };

  return (
    <>
      <h1>Mis tareas</h1>
      <TaskCounter done={doneCount} total={tasks.length} />
      <ProgressBar current={doneCount} total={tasks.length} />
      <form onSubmit={handleSubmit}>
        <input
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Nueva tarea…"
        />
        <button type="submit">Agregar</button>
      </form>
      <div className={styles.filters}>
        <SearchInput
          ref={searchRef}
          value={search}
          onChange={setSearch}
          placeholder="Buscar tarea (tecla /)"
        />
        <StatusFilter value={status} onChange={setStatus} />
      </div>
      <TaskList
        tasks={visible}
        onMove={handleMove}
        onRemove={handleRemove}
        onOpen={(id) => console.log('abrir', id)}
      />
    </>
  );
};