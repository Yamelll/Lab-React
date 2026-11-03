import { useCallback, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { NotificationsContext } from './NotificationsContext';
import type { AppNotification, NotificationType } from './notifications.types';

type NotificationsProviderProps = {
  children: ReactNode;
};

export const NotificationsProvider = ({
  children,
}: NotificationsProviderProps) => {
  const [notifications, setNotifications] = useState<AppNotification[]>([]);

  const notify = useCallback(
    (message: string, type: NotificationType = 'success') => {
      const notification = { id: crypto.randomUUID(), message, type };
      setNotifications((previous) => [...previous, notification]);
    },
    [],
  );

  const dismiss = useCallback((id: string) => {
    setNotifications((previous) =>
      previous.filter((notification) => notification.id !== id),
    );
  }, []);

  const value = useMemo(
    () => ({ notifications, notify, dismiss }),
    [notifications, notify, dismiss],
  );

  return (
    <NotificationsContext.Provider value={value}>
      {children}
    </NotificationsContext.Provider>
  );
};