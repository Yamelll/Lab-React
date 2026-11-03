import { Navigate, Route, Routes } from 'react-router-dom';
import { MainLayout } from '@/layouts/MainLayout/MainLayout';
import { TaskDetailPage } from '@/pages/TaskDetailPage/TaskDetailPage';
import { TasksPage } from '@/pages/TasksPage/TasksPage';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<TasksPage />} />
        <Route path="tasks/:id" element={<TaskDetailPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
};