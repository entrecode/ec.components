import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { SdkService } from '../sdk/sdk.service';
import { NotificationsService } from '@ec.components/ui/src/notifications/notifications.service';
import { Subject } from 'rxjs/Subject';

/** This guard can be used on routes that only can be activated when a user is present in the SdkService.
 * If no user is found, an error message is shown. You can then react via the redirect output. */
@Injectable()
export class AuthGuard implements CanActivate {
  /** Subject that is nexted when the user check fails. (Meant to be used for redirecting to another page e.g. login) */
  redirect: Subject<any> = new Subject();

  constructor(private sdk: SdkService, private notifications: NotificationsService) {
  }
  /** Checks if the sdk contains a user, if not an error message is shown. */
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
