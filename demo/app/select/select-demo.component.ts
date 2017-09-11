import { Component } from '@angular/core';

import { songs } from '../../assets/songs';
import { mocked } from '../../../mocks/data';

@Component({
  selector: 'ec-select-demo',
  templateUrl: './select-demo.component.html',
})
export class SelectDemoComponent {

  songs = songs.songs;
  products = mocked.products;
  productConfig = {
    identifier: 'id',
    label: 'name'
  };

  constructor() {
  }

  log(x) {
    console.log(x)
  }
}
