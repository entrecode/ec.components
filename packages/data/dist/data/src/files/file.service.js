"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const PublicAssetResource_1 = require("ec.sdk/src/resources/publicAPI/PublicAssetResource");
const sdk_service_1 = require("../sdk/sdk.service");
const type_config_service_1 = require("../model-config/type-config.service");
const moment = require("moment");
const item_1 = require("@ec.components/core/src/item/item");
/** The CRUD service is meant to be used when modifying entries.
 * As the letters state it should be used to create update and delete entries.
 * Each action fires up a change that can be subscribed upon in any component to react to relevant
 * changes.
 * */
class FileService {
    /** Injects sdk */
    constructor(sdk, typeConfig) {
        this.sdk = sdk;
        this.typeConfig = typeConfig;
        /** The changes event is emitted everytime an entry is created or updated. */
        this.uploads = new core_1.EventEmitter();
        /** The default config for asset lists */
        this.assetListConfig = {
            label: 'title',
            size: 5,
            identifier: 'assetID',
            onSave: (item, value) => {
                const asset = item.getBody();
                // TODO use crud.service for Resource?
                value = item.serialize(value, asset instanceof PublicAssetResource_1.default);
                Object.assign(asset, value);
                if (asset instanceof PublicAssetResource_1.default) {
                    return asset.save();
                }
                return value;
            },
            fields: {
                thumb: {
                    label: 'Vorschau',
                    resolve: (asset, item, property) => {
                        if (typeof asset === 'string') {
                            return false;
                        }
                        return asset.getImageThumbUrl(200);
                    },
                    view: 'avatar',
                    readOnly: true
                },
                title: {
                    label: 'Titel',
                    sortable: true,
                    filterable: true,
                    type: 'text',
                    view: 'string',
                },
                tags: {
                    label: 'Tags',
                    view: 'tags'
                },
                type: {
                    label: 'Typ',
                    view: 'label',
                    sortable: true,
                    readOnly: true,
                },
                created: {
                    label: 'Datum',
                    view: 'date',
                    sortable: true,
                    readOnly: true,
                    display: (value) => moment(value).format('DD.MM.YY'),
                    group: (value) => moment(value).format('MMMM YYYY')
                }
            }
        };
    }
    getFormData(files) {
        const formData = new FormData();
        for (let i = 0; i < files.length; i++) {
            formData.append('file', files.item(i), files.item(i).name);
        }
        return formData;
    }
    uploadFiles(e) {
        const files = e.target.files;
        if (!files.length) {
            return;
        }
        const data = this.getFormData(files);
        return Promise.resolve().then(() => {
            if (files.length === 1) {
                return this.sdk.api.createAsset(data, {});
            }
            return this.sdk.api.createAssets(data, {});
        })
            .then(res => res())
            .then((response) => {
            if (response['getAllItems']) {
                return response['getAllItems']();
            }
            return [response];
        }).then((assets) => {
            return {
                asset: assets[0],
                assets,
                item: new item_1.Item(assets[0], this.assetListConfig),
                items: assets.map(asset => new item_1.Item(asset, this.assetListConfig))
            };
        }).then((upload) => {
            this.uploads.emit(upload);
            return upload;
        });
    }
    /** resolves all given ids to assets */
    resolveAssets(ids) {
        if (ids.length === 1) {
            ids.push(ids[0]); // :) TODO remove when backend bug is fixed
        }
        return this.sdk.api.assetList({ assetID: { any: ids } })
            .then((assetList) => {
            return assetList.getAllItems() || [];
        });
    }
}
FileService.decorators = [
    { type: core_1.Injectable },
];
/** @nocollapse */
FileService.ctorParameters = () => [
    { type: sdk_service_1.SdkService, },
    { type: type_config_service_1.TypeConfigService, },
];
exports.FileService = FileService;
//# sourceMappingURL=file.service.js.map