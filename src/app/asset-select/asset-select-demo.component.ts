import { Component } from '@angular/core';

@Component({
  templateUrl: 'asset-select-demo.component.html',
})
export class AssetSelectDemoComponent {
  selectedNewAsset: string;
  selectedAssets: string[];
  selectedAsset: string;
  selectedNewAssets: string[];
  solo = false;

  constructor() {}
}
