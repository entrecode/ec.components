import { Component } from '@angular/core';

@Component({
  template: `
<h2>Asset List</h2>
<ec-asset-list [config]="{size:9}" #assetList></ec-asset-list>
`
})
export class AssetListDemoComponent {
  constructor() {
  }
}
