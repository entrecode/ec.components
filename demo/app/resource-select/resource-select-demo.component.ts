import { SdkService } from './../../../packages/data/src/sdk/sdk.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'ec-resource-select-demo',
    templateUrl: 'resource-select-demo.component.html'
})

export class ResourceSelectDemoComponent implements OnInit {
    multi;
    solo;
    constructor(public sdk: SdkService) { }

    ngOnInit() { }
}
