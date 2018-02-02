import { Component, OnInit, Input } from '@angular/core';
import { FormComponent, LoaderService, NotificationsService, FormService, LoaderComponent } from '@ec.components/ui';
import Core from 'ec.sdk/lib/Core';
import { resourceConfig } from '../resource-config/resource-config';
import { OnChanges } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
    selector: 'ec-resource-form',
    templateUrl: '../../../ui/src/form/form.component.html'
})

export class ResourceFormComponent extends FormComponent implements OnInit, OnChanges {
    /** The API Connector that possesses the resource list, see https://entrecode.github.io/ec.sdk/#api-connectors */
    @Input() api: Core; // sdk api connector
    /** The name of the resource. If given, the generic ListResource loading will be used (api.resourceList) */
    @Input() relation: string;
    /** The loader that should be shown while the list is loaded. */
    @Input() loader: LoaderComponent;
    constructor(protected loaderService: LoaderService,
        protected notificationService: NotificationsService,
        protected formService: FormService) {
        super(loaderService, notificationService, formService);
    }

    ngOnInit() {
        this.initConfig();
    }
    ngOnChanges() {
        this.initConfig();
    }

    initConfig() {
        if (!this.relation || !this.api) {
            console.log('no relation or api');
            return;
            // return Promise.reject(`cannot create ResourceList: no relation or api given. Relation: ${this.relation} API: ${this.api}`);
        }
        this.config = Object.assign(
            {},
            resourceConfig[this.relation] || {},
            this.config || {}
        );
        super.init();
    }
}
