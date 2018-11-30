import { SdkService } from '@ec.components/data/src/sdk/sdk.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'ec-resource-select-demo',
    templateUrl: 'resource-select-demo.component.html'
})

export class ResourceSelectDemoComponent implements OnInit {
    multi;
    solo;
    datamanager;
    constructor(public sdk: SdkService) { }

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
