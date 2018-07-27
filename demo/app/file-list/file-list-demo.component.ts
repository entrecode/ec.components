import DataManagerResource from 'ec.sdk/lib/resources/datamanager/DataManagerResource';
import PublicAPI from 'ec.sdk/lib/PublicAPI';
import { ResourceList } from '../../../packages/data/src/resource-list/resource-list';
import { SdkService } from '../../../packages/data/src/sdk/sdk.service';
import { Component, OnInit } from '@angular/core';
import Core from 'ec.sdk/lib/Core';
import { Item } from '../../../packages/core';
import Resource from 'ec.sdk/lib/resources/Resource';
import DMAssetResource from 'ec.sdk/lib/resources/publicAPI/DMAssetResource';
import AssetGroupResource from 'ec.sdk/lib/resources/datamanager/AssetGroupResource';

@Component({
    selector: 'ec-file-list-demo',
    templateUrl: 'file-list-demo.component.html'
})

export class FileListDemoComponent {
    public custom = true;
    api: PublicAPI;
    group: AssetGroupResource;
    datamanager: DataManagerResource;
    constructor(public sdk: SdkService) {
        this.sdk.ready.then(() => {
            this.sdk.datamanager.dataManager('f3e16924-7781-4f5d-ad67-66e99bb941c6')
                .then(dm => {
                    this.datamanager = dm;
                    return dm.getPublicAPI();
                }).then(api => this.api = api);
        })
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
