import { Component } from '@angular/core';

@Component({
  templateUrl: 'asset-select-demo.component.html',
})
export class AssetSelectDemoComponent {
  selectedAssets: string[];
  selectedNewAssets: string[];

  constructor() {
    this.selectedAssets = ['3513d75d-ac3e-4758-8a03-b354e41af417'];
    this.selectedNewAssets = [];
  }
}
