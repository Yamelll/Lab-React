import { useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProgressBar } from '@/components/ProgressBar/ProgressBar';
import { SearchInput } from '@/components/SearchInput/SearchInput';
import {
  StatusFilter,
  TaskCounter,
  TaskForm,
  TaskList,
  useTaskFilter,
  useTasks,
} from '@/features/tasks';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { useKeyboardShortcut } from '@/hooks/useKeyboardShortcut';
import styles from './TasksPage.module.css';

export const TasksPage = () => {
  const navigate = useNavigate();
  const { tasks, stats, add, move, remove } = useTasks();
  const { status, setStatus, search, setSearch, filtered } = useTaskFilter(tasks);
  const searchRef = useRef<HTMLInputElement>(null);

  const focusSearch = useCallback((event: KeyboardEvent) => {
    event.preventDefault();
    searchRef.current?.focus();
  }, []);

  useKeyboardShortcut('/', focusSearch);
  useDocumentTitle(`Task Manager (${stats.todo + stats['in-progress']} pendientes)`);

  return (
    <>
      <h1>Mis tareas</h1>
      <TaskCounter done={stats.done} total={stats.total} />
      <ProgressBar current={stats.done} total={stats.total} />
      <TaskForm onSubmit={add} />
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
        tasks={filtered}
        onMove={move}
        onRemove={remove}
        onOpen={(id) => navigate(`/tasks/${id}`)}
      />
    </>
  );
};