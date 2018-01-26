import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import PublicAPI from 'ec.sdk/lib/PublicAPI';
import AccountResource from 'ec.sdk/lib/resources/accounts/AccountResource';
import { LoaderComponent, NotificationsService, WithLoader } from '@ec.components/ui';
import { AuthService } from '../auth.service';

/** Uses LoginFormComponent. Tries to login via AuthService. Shows notifications and nexts success Subject if login was successful. */
@Component({
  selector: 'ec-login',
  templateUrl: 'login.component.html'
})

export class LoginComponent implements WithLoader {
  /** You can optionally specify PublicAPI instance. Defaults to SdkService#api. */
  @Input() api: PublicAPI;
  /** Subject that is nexted when the login was successful. Meant to be used for redirecting to another page (or similar). */
  @Output() success: EventEmitter<AccountResource> = new EventEmitter();
  /** The included loader. */
  @ViewChild(LoaderComponent) loader;

  constructor(public auth: AuthService, public notifications: NotificationsService) {
  }
  /** Communicates with the AuthService. Handles loader, notifications and success Subject. */
  login({ email, password }) {
    const login = this.auth.login({ email, password }, this.api)
      .then((user) => {
        this.notifications.emit({
          type: 'success',
          title: 'Login erfolgreich',
        });
        this.success.emit(user);
      })
      .catch((error) => {
        this.notifications.emit({
          title: 'Fehler beim Login',
          error,
          sticky: true
        });
        console.log('could not login', error);
      });
    this.loader.wait(login);
  }
}
