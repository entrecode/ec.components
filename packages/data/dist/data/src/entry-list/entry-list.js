"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const resource_list_1 = require("../resource-list/resource-list");
/**
 * Extension of List for Datamanager Entries.
 */
class EntryList extends resource_list_1.ResourceList {
    /** The constructor will init the List and Pagination instances.
     * Make sure the config is already complete when initiating an EntryList instance. */
    constructor(model, config, sdk) {
        super(config, sdk);
        this.sdk = sdk;
        this.model = model;
        this.load();
    }
    /** Generates the filterOptions for loading the entries. Sets the _fields option. */
    getFilterOptions(config) {
        const _fields = Object.keys(this.config.fields)
            .filter((field) => this.config.fields[field].list !== false);
        return Object.assign(super.getFilterOptions(config), { _fields });
    }
    /** Overrides the SdkList load method. */
    load(config) {
        if (!this.model || !this.sdk) {
            return;
        }
        this.useConfig(config);
        const loading = this.sdk.api.entryList(this.model, this.getFilterOptions(this.config))
            .then((list) => {
            this.use(list);
        }).catch((err) => {
            this.error.next(err);
        });
        this.loading.next(loading);
    }
}
exports.EntryList = EntryList;
//# sourceMappingURL=entry-list.js.map