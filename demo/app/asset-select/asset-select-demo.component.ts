import { Component } from '@angular/core';

@Component({
  templateUrl: 'asset-select-demo.component.html',
})
export class AssetSelectDemoComponent {
  selectedAssets: string[];
  selectedNewAssets: string[];

  constructor() {
    /* this.selectedAssets = ['3513d75d-ac3e-4758-8a03-b354e41af417']; */
    this.selectedAssets = ['fa2ceaf7-fe12-4130-bb31-77258df35c85'];
    /* this.selectedNewAssets = ['3bFEKhlTRj-VA4LOtY7D1w']; */
    this.selectedNewAssets = ['3bFEKhlTRj-VA4LOtY7D1w'];
  }
}
