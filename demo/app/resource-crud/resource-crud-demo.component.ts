import { Component, ViewChild } from '@angular/core';
import { SdkService } from '@ec.components/data';

@Component({
    selector: 'ec-resource-crud-demo',
    templateUrl: './resource-crud-demo.component.html',
})
export class ResourceCrudDemoComponent {
    crudConfig = {
        selectMode: false,
        methods: ['get', 'put'] /** , 'post', 'delete' */
    }
    constructor(public sdk: SdkService) {
    }
}
