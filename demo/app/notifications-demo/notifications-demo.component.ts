import { Component, OnInit } from '@angular/core';
import { NotificationsService } from '@ec.components/ui';

@Component({
  templateUrl: './notifications-demo.component.html',
  styleUrls: ['./notifications-demo.component.css']
})
export class NotificationsDemoComponent implements OnInit {
  public classes = ['toast', 'bread'];
  public notificationsClass = this.classes[0];
  public desktop = false;

  constructor(private notifications: NotificationsService) {
  }

  ngOnInit() {
  }

  emit(type) {
    console.log('emit', type);
    this.notifications.emit({
      type,
      title: `${type} notification`,
      message: `This is a ${type} notification`
    }, this.desktop)
  }

}
