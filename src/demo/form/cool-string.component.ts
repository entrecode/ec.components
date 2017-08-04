import { Component } from '@angular/core';

@Component({
  selector: 'ec-cool-string',
  templateUrl: './cool-string.component.html',
})
export class CoolStringComponent {

  constructor() {
  }

  ngOnChanges() {
    console.log('changed', this);
  }
}
