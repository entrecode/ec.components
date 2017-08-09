import { NotificationsComponent } from './notifications.component';

export interface Notification {
  title: string,
  message?: string,
  host?: NotificationsComponent,
  time?: number,
  type?: string,
}