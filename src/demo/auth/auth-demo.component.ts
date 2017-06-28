import { Component } from '@angular/core';
import { ApiService } from '../../packages/data/api/api.service';

@Component({
  selector: 'ec-auth-demo',
  templateUrl: './auth-demo.component.html',
})
export class AuthDemoComponent {
  private user: any;

  constructor(private dm: ApiService) {
    /*this.dm.api.me().then((user) => {
      this.user = user;
    });*/
  }

  ngOnInit() {
    this.user = this.dm.api.me();
  }

  logout() {
    this.dm.logout().then((res) => {
      console.log('logout res', res);
    });
  }
}
