import { useEffect } from 'react';
import type { AppNotification } from '@/stores/notifications/notifications.types';
import styles from './NotificationCenter.module.css';

const AUTO_DISMISS_MS = 4000;

type NotificationItemProps = {
  notification: AppNotification;
  onDismiss: (id: string) => void;
};

export const NotificationItem = ({
  notification,
  onDismiss,
}: NotificationItemProps) => {
  useEffect(() => {
    const timer = setTimeout(() => onDismiss(notification.id), AUTO_DISMISS_MS);

    return () => clearTimeout(timer);
  }, [notification.id, onDismiss]);

  return (
    <div className={`${styles.item} ${styles[notification.type]}`} role="status">
      <span>{notification.message}</span>
      <button onClick={() => onDismiss(notification.id)} aria-label="Cerrar">
        ×
      </button>
    </div>
  );
};