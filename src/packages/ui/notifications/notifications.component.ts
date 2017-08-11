/**
 * Created by felix on 26.05.17.
 */
import { Component, Input } from '@angular/core';
import { Notification } from "./notification";
import { Collection } from '../../core/collection/collection';
import { NotificationsService } from './notifications.service';

@Component({
  selector: 'ec-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent {

  notifications: Collection<Notification> = new Collection();
  @Input() time: number;

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