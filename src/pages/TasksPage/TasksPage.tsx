import { useCallback, useRef } from 'react';
import { ProgressBar } from '@/components/PogressBar/ProgressBar';
import { SearchInput } from '@/components/SearchInput/SearchInput';
import { StatusFilter } from '@/features/tasks/components/StatusFilter/StatusFilter';
import { TaskCounter } from '@/features/tasks/components/TaskCounter/TaskCounter';
import { TaskForm } from '@/features/tasks/components/TaskForm/TaskForm';
import { TaskList } from '@/features/tasks/components/TaskList/TaskList';
import { useTaskFilter } from '@/features/tasks/hooks/useTaskFilter';
import { useTasks } from '@/features/tasks/hooks/useTasks';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { useKeyboardShortcut } from '@/hooks/useKeyboardShortcut';
import styles from './TasksPage.module.css';

export const TasksPage = () => {
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
        onOpen={(id) => console.log('abrir', id)}
      />
    </>
  );
};