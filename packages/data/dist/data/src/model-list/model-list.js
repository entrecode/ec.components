"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const resource_list_1 = require("../resource-list/resource-list");
const moment = require("moment");
const ModelResource_1 = require("ec.sdk/src/resources/datamanager/ModelResource");
/**
 * Extension of List for Datamanagers
 */
class ModelList extends resource_list_1.ResourceList {
    constructor(datamanager, config, sdk) {
        super(Object.assign(config, {
            identifier: 'modelID',
            onSave: (item, value) => {
                const model = item.getBody();
                item.serialize(value, model instanceof ModelResource_1.default);
                Object.assign(model, value);
                if (model instanceof model) {
                    return model.save();
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
                    display: (value) => moment(value).format('DD.MM.YY'),
                    group: (value) => moment(value).format('MMMM YYYY'),
                    form: false
                }
            }
        }), sdk);
        this.datamanager = datamanager;
        this.sdk.ready.then(() => {
            this.load();
        });
    }
    /** Overrides the List load method. Instead of slicing the page out of all items, a datamanager request is made using the config.*/
    load(config) {
        if (!this.sdk || !this.sdk.datamanager || !this.datamanager) {
            return;
        }
        this.useConfig(config);
        const loading = this.resolveDatamanager()
            .then((datamanager) => {
            this.datamanager = datamanager;
            return this.datamanager.modelList(this.getFilterOptions(this.config));
        }).then((list) => {
            this.use(list);
        }).catch((err) => {
            this.error.next(err);
        });
        this.loading.next(loading);
        return loading;
    }
    resolveDatamanager() {
        if (typeof this.datamanager === 'string') {
            return this.sdk.datamanager.dataManager(this.datamanager);
        }
        return Promise.resolve(this.datamanager);
    }
}
exports.ModelList = ModelList;
//# sourceMappingURL=model-list.js.map