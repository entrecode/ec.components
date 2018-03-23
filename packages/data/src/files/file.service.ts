import { EventEmitter, Injectable } from '@angular/core';
import PublicAssetResource from 'ec.sdk/lib/resources/publicAPI/PublicAssetResource';
import PublicAssetList from 'ec.sdk/lib/resources/publicAPI/PublicAssetList';
import { SdkService } from '../sdk/sdk.service';
import { AssetList } from './asset-list/asset-list';
import { TypeConfigService } from '../model-config/type-config.service';
import moment from 'moment-es6';
import { Item } from '@ec.components/core/src/item/item';
import DMAssetList from 'ec.sdk/lib/resources/publicAPI/DMAssetList';
import { ResourceService } from '../resource-config/resource.service';

/** Instances of Update are emitted by the changes EventEmitter of the CrudService. */
export interface Upload {
  /** The relevant asset. */
  asset?: PublicAssetResource,
  /** The relevant assets (when uploading multiple). */
  assets?: PublicAssetResource[],
  /** The uploaded asset as item */
  item?: Item<PublicAssetResource>
  /** The uploaded asset as item */
  items?: Array<Item<PublicAssetResource>>
  /** The list where it happened. */
  list?: AssetList,
}

/** Interface for file options used by new assets */
export interface FileOptions {
  /** Preserves Filenames */
  preserveFilenames?: boolean
  /** Includes assetID in path */
  includeAssetIDInPath?: boolean
  /** Ignores duplicates */
  ignoreDuplicates?: boolean
  /** Optional custom names for assets. Mapped by indices to assets. */
  customNames?: string[]
  /** Custom file form fieldName */
  fieldName?: string
}

/** The CRUD service is meant to be used when modifying entries.
 * As the letters state it should be used to create update and delete entries.
 * Each action fires up a change that can be subscribed upon in any component to react to relevant
 * changes.
 * */
@Injectable()
export class FileService {
  /** The changes event is emitted everytime an entry is created or updated. */
  public uploads: EventEmitter<Upload> = new EventEmitter();
  /** The default config for asset lists */
  public assetListConfig = { // TODO: delete when asset list is dead
    label: 'title',
    size: 5,
    identifier: 'assetID',
    onSave: (item, value) => {
      const asset = item.getBody();
      // TODO use crud.service for Resource?
      value = item.serialize(value, asset instanceof PublicAssetResource);
      Object.assign(asset, value);
      if (asset instanceof PublicAssetResource) {
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
          return asset.getImageUrl(200)
        },
        view: 'preview',
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

  public newAssetListConfig = { // TODO: dont use
    label: 'title',
    identifier: 'assetID',
    fields: {
      title: {
        label: 'Titel',
        sortable: true,
        filterable: true,
        type: 'text',
        view: 'string',
      },
    }
  }

  /** Injects sdk */
  constructor(private sdk: SdkService, private typeConfig: TypeConfigService, private resourceService: ResourceService) {
  }

  /** Returns form data for a file list. You have to append options (even if empty) to get formData for new assets! */
  public getFormData(files: FileList, options?: FileOptions): FormData {
    const formData: FormData = new FormData();
    for (let i = 0; i < files.length; i++) {
      const name = options && options.customNames && options.customNames[i] ? options.customNames[i] : files.item(i).name;
      const fieldname = options && options.preserveFilenames && options.fieldName ? options.fieldName : 'file';
      formData.append(fieldname, files.item(i), name);
    }
    if (options && !options.preserveFilenames) {
      formData.append('preserveFilenames', 'false');
    }
    if (options && !options.includeAssetIDInPath) {
      formData.append('includeAssetIDInPath', 'false');
    }
    if (options && options.ignoreDuplicates) {
      formData.append('ignoreDuplicates', 'true');
    }
    return formData;
  }

  /** Upload New Assets */
  public uploadAssets(e, assetGroupID, options: FileOptions = {}, api = this.sdk.api): Promise<Upload> {
    const files = e.target.files;
    if (!files.length) {
      return;
    }
    return api.createDMAssets(assetGroupID, this.getFormData(files, options))
      .then((assetList: DMAssetList) => {
        const assets = assetList.getAllItems();
        return {
          asset: assets[0],
          assets,
          item: new Item(assets[0], this.newAssetListConfig),
          items: assets.map(asset => new Item(asset, this.newAssetListConfig))
        }
      }).then((upload: Upload) => {
        this.uploads.emit(upload);
        this.resourceService.changes.next({ relation: 'dmAsset', type: 'post' });
        return upload;
      });
  }

  /** Upload old assets */
  public uploadFiles(e): Promise<Upload> {
    const files = e.target.files;
    if (!files.length) {
      return;
    }
    const data = this.getFormData(files);
    return Promise.resolve().then((): Promise<() => Promise<(PublicAssetList | PublicAssetResource)>> => {
      if (files.length === 1) {
        return this.sdk.api.createAsset(data, {})
      }
      return this.sdk.api.createAssets(data, {})
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
          item: new Item(assets[0], this.assetListConfig),
          items: assets.map(asset => new Item(asset, this.assetListConfig))
        }
      }).then((upload: Upload) => {
        this.uploads.emit(upload);
        this.resourceService.changes.next({ relation: 'legacyAsset', type: 'post' });
        return upload;
      });
  }

  /** Resolves all assetIDs to PublicAssetResources */
  public resolveAssets(assets: Array<string | PublicAssetResource>): Promise<Array<PublicAssetResource>> {
    const unresolved = assets.reduce((ids, asset) => {
      if (typeof asset === 'string') {
        ids.push(asset);
      }
      return ids;
    }, []);
    if (unresolved.length === 0) {
      return Promise.resolve(<Array<PublicAssetResource>>assets);
    }
    if (unresolved.length === 1) {
      unresolved.push(unresolved[0]); // :) TODO remove when backend bug is fixed
    }
    return this.sdk.api.assetList({ assetID: { any: unresolved } })
      .then((assetList) => {
        const resolved = assetList.getAllItems();
        return assets.map((asset) =>
          typeof asset === 'string' ?
            resolved.find((resource) => resource.assetID === asset) : asset)
      });
  }
}
