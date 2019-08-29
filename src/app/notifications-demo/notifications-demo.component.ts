import { Component, OnInit, ViewChild } from '@angular/core';
import { Form } from '@ec.components/core';
import { FormComponent, Notification, NotificationsService, WithNotifications } from '@ec.components/ui';

@Component({
  templateUrl: './notifications-demo.component.html',
})
export class NotificationsDemoComponent implements OnInit, WithNotifications {
  public classes = ['ec-notifications_default', 'ec-notifications_toast'];
  public types = ['success', 'info', 'error'];
  public notifications: Notification[] = [];
  public options: Form<any>;
  /* public latest:Notification; */
  @ViewChild('optionsForm', { static: true }) optionsForm: FormComponent<any>;

  constructor(private notificationService: NotificationsService) {}

  ngOnInit() {
    this.options = new Form(
      {
        time: 8000,
        hostClass: this.classes[0],
        desktop: false,
        title: 'The Toast is hot',
        message: 'The temperature of your white bread has risen to improve its crisp factor to the optimum!',
        type: 'success',
      },
      {
        fields: {
          time: {
            label: 'Zeit in ms',
            view: 'number',
          },
          hostClass: {
            label: 'Klasse',
            view: 'select',
            values: this.classes,
          },
          desktop: {
            label: 'Desktop',
            view: 'boolean',
          },
          replace: {
            label: 'Replace',
            view: 'boolean',
          },
          title: {
            label: 'Title',
            view: 'string',
            prefill: 'Title',
          },
          message: {
            label: 'Message',
            view: 'textarea',
          },
          type: {
            label: 'Type',
            view: 'select',
            values: this.types,
          },
        },
      },
    );
  }

  emit({ type, title, message, desktop, replace }) {
    const hide = replace ? this.notifications : [];
    const notification = this.notificationService.emit(
      { type, title, message, hide, replace: this.notifications },
      desktop,
    );
  }

  hide() {
    this.notificationService.emit({
      hide: this.notifications,
    });
  }
}
