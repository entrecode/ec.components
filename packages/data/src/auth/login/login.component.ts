import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import PublicAPI from 'ec.sdk/src/PublicAPI';
import AccountResource from 'ec.sdk/src/resources/accounts/AccountResource';
import { LoaderComponent, NotificationsService, WithLoader } from '@ec.components/ui';
import { AuthService } from '../auth.service';

@Component({
  selector: 'ec-login',
  templateUrl: 'login.component.html'
})

export class LoginComponent implements WithLoader {
  @Input() api: PublicAPI;
  @Output() success: EventEmitter<AccountResource> = new EventEmitter();
  @ViewChild(LoaderComponent) loader;

  constructor(public auth: AuthService, public notifications: NotificationsService) {
  }

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
