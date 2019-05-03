import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ec-login-demo',
  template: `
    <h2>Login Form</h2>
    <ec-login-form></ec-login-form>
  `,
})
export class LoginDemoComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
