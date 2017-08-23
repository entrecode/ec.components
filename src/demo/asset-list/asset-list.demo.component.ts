import { Component } from '@angular/core';

@Component({
  template: `
<h2>Asset List</h2>
  <ec-loader #listLoader class="blend"></ec-loader>
  <ec-notifications class="toast"></ec-notifications>
<ec-asset-list [loader]="listLoader" [config]="{size:9}" #assetList></ec-asset-list>
`
})
export class AssetListDemoComponent {
  constructor() {
  }
}
