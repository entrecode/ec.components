import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import PublicAPI from 'ec.sdk/lib/PublicAPI';
import { LoaderComponent, NotificationsService, WithLoader } from '../../../../ui';
import { AuthService } from '../auth.service';

/** Form to send password reset request. */
@Component({
  selector: 'ec-password-reset',
  templateUrl: 'password-reset.component.html'
})

export class PasswordResetComponent implements WithLoader {
  /** To ensure the user only sends one request, the form is locked after the request has been sent */
  lockForm: boolean;
  /** The user email */
  email: string;
  /** Optional api to be used (if not using sdk.api instance) */
  @Input() api: PublicAPI;
  /** Custom placeholder for email field */
  @Input() placeholder = 'E-Mail Adresse...';
  /** Event after request was successful */
  @Output() success: EventEmitter<any> = new EventEmitter();
  /** The loader */
  @ViewChild(LoaderComponent) loader;

  constructor(public auth: AuthService, public notifications: NotificationsService) {
  }
  /** Sends request through AuthService and shows notifications + loader. */
  reset() {
    const reset = this.auth.resetPassword(this.email, this.api)
      .then(() => {
        this.notifications.emit({
          type: 'success',
          title: 'Mail versendet',
          message: 'Sie haben soeben eine Mail mit weiteren Anweisungen erhalten',
          sticky: true
        });
        this.lockForm = true;
        this.success.emit();
      }).catch((error) => {
        this.notifications.emit({
          title: 'Fehler beim Passwort zurücksetzen',
          error,
          sticky: true
        });
        console.log('could not reset password', error);
      });
    this.loader.wait(reset);
  }
}
