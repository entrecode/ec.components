"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by felix on 26.05.17.
 */
const core_1 = require("@angular/core");
const router_1 = require("@angular/router");
const entry_form_component_1 = require("../entry-form/entry-form.component");
const entry_list_component_1 = require("../entry-list/entry-list.component");
const pop_component_1 = require("@ec.components/ui/src/pop/pop.component");
const sdk_service_1 = require("../sdk/sdk.service");
const item_1 = require("@ec.components/core/src/item/item");
const loader_service_1 = require("@ec.components/ui/src/loader/loader.service");
const notifications_service_1 = require("@ec.components/ui/src/notifications/notifications.service");
require("rxjs/add/operator/switchMap");
const rxjs_1 = require("rxjs");
/** The CrudComponent takes at least a model name to render an entry list with create/edit/delete functionality out of the box.
 * ```html
 * <ec-crud model="muffin"></ec-crud>
 * ```
 * */
class CrudComponent {
    constructor(sdk, loaderService, notificationService, router, route) {
        this.sdk = sdk;
        this.loaderService = loaderService;
        this.notificationService = notificationService;
        this.router = router;
        this.route = route;
        /** CrudConfig for customization of the crud's UI.*/
        this.config = {};
        /** Emits when a list element is clicked */
        this.select = new core_1.EventEmitter();
        /** Emits when the selection has changed */
        this.selected = new core_1.EventEmitter();
        if (route) {
            rxjs_1.Observable.merge(route.data, route.params, route.queryParams)
                .subscribe(({ model }) => {
                if (model) {
                    this.model = model;
                }
            });
        }
    }
    /** Logs the current form (Developer help). */
    log(form) {
        console.dir(form);
    }
    /** Returns true if the given method is part of the methods array (or if there is no methods array) */
    hasMethod(method) {
        return !this.config.methods || this.config.methods.indexOf(method) !== -1;
    }
    /** Determines if the current form can be saved, based on the allowed method (edit/update). */
    maySave(form) {
        const edit = form.isEditing();
        return (!edit && this.hasMethod('create')) || (edit && this.hasMethod('update'));
    }
    /** Returns true if the visible fields in the list differ from the visible fields in the form*/
    mustReload(item) {
        return !Object.keys(item.config.fields).reduce((equal, property) => {
            return equal && (item.config.fields[property].list !== false || item.config.fields[property].form === false);
        }, true);
    }
    /** Loads the clicked entry item, depending on the configured levels. Reloads the entry if the form has fields the which list has not. */
    loadEntry(item) {
        return Promise.resolve().then(() => {
            if (!this.config.alwaysLoadEntry && !this.mustReload(item) && (!this.config.levels || this.config.levels === 1)) {
                return item;
            }
            return this.sdk.api.entry(this.model, item.id(), { levels: this.config.levels || 1 })
                .then((leveledEntry) => {
                return new item_1.Item(leveledEntry, item.config);
            });
        }).then((loadedEntry) => {
            this.form.edit(loadedEntry);
            this.pop.show();
        }).catch((err) => {
            console.log('err', err);
            this.notificationService.emit({
                title: 'Fehler beim Laden',
                error: err
            });
        });
    }
    /** Is called when an item in the list is clicked. */
    selectEntry(item, form) {
        if (!item) {
            return;
        }
        if (this.select.observers.length) {
            this.select.emit(item);
            return;
        }
        this.loaderService.wait(this.loadEntry(item), this.loader);
    }
    /** Returns the pop class that should be used, either uses config.popClass or defaults to sidebar-left. */
    getPopClass() {
        return this.config && this.config.popClass ? this.config.popClass : 'sidebar-left';
    }
}
CrudComponent.decorators = [
    { type: core_1.Component, args: [{
                selector: 'ec-crud',
                templateUrl: './crud.component.html',
                styleUrls: ['./crud.component.scss']
            },] },
];
/** @nocollapse */
CrudComponent.ctorParameters = () => [
    { type: sdk_service_1.SdkService, },
    { type: loader_service_1.LoaderService, },
    { type: notifications_service_1.NotificationsService, },
    { type: router_1.Router, decorators: [{ type: core_1.Optional },] },
    { type: router_1.ActivatedRoute, decorators: [{ type: core_1.Optional },] },
];
CrudComponent.propDecorators = {
    'model': [{ type: core_1.Input },],
    'config': [{ type: core_1.Input },],
    'form': [{ type: core_1.ViewChild, args: [entry_form_component_1.EntryFormComponent,] },],
    'list': [{ type: core_1.ViewChild, args: [entry_list_component_1.EntryListComponent,] },],
    'pop': [{ type: core_1.ViewChild, args: [pop_component_1.PopComponent,] },],
    'loader': [{ type: core_1.ViewChild, args: ['listLoader',] },],
    'select': [{ type: core_1.Output },],
    'selected': [{ type: core_1.Output },],
};
exports.CrudComponent = CrudComponent;
//# sourceMappingURL=crud.component.js.map