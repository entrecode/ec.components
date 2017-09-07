"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const resource_list_1 = require("../resource-list/resource-list");
const moment = require("moment");
const DataManagerResource_1 = require("ec.sdk/src/resources/datamanager/DataManagerResource");
/**
 * Extension of List for Datamanagers
 */
class DatamanagerList extends resource_list_1.ResourceList {
    constructor(config, sdk) {
        super(Object.assign(config, {
            identifier: 'datamanagerID',
            onSave: (item, value) => {
                const datamanager = item.getBody();
                item.serialize(value, datamanager instanceof DataManagerResource_1.default);
                Object.assign(datamanager, value);
                if (datamanager instanceof DataManagerResource_1.default) {
                    return datamanager.save();
                }
                return value; //TODO create
            },
            fields: {
                hexColor: {
                    label: '#',
                    view: 'color',
                    sortable: true
                },
                title: {
                    label: 'Name',
                    view: 'string',
                    filterable: true,
                    sortable: true
                },
                description: {
                    label: 'Beschreibung',
                    view: 'string',
                    filterable: true /*,
                    sortable: true,*/
                },
                created: {
                    label: 'Datum',
                    sortable: true,
                    display: (value) => moment(value).format('DD.MM.YY'),
                    group: (value) => moment(value).format('MMMM YYYY'),
                    form: false
                }
            }
        }), sdk);
        this.sdk = sdk;
        this.sdk.ready.then(() => {
            this.load();
        });
    }
    /** Overrides the List load method. Instead of slicing the page out of all items, a datamanager request is made using the config.*/
    load(config) {
        if (!this.sdk || !this.sdk.datamanager) {
            return;
        }
        this.useConfig(config);
        const loading = this.sdk.datamanager.dataManagerList(this.getFilterOptions(this.config))
            .then((list) => {
            this.use(list);
        }).catch((err) => {
            this.error.next(err);
        });
        this.loading.next(loading);
        return loading;
    }
}
exports.DatamanagerList = DatamanagerList;
//# sourceMappingURL=datamanager-list.js.map