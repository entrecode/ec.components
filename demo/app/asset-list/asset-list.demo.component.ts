import { Component } from '@angular/core';
import { SdkService } from '@ec.components/data';
import DataManagerResource from 'ec.sdk/lib/resources/datamanager/DataManagerResource';

@Component({
  templateUrl: './asset-list-demo.component.html'
})
export class AssetListDemoComponent {
  api: DataManagerResource;
  constructor(public sdk: SdkService) {
    this.sdk.ready.then(() => {
      return this.sdk.datamanager.dataManager(this.sdk.api.dataManagerID);
    }).then(dm => this.api = dm);
  }
}
