import { Component } from '@angular/core';
import { SdkService, AuthService } from '@ec.components/data';

@Component({
  selector: 'ec-auth-demo',
  templateUrl: './auth-demo.component.html',
})
export class AuthDemoComponent {
  private user: any;

  constructor(public sdk: SdkService, public auth: AuthService) {
    this.sdk.getAccount().then((user) => {
      console.log('me', user);
    });
    this.sdk.ready.then(() => {
      this.auth
        .checkPermission('muffin:post')
        .then((res) => {
          console.log('permission', res);
        })
        .catch((err) => {
          console.log('check permissino fail', err);
        });
      this.auth
        .checkPermission('musician:post')
        .then((res) => {
          console.log('permission', res);
        })
        .catch((err) => {
          console.log('check permissisfsfno fail', err);
        });
    });
  }

  log(event) {
    this.sdk.getAccount().then((user) => {
      console.log('me', user);
    });
  }
}
