/**
 * Created by felix on 26.05.17.
 */
import { Component, Input } from '@angular/core';
import { Collection } from '@ec.components/core/src/collection/collection';
import { Notification } from './notification';
import { NotificationsService } from './notifications.service';

/** Displays any kind of Notification inside the DOM.
 * It listens on the notificationService.$emitter for notifications.
 * <example-url>https://components.entrecode.de/ui/notifications?e=1</example-url>
 * */
@Component({
  selector: 'ec-notifications',
  templateUrl: './notifications.component.html',
})
export class NotificationsComponent {
  /** The current stack of notifications that are visible. */
  notifications: Collection<Notification> = new Collection([]);
  /** The default time for a notification to be visible. Will be ignored if the notification itself has a time set. */
  @Input() time: number;

  /** Listens on the NotificationService and shows each notification that has this component set as host, or none at all. */
  constructor(private notificationService: NotificationsService) {
    this.time = this.time || this.notificationService.defaultTime;
    this.notificationService.emitter$.subscribe((notification: Notification) => {
      if (notification.hide) {
        this.notifications.removeAll(notification.hide);
      }
      if (!notification.title && !notification.message) {
        // console.warn('tried to emit notification without message and title', notification);
        return;
      }
      if (notification.append) {
        notification.append.push(notification);
      }
      if (notification.replace) {
        notification.replace.length = 0;
        notification.replace.push(notification);
      }

      console.log(notification);

      if (!notification.host || notification.host === this) {
        this.notifications.add(notification);
        if (notification.sticky) {
          if (notification.time) {
            console.warn('notification.time is ignored because it was set sticky');
          }
          return;
        }
        setTimeout(() => this.notifications.remove(notification), notification.time || this.time)
      }
    });
  }
}
