import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { LoaderComponent, NotificationsService, WithLoader } from '@ec.components/ui';
import { Notification } from '@ec.components/ui/src/notifications/notification';
import { WithNotifications } from '@ec.components/ui/src/notifications/with-notifications.interface';
import { SymbolService } from '@ec.components/ui/src/symbol/symbol.service';
import PublicAPI from 'ec.sdk/lib/PublicAPI';
import AccountResource from 'ec.sdk/lib/resources/accounts/AccountResource';
import { AuthService } from '../auth.service';

/** Uses LoginFormComponent. Tries to login via AuthService. Shows notifications and nexts success Subject if login was successful.
 * <example-url>https://components.entrecode.de/auth/auth?e=1</example-url>
*/
@Component({
  selector: 'ec-login',
  templateUrl: 'login.component.html'
})

export class LoginComponent implements WithLoader, WithNotifications {
  /** You can optionally specify PublicAPI instance. Defaults to SdkService#api. */
  @Input() api: PublicAPI;
  /** Subject that is nexted when the login was successful. Meant to be used for redirecting to another page (or similar). */
  @Output() success: EventEmitter<AccountResource> = new EventEmitter();
  /** Subject that is nexted when an error occurs. For custom error reactions */
  @Output() error: EventEmitter<AccountResource> = new EventEmitter();
  /** The included loader. */
  @ViewChild(LoaderComponent) loader;
  /** Error notifications */
  notifications: Notification[] = [];

  constructor(public auth: AuthService,
    public notificationService: NotificationsService,
    public symbol: SymbolService) {
  }
  /** Communicates with the AuthService. Handles loader, notifications and success Subject. */
  login({ email, password }) {
    const login = this.auth.login({ email, password }, this.api)
      .then((user) => {
        this.notificationService.emit({
          type: 'success',
          title: this.symbol.resolve('login.success'),
          hide: this.notifications
        });
        this.success.emit(user);
      })
      .catch((error) => {
        this.notificationService.emit({
          title: this.symbol.resolve('login.error'),
          error,
          sticky: true,
          hide: this.notifications,
          replace: this.notifications
        });
        this.error.next(error);
        console.log('could not login', error);
      });
    this.loader.wait(login);
  }
}
