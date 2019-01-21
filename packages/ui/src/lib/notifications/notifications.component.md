# Notifications

The Notifications Module is a combination of the NotificationsService and the NotificationsComponent.

## Simple Usage

1. Place the component somewhere in your app template:

```html
<ec-notifications></ec-notifications>
```

2. Emit notifications via the service

```ts
export class MyComponent {
  constructor(private notifications: NotificationsService) {}

  showNotification() {
      this.notifications.emit({
        type: 'success',
        title: 'Das ist der Notification Titel',
        message: 'Das ist die Beschreibung'
      });
  }

  doSomethingRisky() {
      return Promise.reject('Fehler')
      .catch((err) => {
          this.notifications.emit({
              error: err, // passing the error Object
              title: 'Fehler!'
          })
      })
  }
}
```

The given type will be added as class. The classes that are available by default [can be looked up here](https://github.com/entrecode/ec.components/blob/master/packages/style/notifications/_ec-notifications_default.scss).

## Advanced Usage

You can also use multiple ec-notifications at different places:

```html
<ec-notifications #a></ec-notifications>
<ec-notifications #b></ec-notifications>
<button (click)="emit(a)">A</button>
<button (click)="emit(b)">B</button>
```

All you have to do, is pass the instance of the component that should display the notification via the host property:

```ts
export class MyComponent {
  constructor(private notifications: NotificationsService) {}

  emit(host) {
      this.notifications.emit({
        type: 'success',
        title: 'Das ist der Notification Titel',
        host: host
      });
  }
}
```

## Hiding previous errors

Here is an example usage of a typical success/error handling.
It features hiding previous notifications. We recommended you to use the _WithNotifications_ interface for that case.


```ts
export class MuffinComponent implements WithNotifications {
  /** Recent Error notification */
  notifications: Notification[] = [];

constructor(
    public bakery:BakeryService,
    public notificationService: NotificationsService,
    )

  bake() {
    this.bakery.bake().then(()=> {
        this.notificationService.emit({
            title: 'Muffin was baken!',
            hide: this.notifications // this will hide all preceding notifications
        })
    }).catch(error=>{
        this.notificationService.emit({
            title: 'Error while baking',
            sticky: true,
            hide: this.notifications, // this will hide all preceding notifications
            replace: this.notifications // this will replace the given array with the new notification
        })
    });
  }
}
```

The hide option is useful to hide obsolete errors. E.g. If you successfully log in after one failiure, the sticky error notification of the first attempt will be hidden. This enables you to keep errors messages as long as they are needed.
Instead of replace, you could also use append (see notification.component.ts for implementation).