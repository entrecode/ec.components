import { Component } from '@angular/core';
import { AdminService, PublicService, SdkService } from '../../../packages/data/index';

@Component({
  selector: 'ec-auth-demo',
  templateUrl: './auth-demo.component.html',
})
export class AuthDemoComponent {
  private user: any;

  constructor(public sdk: SdkService, private pub: PublicService, private admin: AdminService) {
  }

  ngOnInit() {
  }
}
