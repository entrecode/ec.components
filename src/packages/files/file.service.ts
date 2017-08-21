import { EventEmitter, Injectable } from '@angular/core';
import { PublicAssetResource } from "ec.sdk/typings/resources/publicAPI/PublicAssetResource";
import { SdkService } from '../data/sdk/sdk.service';
import { AssetList } from './asset-list/asset-list';
import { TypeConfigService } from '../data/model-config/type-config.service';
import { AssetInputComponent } from './asset-input/asset-input.component';

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

  /** Injects sdk */
  constructor(private sdk: SdkService, private typeConfig: TypeConfigService) {
    this.registerComponents();
  }

  public registerComponents() {
    this.typeConfig.set('asset', { input: AssetInputComponent });
    this.typeConfig.set('assets', { input: AssetInputComponent });
  }
}