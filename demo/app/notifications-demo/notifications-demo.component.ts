import { Component, OnInit, ViewChild } from '@angular/core';
import { NotificationsComponent, NotificationsService } from '@ec.components/ui';
import { Form } from '@ec.components/core';
import { FormComponent } from '../../../packages/ui/src/form/form.component';

@Component({
  templateUrl: './notifications-demo.component.html',
  styleUrls: ['./notifications-demo.component.css']
})
export class NotificationsDemoComponent implements OnInit {
  public classes = ['toast', 'bread'];
  public types = ['success', 'info', 'error'];
  @ViewChild('notifications') notifications: NotificationsComponent;
  public options: Form<any>;
  @ViewChild('optionsForm') optionsForm: FormComponent;

  constructor(private notificationService: NotificationsService) {
  }

  ngOnInit() {
    this.options = new Form({
      time: 2000,
      hostClass: this.classes[0],
      desktop: false,
      title: 'The Toast is hot',
      message: 'The temperature of your white bread has risen to improve its crisp factor to the optimum!',
      type: 'success'
    }, {
      fields: {
        time: {
          label: 'Zeit',
          view: 'number'
        },
        hostClass: {
          label: 'Klasse',
          view: 'select',
          values: this.classes
        },
        desktop: {
          label: 'Desktop',
          view: 'boolean'
        },
        title: {
          label: 'Title',
          view: 'string',
          prefill: 'Title'
        },
        message: {
          label: 'Message',
          view: 'textarea'
        },
        type: {
          label: 'Type',
          view: 'select',
          values: this.types
        },
      }
    });
  }

  emit({ type, title, message, desktop }) {
    this.notificationService.emit({ type, title, message }, desktop)
  }

}
