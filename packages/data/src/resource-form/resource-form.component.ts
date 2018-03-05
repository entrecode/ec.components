import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormComponent, LoaderService, NotificationsService, FormService, LoaderComponent } from '@ec.components/ui';
import Core from 'ec.sdk/lib/Core';
import { resourceConfig } from '../resource-config/resource-config';
import { OnChanges } from '@angular/core/src/metadata/lifecycle_hooks';
import { Item, FormConfig, Form } from '@ec.components/core';
import Resource from 'ec.sdk/lib/resources/Resource';
import { ResourceForm } from './resource-form';
import { SymbolService } from '../../../ui/src/symbol/symbol.service';

/** ResourceFormComponent can be used to edit or create any [SDK Resource](https://entrecode.github.io/ec.sdk/#resource).
 * The form needs the [api](https://entrecode.github.io/ec.sdk/#core) and the relation name.
 * If you pass a resource the form will edit that resource.
 * The default config comes from resource-config.ts.
 *
 * Example:
 *
 * ```js
 * this.datamanager = new DataManager('live'); // api connector (children of Core)
 * ```
 *
 * ```html
 * <ec-resource-form api="datamanager" relation="dataManager"></ec-resource-form>
 * ```
 *
 * The above snippets will render a form to create a datamanager. After the datamanager has been created, the form will switch to edit mode.
 * If you directly want to edit a given resource, just pass it through the resource input:
 *
 * ```html
 * <ec-resource-form api="datamanager" relation="dataManager" [resource]="myDatamanager"></ec-resource-form>
 * ```
 * ```js
 * this.sdk.datamanager.dataManager(shortID).then(dm=>this.myDatamanager = dm);
 * ```
 *
 */
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
    /** This output fires when the resource has been deleted using deleteResource(). */
    @Output() deleted: EventEmitter<any> = new EventEmitter();

    /** Injects services and calls super constructor. */
    constructor(protected loaderService: LoaderService,
        protected notificationService: NotificationsService,
        protected formService: FormService,
        protected symbol: SymbolService) {
        super(loaderService, notificationService, formService, symbol);
    }
    /** Inits config */
    ngOnInit() {
        this.initConfig();
    }
    /** Reinits config */
    ngOnChanges(changes?) {
        this.initConfig();
    }
    /** Merges current config default config and config input  */
    initConfig() {
        this.config = Object.assign(
            {}, this.config || {}, resourceConfig[this.relation] || {}, this.configInput || {}
        );
        this.init();
    }
    /** Inits the form with optional item and config params. If an item is present, the form will edit it.  */
    protected init(item: Item<Resource> = this.item, config: FormConfig<Resource> = this.config) {
        if (!this.relation || (!this.api && !this.value)) {
            return;
        }
        if (this.value) { // if value is set, create item from value only
            this.form = new ResourceForm(this.value, config, this.api, this.relation);
        } else if (item instanceof Item) {
            this.form = new ResourceForm(item.getBody(), item.getConfig() || config || {}, this.api, this.relation);
        } else if (config) {
            this.form = new ResourceForm(null, config, this.api, this.relation);
        }
        this.initGroup();
    }

    /** Yields true if the current edited resiource is already existing in the backend. */
    isEditing() {
        if (!this.form) {
            return;
        }
        const entry = this.form.getBody();
        return entry && entry.save;
    }

    /** Deletes the edited entry. Fires the deleted Output. */
    deleteResource() {
        if (!this.form || !this.isEditing()) {
            return;
        }
        console.log('would now delete');
        /* const deletion = this.crud.del(this.model, this.form.getBody()).then(() => {
            this.deleted.emit();
            this.create();
            this.notificationService.emit({
                title: this.symbol.resolve('success.delete'), type: 'success'
            });
        }).catch((error) => {
            this.notificationService.emit({
                title: this.symbol.resolve('error.delete'), error
            });
        });

        this.loaderService.wait(deletion, this.loader);
        return deletion; */
    }
}
