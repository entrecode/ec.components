"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const router_1 = require("@angular/router");
const asset_list_1 = require("./asset-list");
const resource_list_component_1 = require("../../resource-list/resource-list.component");
const file_service_1 = require("../file.service");
const loader_service_1 = require("@ec.components/ui/src/loader/loader.service");
const notifications_service_1 = require("@ec.components/ui/src/notifications/notifications.service");
const sdk_service_1 = require("../../sdk/sdk.service");
/** The EntryListComponent is a thin holder of an EntryList instance. It extends the ListComponent */
class AssetListComponent extends resource_list_component_1.ResourceListComponent {
    constructor(loaderService, sdk, notificationService, fileService, route) {
        super(loaderService, sdk, notificationService, route);
        this.loaderService = loaderService;
        this.sdk = sdk;
        this.notificationService = notificationService;
        this.fileService = fileService;
        this.fileService.uploads.subscribe((upload) => {
            this.list.load();
        });
    }
    createList() {
        return new asset_list_1.AssetList(this.config, this.sdk, this.fileService);
    }
}
AssetListComponent.decorators = [
    { type: core_1.Component, args: [{
                selector: 'ec-asset-list',
                templateUrl: '../../../../ui/src/list/list.component.html'
            },] },
];
/** @nocollapse */
AssetListComponent.ctorParameters = () => [
    { type: loader_service_1.LoaderService, },
    { type: sdk_service_1.SdkService, },
    { type: notifications_service_1.NotificationsService, },
    { type: file_service_1.FileService, },
    { type: router_1.ActivatedRoute, decorators: [{ type: core_1.Optional },] },
];
exports.AssetListComponent = AssetListComponent;
//# sourceMappingURL=asset-list.component.js.map