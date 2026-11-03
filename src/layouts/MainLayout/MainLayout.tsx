import { NavLink, Outlet } from 'react-router-dom';
import { Container } from '@/components/Container/Container';
import { NotificationCenter } from '@/components/NotificationCenter/NotificationCenter';
import styles from './MainLayout.module.css';

export const MainLayout = () => {
  return (
    <>
      <header className={styles.header}>
        <strong>Task Manager</strong>
        <nav>
          <NavLink to="/">Tablero</NavLink>
        </nav>
      </header>
      <Container>
        <Outlet />
      </Container>
      <NotificationCenter />
    </>
  );
};