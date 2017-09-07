"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const router_1 = require("@angular/router");
const sdk_service_1 = require("../sdk/sdk.service");
const loader_service_1 = require("@ec.components/ui/src/loader/loader.service");
const list_component_1 = require("@ec.components/ui/src/list/list.component");
const selection_1 = require("@ec.components/core/src/selection/selection");
const notifications_service_1 = require("@ec.components/ui/src/notifications/notifications.service");
const resource_list_1 = require("./resource-list");
/** The ResourceListComponent is an extension of ListComponent for SDK ListResources.
 * It is meant to be extended and overriden the createList method. See e.g. AssetListComponent. */
class ResourceListComponent extends list_component_1.ListComponent {
    /** The constructor will just call super of List*/
    constructor(loaderService, sdk, notificationService, route) {
        super();
        this.loaderService = loaderService;
        this.sdk = sdk;
        this.notificationService = notificationService;
        this.route = route;
        if (route) {
            route.queryParams.subscribe((query) => {
                this.config.query = Object.assign({}, query);
            });
        }
    }
    /** The method to create the list*/
    createList() {
        return new resource_list_1.ResourceList(this.config, this.sdk);
    }
    /** When changing the model or the config, the list config will be (re)generated, using the model's schema*/
    ngOnChanges() {
        Object.assign(this.config || {}, this.configInput || {});
        if (!this.sdk) {
            return;
        }
        Promise.resolve(this.createList())
            .then((list) => {
            if (!list) {
                return;
            }
            this.list = list;
            this.list.change$.subscribe((list) => {
                if (!this.selection && this.list.config && !this.list.config.disableSelection) {
                    this.selection = new selection_1.Selection([], this.list.config);
                }
                // console.log('changed list', this.list.config.filter);
                //TODO update route to reflect the filter settings
            });
            this.list.loading$.subscribe((promise) => {
                this.loaderService.wait(promise, this.loader);
            });
            this.list.error$.subscribe((err) => {
                this.notificationService.emit({
                    title: 'Fehler beim laden der Liste',
                    error: err
                });
            });
        });
    }
    /** This method will filter the list by a given property value and optional operator. */
    filter(property, value) {
        this.list.filter(property, value);
    }
    initFilterQuery(fieldFilter) {
        if (!this.config.query || !this.config.fields || !fieldFilter) {
            return;
        }
        Object.keys(this.config.query)
            .filter((property) => fieldFilter(property, this.config.query[property]))
            .map((property) => fieldFilter(property, this.config.query[property]))
            .filter((filter) => {
            return Object.keys(this.config.fields).indexOf(filter.property) !== -1;
        })
            .forEach((filter) => {
            this.config.filter = Object.assign(this.config.filter || {}, {
                [filter.property]: filter.value
            });
        });
    }
}
ResourceListComponent.decorators = [
    { type: core_1.Component, args: [{
                selector: 'ec-resource-list',
                templateUrl: '../../../ui/src/list/list.component.html'
            },] },
];
/** @nocollapse */
ResourceListComponent.ctorParameters = () => [
    { type: loader_service_1.LoaderService, },
    { type: sdk_service_1.SdkService, },
    { type: notifications_service_1.NotificationsService, },
    { type: router_1.ActivatedRoute, decorators: [{ type: core_1.Optional },] },
];
ResourceListComponent.propDecorators = {
    'solo': [{ type: core_1.Input },],
    'loader': [{ type: core_1.Input },],
};
exports.ResourceListComponent = ResourceListComponent;
//# sourceMappingURL=resource-list.component.js.map