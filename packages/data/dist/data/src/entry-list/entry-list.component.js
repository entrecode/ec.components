"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const router_1 = require("@angular/router");
const sdk_service_1 = require("../sdk/sdk.service");
const model_config_service_1 = require("../model-config/model-config.service");
const loader_service_1 = require("@ec.components/ui/src/loader/loader.service");
const entry_list_1 = require("./entry-list");
const crud_service_1 = require("../crud/crud.service");
const notifications_service_1 = require("@ec.components/ui/src/notifications/notifications.service");
const resource_list_component_1 = require("../resource-list/resource-list.component");
/** The EntryListComponent is a thin holder of an EntryList instance. It extends the ListComponent */
class EntryListComponent extends resource_list_component_1.ResourceListComponent {
    /** The constructor will just call super of List*/
    constructor(loaderService, sdk, notificationService, modelConfig, crud, route) {
        super(loaderService, sdk, notificationService, route);
        this.loaderService = loaderService;
        this.sdk = sdk;
        this.notificationService = notificationService;
        this.modelConfig = modelConfig;
        this.crud = crud;
        this.route = route;
        /*if (route) {
          route.params.subscribe(({ model }) => {
            if (model) {
              this.model = model;
            }
          })
        }*/
    }
    initFilter() {
        this.initFilterQuery((property, value) => {
            const target = property.split('.');
            const field = this.config.fields[target[1]];
            if (target[0] === this.model && field) {
                return {
                    property: target[1],
                    value: field.queryFilter ? field.queryFilter(value) : value
                };
            }
        });
    }
    createList() {
        if (!this.model || !this.config) {
            return;
        }
        this.crud.change({ model: this.model }) // , type: 'create'
            .subscribe((update) => {
            this.list.load();
        });
        return this.modelConfig.generateConfig(this.model)
            .then((config) => {
            this.config = Object.assign(this.config || {}, config);
            this.initFilter();
            return new entry_list_1.EntryList(this.model, this.config, this.sdk);
        });
    }
}
EntryListComponent.decorators = [
    { type: core_1.Component, args: [{
                selector: 'ec-entry-list',
                template: require('../../../ui/src/list/list.component.html'),
                styles: [require('./entry-list.component.scss')]
            },] },
];
/** @nocollapse */
EntryListComponent.ctorParameters = () => [
    { type: loader_service_1.LoaderService, },
    { type: sdk_service_1.SdkService, },
    { type: notifications_service_1.NotificationsService, },
    { type: model_config_service_1.ModelConfigService, },
    { type: crud_service_1.CrudService, },
    { type: router_1.ActivatedRoute, decorators: [{ type: core_1.Optional },] },
];
EntryListComponent.propDecorators = {
    'model': [{ type: core_1.Input },],
};
exports.EntryListComponent = EntryListComponent;
//# sourceMappingURL=entry-list.component.js.map