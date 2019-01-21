import { Component, OnInit } from '@angular/core';
import { SdkService } from '@ec.components/data';

@Component({
    selector: 'ec-resource-form-demo',
    templateUrl: 'resource-form-demo.component.html'
})

export class ResourceFormDemoComponent implements OnInit {
    constructor(public sdk: SdkService) {

    }

    ngOnInit() { }
}
