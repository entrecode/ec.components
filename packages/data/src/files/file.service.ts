import { EventEmitter, Injectable } from '@angular/core';
import { Item } from '@ec.components/core/src/item/item';
import DMAssetList from 'ec.sdk/lib/resources/publicAPI/DMAssetList';
import DMAssetResource from 'ec.sdk/lib/resources/publicAPI/DMAssetResource';
import PublicAssetList from 'ec.sdk/lib/resources/publicAPI/PublicAssetList';
import PublicAssetResource from 'ec.sdk/lib/resources/publicAPI/PublicAssetResource';
import { TypeConfigService } from '../model-config/type-config.service';
import { ResourceConfig } from '../resource-config/resource-config.service';
import { ResourceService } from '../resource-config/resource.service';
import { ResourceList } from '../resource-list/resource-list';
import { SdkService } from '../sdk/sdk.service';
import { mimeTypes } from './mime-types'

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
  list?: ResourceList,
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
  fileName?: string[]
  /** Custom file form fieldName */
  fieldName?: string,
  /** Deduplicate upload */
  deduplicate?: boolean;
}

/** The CRUD service is meant to be used when modifying entries.
 * As the letters state it should be used to create update and delete entries.
 * Each action fires up a change that can be subscribed upon in any component to react to relevant
 * changes.
 * */
@Injectable()
export class FileService {
  /** Promise that resolves assetGroupList from sdk */
  assetGroupListPromise: Promise<any>;
  /** The changes event is emitted everytime an entry is created or updated. */
  public uploads: EventEmitter<Upload> = new EventEmitter();
  /** Default options for file upload */
  public defaultOptions: FileOptions = {
    preserveFilenames: true,
    includeAssetIDInPath: true,
    ignoreDuplicates: false,
    deduplicate: false,
    fileName: []
  };
  /** config for new assets */
  public dmAssetConfig = Object.assign({}, this.resourceConfig.get('dmAsset'));
  /** config for legacy assets */
  public legacyAssetConfig = Object.assign({}, this.resourceConfig.get('legacyAsset'), { forceGroup: true });
  /** All the possible assetGroupIDs that are interpreted as old. Comes from validation of field */
  public oldAssetGroupIDs = ['image', 'video', 'audio', 'plain', 'document', 'spreadsheet', 'legacyAsset'];

  /** Injects sdk */
  constructor(private sdk: SdkService,
    private typeConfig: TypeConfigService,
    private resourceService: ResourceService,
    private resourceConfig: ResourceConfig) {
  }

  public getAssetConfig(assetGroupID) {
    if (this.isOldAssetGroupID(assetGroupID)) {
      const config = Object.assign({}, this.legacyAssetConfig);
      if (this.oldAssetGroupIDs.includes(assetGroupID) && assetGroupID !== 'legacyAsset') {
        config.filter = Object.assign({}, (config.filter || {}), {
          type: assetGroupID
        });
      }
      return config;
    } else {
      return Object.assign({}, this.dmAssetConfig);
    }
  }

  /** returns true if the given asset is a new one (DMAssetResource) */
  public isNewAsset(asset: Array<any> | string | DMAssetResource | PublicAssetResource, only = false) {
    if (Array.isArray(asset)) {
      return asset.reduce(
        (match, a) =>
          ((only && (match && this.isNewAsset(a)) ||
            (!only && (match || this.isNewAsset(a)))))
        , only);
    }
    const id = typeof asset === 'string' ? asset : asset.assetID;
    return /^[a-zA-Z0-9\-_]{22}$/.test(id)
  }

  /** Returns form data for a file list. You have to append options (even if empty) to get formData for new assets! */
  public getFormData(files: FileList, options?: FileOptions): FormData {
    const formData: FormData = new FormData();
    for (let i = 0; i < files.length; i++) {
      const name = options && options.fileName && options.fileName[i] ? options.fileName[i] : files.item(i).name;
      const fieldname = options && options.preserveFilenames && options.fieldName ? options.fieldName : 'file';
      formData.append(fieldname, files.item(i), name);
    }
    if (options) {
      ['preserveFilenames', 'includeAssetIDInPath', 'ignoreDuplicates', 'deduplicate']
        .forEach(key => {
          if (key in options) {
            formData.append(key, `${options[key]}`);
          }
        });
    }
    return formData;
  }

  /** Upload New Assets */
  public uploadAssets(files, assetGroupID, options: FileOptions = {}, api = this.sdk.api): Promise<Upload> {
    if (!files.length) {
      return;
    }
    const data = files[0].url ? files.map(f => f.url) : this.getFormData(files, options);
    return api.createDMAssets(assetGroupID, data, options)
      .then((assetList: DMAssetList) => {
        const assets = assetList.getAllItems();
        return {
          asset: assets[0],
          assets,
          item: new Item(assets[0], this.resourceConfig.get('dmAsset')),
          items: assets.map(asset => new Item(asset, this.resourceConfig.get('dmAsset')))
        }
      }).then((upload: Upload) => {
        this.uploads.emit(upload);
        this.resourceService.changes.next({ relation: 'dmAsset', type: 'post' });
        return upload;
      });
  }

  /** Upload old assets */
  public uploadFiles(files): Promise<Upload> {
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
          item: new Item(assets[0], this.resourceConfig.get('legacyAsset')),
          items: assets.map(asset => new Item(asset, this.resourceConfig.get('legacyAsset')))
        }
      }).then((upload: Upload) => {
        this.uploads.emit(upload);
        this.resourceService.changes.next({ relation: 'legacyAsset', type: 'post' });
        this.resourceService.changes.next({ relation: 'asset', type: 'post' });
        return upload;
      });
  }

  /** Resolves all assetIDs to PublicAssetResources */
  public resolveAssets(assets: Array<string | PublicAssetResource | DMAssetResource>, assetGroupID?: string): Promise<Array<PublicAssetResource | DMAssetResource>> {
    console.warn('FileService#resolveAssets is deprecated. I doubt somebody ever used it but if you see this, stop it. please.');
    const unresolved = assets.reduce((ids, asset) => {
      if (typeof asset === 'string') {
        ids.push(asset);
      }
      return ids;
    }, []);
    if (unresolved.length === 0) {
      return Promise.resolve(<Array<PublicAssetResource | DMAssetResource>>assets);
    }
    if (!assetGroupID && this.isNewAsset(unresolved)) {
      console.warn('wont resolve new asset without knowing assetGroupID');
      return Promise.resolve([]);
    }
    if (assetGroupID) { // new assets
      return this.sdk.api.dmAssetList(assetGroupID, { assetID: { any: unresolved }, size: 100 })
        .then(dmAssetList => dmAssetList.getAllItems());
    }
    return Promise.resolve().then((): any => {
      if (unresolved.length === 1) {
        return this.sdk.api.asset(unresolved[0]).then(asset => {
          return [asset]
        });
      }
      return this.sdk.api.assetList({ assetID: { any: unresolved }, page: 1 })
        .then((assetList) => {
          const resolved = assetList.getAllItems();
          return assets.map((asset) =>
            typeof asset === 'string' ?
              resolved.find((resource) => resource.assetID === asset) : asset)
        });

    })
  }

  public assetGroupList(forceReload = false) {
    return (!forceReload && this.assetGroupListPromise) || this.sdk.api.assetGroupList();
  }

  /** Yields true if the given assetGroupID is an old one. Also checks for old validation types */
  public isOldAssetGroupID(assetGroupID) {
    return !assetGroupID || this.oldAssetGroupIDs.includes(assetGroupID);
  }
  /** Yields true if the given assetGroupID is not an old one, meaning it is defined and legacyAsset or an old asset type. */
  public isNewAssetGroupID(assetGroupID) {
    return !this.isOldAssetGroupID(assetGroupID);
  }

  /** method that can be called after the upload to select the uploaded item(s). */
  selectUpload(upload: Upload, selection: any) {
    if (!selection) {
      console.warn('no selection');
      return;
    }
    if (selection.config.solo) {
      selection.select(upload.item);
    } else {
      selection.toggleAll(upload.items, false, true);
    }
  }
}
