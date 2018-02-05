import { Component, OnInit, Input } from '@angular/core';
import { FormComponent, LoaderService, NotificationsService, FormService, LoaderComponent } from '@ec.components/ui';
import Core from 'ec.sdk/lib/Core';
import { resourceConfig } from '../resource-config/resource-config';
import { OnChanges } from '@angular/core/src/metadata/lifecycle_hooks';
import { Item, FormConfig } from '@ec.components/core';
import Resource from 'ec.sdk/lib/resources/Resource';

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
    ngOnChanges(changes?) {
        this.initConfig();
    }

    saveResource(resource, relation, api) {
        if (this.configInput && this.configInput.onSave) {
            console.warn(`setting custom onSave callback on resources is currently not implemented!
            It is overwritten by the default Resource save method.`);
        }
        return (form, value) => {
            const body = form.getBody(); // Resource
            /* form.deleteImmutableProperties(body); */
            // TODO: find out why it does not work when using helper properties (like thumb in asset form)
            form.serialize(value);
            if ('save' in body) {
                Object.assign(body, value);
                return body.save();
            } else {
                return api.create(relation, value).then(created => {
                    return created;
                });
            }
        }
    }

    initConfig() {
        this.init();
    }

    protected init(item: Item<any> = this.item, config: FormConfig<any> = this.config) {
        if (!this.relation || (!this.api && !this.value)) {
            /* console.log('no relation or api/value given', this); */
            return;
        }
        this.config = Object.assign(
            {},
            this.config || {},
            resourceConfig[this.relation] || {},
            this.configInput || {},
            {
                onSave: this.saveResource(this.value, this.relation, this.api)
            }
        );
        super.init();
    }
}
