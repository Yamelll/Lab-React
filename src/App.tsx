import { Container } from '@/components/Container/Container';
import { ProgressBar } from '@/components/PogressBar/ProgressBar';
import { StatusBadge } from '@/features/tasks/components/StatusBadge/StatusBadge';
import { TaskCounter } from '@/features/tasks/components/TaskCounter';
import { TasksPage } from '@/pages/TasksPage/TasksPage';

export const App = () => {
  return (
    <Container>
      <h1>Task Manager</h1>
      <TaskCounter done={2} total={5} />
      <ProgressBar current={2} total={5} />
      <TasksPage />
      <p>
        <StatusBadge status="todo" /> <StatusBadge status="in-progress" />{' '}
        <StatusBadge status="done" />
      </p>
    </Container>
   
  );
};