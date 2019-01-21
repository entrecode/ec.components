import { Component, ViewChild } from '@angular/core';
import { SdkService } from '@ec.components/data';
import { ResourceListPopComponent } from '@ec.components/data';
import Core from 'ec.sdk/lib/Core';

@Component({
    templateUrl: './resource-list-pop-demo.component.html'
})

export class ResourceListPopDemoComponent {
    @ViewChild(ResourceListPopComponent) resourceListPop: ResourceListPopComponent;
    apis: Core[] = [];
    relations: string[] = [];
    api: Core;
    selectedRelation: string;
    availableRelations: string[] = [];

    constructor(public sdk: SdkService) {
        this.sdk.ready.then(() => {
            this.selectApi(this.sdk.datamanager);
        });
    }

    selectApi(api: Core) {
        this.resourceListPop.hide();
        this.apis.unshift(api);
        this.api = this.apis[0];
        this.availableRelations = Object.keys(this.api.getAvailableRelations());
    }

    selectRelation(relation: string) {
        this.relations.unshift(relation);
        this.selectedRelation = this.relations[0];
        this.resourceListPop.show();
        console.log('selected relation', relation);
    }

    goBack() {
        this.apis.shift();
        this.relations.shift();
        this.api = this.apis[0];
        this.selectedRelation = this.relations[0];
        this.availableRelations = Object.keys(this.api.getAvailableRelations());
    }
}
