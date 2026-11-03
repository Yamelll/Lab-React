export type NotificationType = 'success' | 'error';

export type AppNotification = {
  id: string;
  message: string;
  type: NotificationType;
};

export type NotificationsContextValue = {
  notifications: AppNotification[];
  notify: (message: string, type?: NotificationType) => void;
  dismiss: (id: string) => void;
};