import { Component } from '@angular/core';
import { mocked } from '../../mocks/data';

@Component({
  selector: 'ec-list-demo',
  template: `
    <h2>Simple List</h2>
    <a (click)="toggleSelectMode(treeList.list)">toggle select mode</a> |
    <a (click)="toggleColumnFilter(treeList.list)">toggle column filter</a>
    <ec-list
      class="ec-list-card"
      [list]="mocked.lists.trees"
      #treeList
      [solo]="true"
      [paginationConfig]="paginationConfig"
    ></ec-list>
    <pre class="demo-code"><code>{{ treeList.list.config | json }}</code></pre>
  `,
})
export class ListDemoComponent {
  public mocked = mocked;
  public paginationConfig = {
    hideFirstLast: true,
    sizes: [3, 10],
  };
  constructor() {}

  log(wort) {
    console.log('log', wort);
  }
  select(item) {
    console.log('select', item);
  }

  toggleColumnFilter(list) {
    list.config.disableColumnFilter = !list.config.disableColumnFilter;
  }
  toggleSelectMode(list) {
    list.config.selectMode = !list.config.selectMode;
  }
}
