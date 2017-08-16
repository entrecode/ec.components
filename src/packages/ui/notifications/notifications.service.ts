import { Inject, Injectable } from '@angular/core';
import { Notification } from './notification';
import { Subject } from 'rxjs';

declare const window;

/** This service is the main interaction layer for the developer to show notifications. */
@Injectable()
export class NotificationsService {
  /** The emitter subject to fire notifications. */
  private emitter = new Subject();
  /** Observable that is nexted when a new notification comes in. */
  public emitter$ = this.emitter.asObservable();
  /** The default view time for a notification. */
  public defaultTime: number = 5000;

  /** The constructors injects the useDesktopNotifications flag from the module.
   * If true, all notifications will be shown as desktop notifications instead. */
  constructor(@Inject('useDesktopNotifications') private useDesktopNotifications) {
  }

  /** Emits a notification to all ec-notification components. If host is set, it is only pushed to the specified host.*/
  emit(notification: Notification, desktop?: boolean) {
    if (desktop || this.useDesktopNotifications) {
      this.desktopNotification(new Notification(notification));
    } else {
      this.emitter.next(new Notification(notification));
    }
  }

  /** Asks for permission to show desktop notifications, if not already granted. */
  getPermission(): Promise<void> {
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

  /** Emits a desktop notification after asking for permission (if not already granted). */
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