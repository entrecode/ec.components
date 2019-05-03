import { Inject, Injectable } from '@angular/core';
import { Notification } from './notification';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';

/** Workaround to get window without typescript complaining */
declare const window;

/** This service is the main interaction layer for the developer to show notifications.
 * You can use desktop notifications by default by providing:
 * ```json
 {
   provide: "useDesktopNotifications",
   useValue: true
 }```
 * in your module's providers.
 *
 * */
@Injectable()
export class NotificationsService {
  /** The emitter subject to fire notifications. */
  private emitter: Subject<Notification> = new Subject();
  /** Observable that is nexted when a new notification comes in. */
  public emitter$: Observable<Notification> = this.emitter.asObservable();
  /** The default view time for a notification. */
  public defaultTime = 5000;

  /** The constructors injects the useDesktopNotifications flag from the module.
   * If true, all notifications will be shown as desktop notifications instead. */
  constructor(@Inject('useDesktopNotifications') private useDesktopNotifications) {}

  /** Emits a notification to all ec-notification components. If host is set, it is only pushed to the specified host.*/
  emit(notification: Notification, desktop?: boolean) {
    const instance = new Notification(notification);
    if (desktop || this.useDesktopNotifications) {
      this.desktopNotification(instance);
    } else {
      this.emitter.next(instance);
    }
    if (notification && notification.error) {
      console.error(notification.error);
    }
    return instance;
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
      if (notification.sticky) {
        if (notification.time) {
          console.warn('notification.time is ignored because it was set sticky');
        }
        return;
      }
      setTimeout(() => message.close(), notification.time || this.defaultTime);
    });
  }
}
