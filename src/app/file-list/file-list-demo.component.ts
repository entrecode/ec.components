import DataManagerResource from 'ec.sdk/lib/resources/datamanager/DataManagerResource';
import PublicAPI from 'ec.sdk/lib/PublicAPI';
import { SdkService } from '@ec.components/data';
import { Component } from '@angular/core';
import { Item } from '@ec.components/core';
import AssetGroupResource from 'ec.sdk/lib/resources/datamanager/AssetGroupResource';

@Component({
  selector: 'ec-file-list-demo',
  templateUrl: 'file-list-demo.component.html',
})
export class FileListDemoComponent {
  public custom = true;
  api: PublicAPI;
  group: AssetGroupResource;
  datamanager: DataManagerResource;
  constructor(public sdk: SdkService) {
    this.sdk.ready.then(() => {
      this.sdk.datamanager
        .dataManager('73538731-4ac3-4a1a-b3b5-e31d09e94d42')
        .then((dm) => {
          this.datamanager = dm;
          return dm.getPublicAPI();
        })
        .then((api) => (this.api = api));
    });
  }

  selected(selection) {
    if (selection.items.length) {
      this.select(selection.items[0]);
    }
  }

  select(assetGroup: Item<AssetGroupResource>) {
    const group = assetGroup.getBody();
    if (this.group && group.assetGroupID === this.group.assetGroupID) {
      return;
    }
    this.group = group;
  }

  upload() {
    console.log('upload!');
  }

  delete(asset) {
    console.log('delete', asset);
  }
}
