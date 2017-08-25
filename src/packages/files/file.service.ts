import { EventEmitter, Injectable } from '@angular/core';
import { PublicAssetResource } from "ec.sdk/typings/resources/publicAPI/PublicAssetResource";
import { SdkService } from '../data/sdk/sdk.service';
import { AssetList } from './asset-list/asset-list';
import { TypeConfigService } from '../data/model-config/type-config.service';
import { AssetInputComponent } from './asset-input/asset-input.component';
import * as moment from 'moment';

/** Instances of Update are emitted by the changes EventEmitter of the CrudService. */
export interface Upload {
  /** The relevant entry. */
  asset?: PublicAssetResource,
  /** The list where it happened. */
  list?: AssetList<PublicAssetResource>
}

/** The CRUD service is meant to be used when modifying entries.
 * As the letters state it should be used to create update and delete entries.
 * Each action fires up a change that can be subscribed upon in any component to react to relevant
 * changes.
 * */
@Injectable()
export class FileService {
  /** The changes event is emitted everytime an entry is created or updated. */
  private changes: EventEmitter<Upload> = new EventEmitter();
  /** The default config for asset lists */
  public assetListConfig = {
    label: 'title',
    size: 5,
    identifier: 'assetID',
    onSave: (item, value) => {
      const asset = item.getBody();
      //TODO use crud.service for Resource?
      value = item.serialize(value, !!asset.save);
      console.log('value', value);
      Object.assign(asset, value);
      if (!!asset.save) {
        return asset.save();
      }
      return value; //TODO createAsset
    },
    fields: {
      thumb: {
        label: 'Vorschau',
        resolve: (asset, item, property) => {
          if (typeof asset === 'string') {
            return false;
          }
          return asset.getImageThumbUrl(200)
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
        view: 'labels'
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

  /** Injects sdk */
  constructor(private sdk: SdkService, private typeConfig: TypeConfigService) {
    this.registerComponents();
  }

  public registerComponents() {
    this.typeConfig.set('asset', { input: AssetInputComponent });
    this.typeConfig.set('assets', { input: AssetInputComponent });
  }
}