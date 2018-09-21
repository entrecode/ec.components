import { Component, OnInit } from '@angular/core';
import { SdkService } from '@ec.components/data/src/sdk/sdk.service';

@Component({
    selector: 'ec-resource-form-demo',
    templateUrl: 'resource-form-demo.component.html'
})

export class ResourceFormDemoComponent implements OnInit {
    constructor(public sdk: SdkService) {

    }

    ngOnInit() { }
}
