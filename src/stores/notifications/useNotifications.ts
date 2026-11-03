import { useContext } from 'react';
import { NotificationsContext } from './NotificationsContext';

export const useNotifications = () => {
  const context = useContext(NotificationsContext);

  if (context === null) {
    throw new Error('useNotifications debe usarse dentro de NotificationsProvider');
  }

  return context;
};