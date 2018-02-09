/**
 * Created by felix on 26.05.17.
 */
import { Component, EventEmitter, Input, OnInit, Optional, Output, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SdkService } from '../sdk/sdk.service';
import { Selection } from '@ec.components/core/src/selection/selection';
import { LoaderComponent } from '@ec.components/ui/src/loader/loader.component';
import { LoaderService } from '@ec.components/ui/src/loader/loader.service';
import { NotificationsService } from '@ec.components/ui/src/notifications/notifications.service';
import 'rxjs/add/operator/switchMap';
import { merge } from 'rxjs/observable/merge';
import { AuthService } from '../auth/auth.service';
import { WithLoader } from '@ec.components/ui';
import { CrudConfig } from '../crud/crud-config.interface';
import { ResourceListComponent } from '../resource-list/resource-list.component';
import { ResourcePopComponent } from '../resource-pop/resource-pop.component';
import Core from 'ec.sdk/lib/Core';
import { ResourceFormComponent } from '../resource-form/resource-form.component';

/** The ResourceCrudComponent takes a relation name and api to render a resource list with create/edit/delete functionality out of the box.
 * ```html
 * <ec-resource-crud [api]="sdk.datamanager" relation="dataManager"></ec-resource-crud>
 * ```
 * */
@Component({
    selector: 'ec-resource-crud',
    templateUrl: './resource-crud.component.html',
    styleUrls: ['./resource-crud.component.scss']
})
export class ResourceCrudComponent<T> implements OnInit, WithLoader {
    /** The API Connector that possesses the resource list, see https://entrecode.github.io/ec.sdk/#api-connectors */
    @Input() api: Core; // sdk api connector
    /** The name of the resource. If given, the generic ListResource loading will be used (api.resourceList) */
    @Input() relation: string;
    /** CrudConfig for customization of the crud's UI.*/
    @Input() config: CrudConfig<T> = {};
    /** The selection that should be used */
    @Input() selection: Selection<T>;
    /** The ResourceListComponent inside the template. */
    @ViewChild(ResourceListComponent) list: ResourceListComponent;
    /** The Pop inside the template. */
    @ViewChild(ResourcePopComponent) pop: ResourcePopComponent;
    /** The lists loader */
    @ViewChild(LoaderComponent) loader: LoaderComponent;
    /** Emits when a list element is clicked */
    @Output() columnClicked: EventEmitter<any> = new EventEmitter();
    /** Emits when the selection has changed */
    @Output() selected: EventEmitter<any> = new EventEmitter();

    constructor(private sdk: SdkService,
        private auth: AuthService,
        private loaderService: LoaderService,
        private notificationService: NotificationsService,
        @Optional() public router: Router,
        @Optional() public route: ActivatedRoute) {
        /* if (route) {
            merge(route.data, route.params, route.queryParams)
                .subscribe(({ model }) => {
                    if (model) {
                        this.model = model;
                    }
                });
        } */
    }

    ngOnInit() {
        this.initMethods();
    }

    initMethods() {
        if (!this.relation) {
            return;
        }
        this.auth.getAllowedResourceMethods(this.relation, {}, this.config.methods)
            .then((methods) => {
                this.config.methods = methods;
            });
    }

    /** Returns true if the given method is part of the methods array (or if there is no methods array) */
    public hasMethod(method: string) {
        return this.config.methods && this.config.methods.indexOf(method) !== -1;
    }

    /** Returns true if the visible fields in the list differ from the visible fields in the form*/
    public mustReload(item) {
        return !Object.keys(item.config.fields).reduce((equal, property) => {
            return equal && (item.config.fields[property].list !== false || item.config.fields[property].form === false);
        }, true);
    }

    select(item) {
        this.pop.edit(item.getBody());
    }
    /** Loads the clicked resource item, depending on the configured levels. Reloads the resource if the form has fields the which list has not. */

    /* private loadEntry(item) {
        return Promise.resolve().then(() => {
            if (!this.config.alwaysLoadEntry && !this.mustReload(item) && (!this.config.levels || this.config.levels === 1)) {
                return item.getBody();
            }
            return this.sdk.api.entry(this.model, item.id(), { levels: this.config.levels || 1 })
        }).then((loadedEntry) => {
            this.pop.edit(loadedEntry);
        }).catch((err) => {
            console.log('error while loading entry to edit', err);
            this.notificationService.emit({
                title: 'Fehler beim Laden',
                error: err
            })
        });
    } */

    /** Is called when an item in the list is clicked. */
    private selectEntry(item) {
        if (!item) {
            return;
        }
        if (this.columnClicked.observers.length) {
            this.columnClicked.emit(item);
            return;
        }
        this.loaderService.wait(this.loadEntry(item), this.loader);
    }

    /** Returns the pop class that should be used, either uses config.popClass or defaults to ec-pop_drawer-left. */
    getPopClass() {
        return this.config && this.config.popClass ? this.config.popClass : 'ec-pop_drawer-left';
    }
}
