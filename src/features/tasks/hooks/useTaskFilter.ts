import { useMemo, useState } from 'react';
import type { StatusFilterValue, Task } from '@/features/tasks/types/task.types';
import { useDebounce } from '@/hooks/useDebounce';

export const useTaskFilter = (tasks: Task[]) => {
  const [status, setStatus] = useState<StatusFilterValue>('all');
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 300);

  const filtered = useMemo(() => {
    const term = debouncedSearch.trim().toLowerCase();
    return tasks.filter(
      (task) =>
        (status === 'all' || task.status === status) &&
        task.title.toLowerCase().includes(term),
    );
  }, [tasks, status, debouncedSearch]);

  return { status, setStatus, search, setSearch, filtered };
};