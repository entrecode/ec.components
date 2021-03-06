import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { WithNotifications, LoaderComponent, WithLoader, Notification } from '@ec.components/ui';
import PublicAPI from 'ec.sdk/lib/PublicAPI';
import AccountResource from 'ec.sdk/lib/resources/accounts/AccountResource';

/** Uses LoginFormComponent. Tries to login via AuthService. Shows notifications and nexts success Subject if login was successful.
 * <example-url>https://components.entrecode.de/auth/signup?e=1</example-url>
 */
@Component({
  selector: 'ec-signup',
  templateUrl: 'signup.component.html',
})
export class SignupComponent extends LoginComponent implements WithLoader, WithNotifications {
  /** You can optionally specify PublicAPI instance. Defaults to SdkService#api. */
  @Input() api: PublicAPI;
  /** Invite code to use. If set, the invite form field will be hidden. */
  @Input() invite = '';
  /** Subject that is nexted when the login was successful. Meant to be used for redirecting to another page (or similar). */
  @Output() success: EventEmitter<AccountResource> = new EventEmitter();
  /** The included loader. */
  @ViewChild(LoaderComponent, { static: true }) loader;
  /** Error notifications */
  notifications: Notification[] = [];

  /** Communicates with the AuthService. Handles loader, notifications and success Subject. */
  signup({ email, password, invite }) {
    const registration = this.auth
      .signup({ email, password, invite }, this.api)
      .then((user) => {
        this.notificationService.emit({
          type: 'success',
          title: this.symbol.resolve('signup.success'),
          hide: this.notifications,
        });
        this.success.emit(user);
      })
      .catch((error) => {
        this.notificationService.emit({
          title: this.symbol.resolve('signup.error'),
          error,
          sticky: true,
          hide: this.notifications,
          replace: this.notifications,
        });
        this.error.next(error);
        console.log('could not signup', error);
      });
    this.loader.wait(registration);
  }
}
