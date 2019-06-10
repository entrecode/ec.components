---
id: notifications
title: Notifications
sidebar_label: Notifications
---

Notifications are little notes at the corner of the screen, that give feedback to user when something happened like a success or error notification. Many components, e.g ec-form already use notifications. To make them visible, you have to place the container somewhere on your page:

```html
<ec-notifications></ec-notifications>
```

You should place this container once, outside of your routing, at the top level of your DOM tree, to make sure it is present at all times.

## Emitting custom notifications

You can emit your own notifications via the NotificationService:

```ts
import { NotificationsService } from '@ec.components/ui';

class AppComponent {
  // inject NotificationsService
  constructor(public notifications: NotificationsService) {}
  showSuccess() {
    // call emit method
    this.notifications.emit({
      type: 'success',
      title: 'The Toast is hot',
      message: 'The temperature of your toast is now high enough to melt the butter'
    })
  }
  showError(error) {
    // call emit method
    this.notifications.emit({
      title: 'The Toast burnt',
      error // if you pass an 'error', you do not need 'type' and 'message'
    })
  }
}
```

The first argument or emit expects a [Notification](https://entrecode.github.io/ec.components/classes/Notification.html).

If you set the second argument to true, the notification will be emitted as a desktop notification. This will prompt the browser to ask for permission.

## Components using notifications

- login
- signup
- crud
- entry
- entries
- entry-form
- asset-select
- upload
- resource-delete-pop
- resource-list
- history.service
- form