import { Component } from '@angular/core';
import { SdkService } from '../../../packages/data/index';
import { AuthService } from '../../../index';

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
      this.sdk.api.checkPermission('muffin:post').then((res) => {
        console.log('permission', res);
      }).catch((err) => {
        console.log('check permissino fail', err);
      })
    })
  }

  log(event) {
    this.sdk.api.me().then((user) => {
      console.log('me', user);
    })
  }
}
