"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const resource_list_1 = require("../../resource-list/resource-list");
/**
 * Extension of List for Datamanager Assets.
 */
class AssetList extends resource_list_1.ResourceList {
    constructor(config, sdk, fileService) {
        super(Object.assign(config, fileService.assetListConfig), sdk);
        this.sdk = sdk;
        this.fileService = fileService;
    }
    /** Overrides the List load method. Instead of slicing the page out of all items, a datamanager request is made using the config.*/
    load(config) {
        if (!this.sdk) {
            return;
        }
        this.useConfig(config);
        const loading = this.sdk.api.assetList(this.getFilterOptions(this.config))
            .then((list) => {
            this.use(list);
        }).catch((err) => {
            this.error.next(err);
        });
        this.loading.next(loading);
        return loading;
    }
}
exports.AssetList = AssetList;
//# sourceMappingURL=asset-list.js.map