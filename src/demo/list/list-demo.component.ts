import { Component } from '@angular/core';
import { mocked } from '../../mocks/data';
import { songs } from '../../assets/songs';

@Component({
  selector: 'ec-list-demo',
  templateUrl: './list-demo.component.html',
})
export class ListDemoComponent {
  private mocked = mocked;
  private songs = mocked.lists.songs;
  private songArray = songs.songs;

  constructor() {
  }

  log(wort) {
    console.log('log', wort);
  }
}
