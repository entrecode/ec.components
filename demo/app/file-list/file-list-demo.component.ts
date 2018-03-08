import { SdkService } from './../../../packages/data/src/sdk/sdk.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'ec-file-list-demo',
    templateUrl: 'file-list-demo.component.html'
})

export class FileListDemoComponent implements OnInit {
    group: any;
    datamanager: any;
    constructor(public sdk: SdkService) {
        this.sdk.ready.then(() => {
            this.sdk.datamanager.dataManager('f3e16924-7781-4f5d-ad67-66e99bb941c6')
                .then(dm => this.datamanager = dm);
        })
    }

    ngOnInit() { }

    select(assetGroup) {
        console.log('assetGrpiü', assetGroup);
        this.group = assetGroup.getBody();
    }

    upload() {
        console.log('upload!');
    }
}
