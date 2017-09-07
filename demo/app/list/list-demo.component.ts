import { Component } from '@angular/core';
import { mocked } from '../../../mocks/data';
import { songs } from '../../assets/songs';

@Component({
  selector: 'ec-list-demo',
  template: `
<h2>Simple List</h2>
<ec-list class="ec-list-card" [list]="mocked.lists.trees" #treeList [solo]="true"></ec-list>
<pre>
  {{treeList.list.config | json}}
</pre>

<h2>Templated List</h2>
<ec-list [list]="songs" [solo]="true" #songList class="ec-list_dense ec-list_multiline"></ec-list>
<pre>
  {{songList.list.config | json}}
</pre>
  `,
})
export class ListDemoComponent {
  public mocked = mocked;
  public songs = mocked.lists.songs;
  private songArray = songs.songs;

  constructor() {
  }

  log(wort) {
    console.log('log', wort);
  }
}
