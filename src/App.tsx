
  import { TaskCounter } from '@/features/tasks/components/TaskCounter';

export const App = () => {
  return (
    <main>
      <h1>Task Manager</h1>
      <TaskCounter done={2} total={5} />
    </main>
  );
};
