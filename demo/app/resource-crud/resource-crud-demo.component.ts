import { Component, ViewChild } from '@angular/core';
import { SdkService } from '../../../packages/data';

@Component({
    selector: 'ec-resource-crud-demo',
    templateUrl: './resource-crud-demo.component.html',
})
export class ResourceCrudDemoComponent {
    crudConfig = {
        selectMode: false,
        methods: ['get', 'put']
    }
    constructor(public sdk: SdkService) {
    }
}
