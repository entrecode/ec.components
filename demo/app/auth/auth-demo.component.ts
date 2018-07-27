import { Component } from '@angular/core';
import { SdkService, AuthService } from '../../../packages/data';

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
      console.log('ready...');
      this.auth.checkPermission('muffin:post').then((res) => {
        console.log('permission', res);
      }).catch((err) => {
        console.log('check permissino fail', err);
      })
    })
  }

  log(event) {
    this.sdk.getAccount().then((user) => {
      console.log('me', user);
    })
  }
}
