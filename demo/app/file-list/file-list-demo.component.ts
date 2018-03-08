import DataManagerResource from 'ec.sdk/lib/resources/datamanager/DataManagerResource';
import PublicAPI from 'ec.sdk/lib/PublicAPI';
import { ResourceList } from './../../../packages/data/src/resource-list/resource-list';
import { SdkService } from './../../../packages/data/src/sdk/sdk.service';
import { Component, OnInit } from '@angular/core';
import Core from 'ec.sdk/lib/Core';
import { Item } from '@ec.components/core';
import Resource from 'ec.sdk/lib/resources/Resource';

@Component({
    selector: 'ec-file-list-demo',
    templateUrl: 'file-list-demo.component.html'
})

export class FileListDemoComponent implements OnInit {
    api: PublicAPI;
    group: any;
    datamanager: DataManagerResource;
    constructor(public sdk: SdkService) {
        this.sdk.ready.then(() => {
            this.sdk.datamanager.dataManager('f3e16924-7781-4f5d-ad67-66e99bb941c6')
                .then(dm => {
                    console.log('dm', dm);
                    this.datamanager = dm;
                    return dm.getPublicAPI();
                }).then(api => {
                    console.log('api', api);
                    this.api = api;
                });
        })
    }

    ngOnInit() { }

    select(assetGroup: Item<Resource>) {
        const group = assetGroup.getBody();
        console.log('group', group);
        this.group = group;
    }

    upload() {
        console.log('upload!');
    }
}
