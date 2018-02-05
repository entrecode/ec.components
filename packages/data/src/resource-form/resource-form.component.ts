import { Component, OnInit, Input } from '@angular/core';
import { FormComponent, LoaderService, NotificationsService, FormService, LoaderComponent } from '@ec.components/ui';
import Core from 'ec.sdk/lib/Core';
import { resourceConfig } from '../resource-config/resource-config';
import { OnChanges } from '@angular/core/src/metadata/lifecycle_hooks';
import { Item, FormConfig, Form } from '@ec.components/core';
import Resource from 'ec.sdk/lib/resources/Resource';
import { ResourceForm } from './resource-form';

@Component({
    selector: 'ec-resource-form',
    templateUrl: '../../../ui/src/form/form.component.html'
})

export class ResourceFormComponent extends FormComponent<Resource> implements OnInit, OnChanges {
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
    ngOnChanges(changes?) {
        this.initConfig();
    }

    initConfig() {
        this.config = Object.assign(
            {}, this.config || {}, resourceConfig[this.relation] || {}, this.configInput || {}
        );
        this.init();
    }

    protected init(item: Item<Resource> = this.item, config: FormConfig<Resource> = this.config) {
        if (!this.relation || (!this.api && !this.value)) {
            return;
        }
        this.form = new ResourceForm(item ? item.getBody() : this.value || null, this.config, this.api, this.relation);
        this.initGroup();
    }
}
