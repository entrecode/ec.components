import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { SdkService } from '@ec.components/data/src/sdk/sdk.service';
import { NotificationsService } from '@ec.components/ui/src/notifications/notifications.service';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class AuthGuard implements CanActivate {
  redirect: Subject<any> = new Subject();

  constructor(private sdk: SdkService, private notifications: NotificationsService) {
  }

  canActivate() {
    return this.sdk.ready.then(user => {
      if (!!user) {
        return true;
      }
      this.notifications.emit({
        type: 'error',
        title: 'Diese Seite kann nicht angezeigt werden.',
        message: 'Sie sind nicht eingeloggt.'
      });
      this.redirect.next();
    });
  }
}
