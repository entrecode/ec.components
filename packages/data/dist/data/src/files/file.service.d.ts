import { EventEmitter } from '@angular/core';
import PublicAssetResource from 'ec.sdk/src/resources/publicAPI/PublicAssetResource';
import { SdkService } from '../sdk/sdk.service';
import { AssetList } from './asset-list/asset-list';
import { TypeConfigService } from '../model-config/type-config.service';
import { Item } from '@ec.components/core/src/item/item';
/** Instances of Update are emitted by the changes EventEmitter of the CrudService. */
export interface Upload {
    /** The relevant asset. */
    asset?: PublicAssetResource;
    /** The relevant assets (when uploading multiple). */
    assets?: PublicAssetResource[];
    /** The uploaded asset as item */
    item?: Item<PublicAssetResource>;
    /** The uploaded asset as item */
    items?: Array<Item<PublicAssetResource>>;
    /** The list where it happened. */
    list?: AssetList;
}
/** The CRUD service is meant to be used when modifying entries.
 * As the letters state it should be used to create update and delete entries.
 * Each action fires up a change that can be subscribed upon in any component to react to relevant
 * changes.
 * */
export declare class FileService {
    private sdk;
    private typeConfig;
    /** The changes event is emitted everytime an entry is created or updated. */
    uploads: EventEmitter<Upload>;
    /** The default config for asset lists */
    assetListConfig: {
        label: string;
        size: number;
        identifier: string;
        onSave: (item: any, value: any) => any;
        fields: {
            thumb: {
                label: string;
                resolve: (asset: any, item: any, property: any) => any;
                view: string;
                readOnly: boolean;
            };
            title: {
                label: string;
                sortable: boolean;
                filterable: boolean;
                type: string;
                view: string;
            };
            tags: {
                label: string;
                view: string;
            };
            type: {
                label: string;
                view: string;
                sortable: boolean;
                readOnly: boolean;
            };
            created: {
                label: string;
                view: string;
                sortable: boolean;
                readOnly: boolean;
                display: (value: any) => string;
                group: (value: any) => string;
            };
        };
    };
    /** Injects sdk */
    constructor(sdk: SdkService, typeConfig: TypeConfigService);
    getFormData(files: FileList): FormData;
    uploadFiles(e: any): Promise<Upload>;
    /** Resolves all assetIDs to PublicAssetResources */
    resolveAssets(assets: Array<string | PublicAssetResource>): Promise<Array<PublicAssetResource>>;
}
