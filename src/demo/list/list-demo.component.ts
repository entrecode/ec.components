import { Component } from '@angular/core';
import { mocked } from '../../mocks/data';

@Component({
  selector: 'ec-list-demo',
  templateUrl: './list-demo.component.html',
})
export class ListDemoComponent {
  private mocked = mocked;
  private songs = mocked.lists.songs;
}
