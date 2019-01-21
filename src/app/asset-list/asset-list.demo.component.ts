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
      this.sdk.api.resourceList('tags', {
        'tag~': {
          exact: 'es',
        }
      }).then((tags) => {
        console.log('hihi', tags);
      });
      return this.sdk.datamanager.dataManager(this.sdk.api.dataManagerID);
    }).then(dm => this.api = dm);
  }
}
