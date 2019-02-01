import { Component, OnInit } from '@angular/core';
import { SdkService, ResourceConfig } from '@ec.components/data';

@Component({
    selector: 'ec-resource-form-demo',
    templateUrl: 'resource-form-demo.component.html'
})

export class ResourceFormDemoComponent implements OnInit {
    constructor(public sdk: SdkService, public resourceConfig: ResourceConfig) {
        this.resourceConfig.set('dataManager', {
            fields: {
                ...this.resourceConfig.get('dataManager').fields,
                test: {
                    label: 'Test Field (added via resourceConfig.set)'
                },
            }
        });
        console.log('datamanager config', this.resourceConfig.get('dataManager'));
    }

    ngOnInit() { }
}
