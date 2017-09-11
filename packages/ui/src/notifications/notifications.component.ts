/**
 * Created by felix on 26.05.17.
 */
import { Component, Input } from '@angular/core';
import { Notification } from "./notification";
import { Collection } from '@ec.components/core/src/collection/collection';
import { NotificationsService } from './notifications.service';

/** Displays any kind of Notification inside the DOM. It listens on the notificationService.$emitter for notifications. */
@Component({
  selector: 'ec-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
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
      if (!notification.host || notification.host === this) {
        this.notifications.add(notification);
        setTimeout(() => this.notifications.remove(notification), notification.time || this.time)
      }
    });
  }
}