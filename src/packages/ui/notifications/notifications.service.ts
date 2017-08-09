import { Inject, Injectable } from '@angular/core';
import { Notification } from './notification.interface';
import { Subject } from 'rxjs';

declare const window;

@Injectable()
export class NotificationsService {

  private emitter = new Subject();
  /** Observable that is nexted when a new notification comes in. */
  public emitter$ = this.emitter.asObservable();
  /** The default view time for a notification. */
  public defaultTime: number = 3000;

  constructor(@Inject('useDesktopNotifications') private useDesktopNotifications) {
  }

  /** Emits a notification to all ec-notification components. If host is set, it is only pushed to the specified host.*/
  emit(notification: Notification, desktop?: boolean) {
    if (desktop || this.useDesktopNotifications) {
      this.desktopNotification(notification);
    } else {
      this.emitter.next(notification);
    }
  }

  getPermission() {
    if (window.Notification.permission === 'granted') {
      return Promise.resolve();
    }
    return window.Notification.requestPermission().then((permission) => {
      // If the user accepts, let's create a notification
      if (permission !== 'granted') {
        return Promise.reject('Desktop Notification Permission Denied!');
      }
    });
  }

  desktopNotification(notification: Notification) {
    if (!('Notification' in window)) {
      console.warn('This browser does not support desktop notification');
    }
    this.getPermission().then(() => {
      const message = new window.Notification(notification.title, { body: notification.message });
      setTimeout(() => message.close(), notification.time || this.defaultTime)
    });
  }

}