import { SdkService, ResourceConfig } from '@ec.components/data';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'ec-resource-select-demo',
    templateUrl: 'resource-select-demo.component.html'
})

export class ResourceSelectDemoComponent implements OnInit {
    multi;
    solo;
    datamanager;
    constructor(public sdk: SdkService, public resourceConfig: ResourceConfig) { }

    assetSelectConfig = {
        disableCreatePop: true, label: 'title',
        dropdownFields: {
            preview: this.resourceConfig.get('asset.fields.thumb'),
            title: this.resourceConfig.get('asset.fields.title'),
        }
    };

    ngOnInit() {
        this.sdk.ready
            .then(() => this.sdk.datamanager
                .resource('dataManager', '73538731-4ac3-4a1a-b3b5-e31d09e94d42'))
            .then(dm => this.datamanager = dm);
    }

    toggle(e) {
        console.log('toggle', e);
    }
}
