import { Component } from '@angular/core';

@Component({
  template: `
  <h2>Asset List</h2>
  <ec-loader #listLoader class="blend"></ec-loader>
  <ec-notifications class="toast"></ec-notifications>
  <ec-asset-list [loader]="listLoader" [config]="{size:9}" (select)="assetForm.edit($event);assetPop.show()" #assetList></ec-asset-list>  
  <ec-pop class="sidebar-right" #assetPop>
    <button type="button" (click)="assetPop.hide()">
      <i class="ec-icon close"></i>
    </button>
    <ec-form [config]="assetList.list?.config" #assetForm></ec-form>  
  </ec-pop>
  
`
})
export class AssetListDemoComponent {
  constructor() {
  }
}
