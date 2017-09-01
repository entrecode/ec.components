import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  template: '<h1>Works!</h1>'
})
export class EditorComponent {
  constructor(private router: Router) {
    console.log('router', this.router);
  }
}