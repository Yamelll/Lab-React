import { useNotifications } from '@/stores/notifications/useNotifications';
import { NotificationItem } from './NotificationItem';
import styles from './NotificationCenter.module.css';

export const NotificationCenter = () => {
  const { notifications, dismiss } = useNotifications();

  return (
    <div className={styles.center}>
      {notifications.map((notification) => (
        <NotificationItem
          key={notification.id}
          notification={notification}
          onDismiss={dismiss}
        />
      ))}
    </div>
  );
};