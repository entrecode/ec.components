import { NotificationsComponent } from './notifications.component';

export class Notification {
  title: string;
  message?: string;
  host?: NotificationsComponent;
  time?: number;
  type?: string;
  error?: any;

  constructor(notification: Notification) {
    if (notification.error) {
      this.type = 'error';
      // this.message = notification.error;
    }
    Object.assign(this, notification);
  }
}