import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import PublicAPI from 'ec.sdk/src/PublicAPI';
import { SdkService } from '../../sdk/sdk.service';
import { LoaderComponent, NotificationsService, WithLoader } from '@ec.components/ui';

@Component({
  selector: 'ec-password-reset',
  templateUrl: 'password-reset.component.html'
})

export class PasswordResetComponent implements WithLoader {
  lockForm: boolean;
  email: string;
  @Input() api: PublicAPI;
  @Output() success: EventEmitter<void> = new EventEmitter();
  @ViewChild(LoaderComponent) loader;

  constructor(public sdk: SdkService, public notifications: NotificationsService) {
  }

  reset() {
    const reset = this.sdk.resetPassword(this.email, this.api)
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
