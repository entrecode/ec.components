import { Component } from '@angular/core';

@Component({
  selector: 'ec-crud-demo',
  templateUrl: './crud-demo.component.html',
})
export class CrudDemoComponent {
  constructor() {
  }

  log(entry) {
    console.log('select', entry);
  }
}
