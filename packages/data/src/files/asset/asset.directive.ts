import { Directive, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import PublicAssetResource from 'ec.sdk/lib/resources/publicAPI/PublicAssetResource';
import { SdkService } from '../../sdk/sdk.service';
import PublicAPI from 'ec.sdk/lib/PublicAPI';

/** Loads an public asset by id to the template. */
@Directive({
  selector: '[ecAsset]',
  exportAs: 'ecAsset'
})
export class AssetDirective implements OnChanges {
  /** The loading promise */
  promise: any;
  /** The asset id that should be loaded*/
  @Input() assetId: string;
  /** The asset id that should be loaded*/
  @Input() ecAsset: string;
  /** Should the asset be loaded immediately? Defaults to true */
  @Input() autoload: boolean;
  /** The levels to use. */
  @Input() levels: number;
  /** The api to use. Defaults to sdk.api */
  @Input() api: PublicAPI;
  /** Fires as soon as the asset has been loaded. */
  @Output() loaded: EventEmitter<PublicAssetResource> = new EventEmitter();
  /** The current loaded asset */
  public asset: any;

  /** Injects the sdk */
  constructor(public sdk: SdkService) {
  }

  /** as soon as model and id are known, the asset will be loaded. */
  ngOnChanges() {
    if (this.ecAsset) {
      this.assetId = this.ecAsset;
    }
    if (this.autoload === false) {
      return;
    }
    this.load();
  }

  /** Loads the asset. Can be called from template when using autoload=false */
  load(id?: string) {
    this.assetId = id || this.assetId;
    if (!this.assetId) {
      return Promise.reject('cannot load asset: no assetId is set');
    }
    const api = this.api || this.sdk.api;
    if (!api) {
      throw new Error('cannot load asset: no api was set!');
    }
    this.promise = api.asset(this.assetId)
      .then((asset) => {
        this.asset = asset;
        this.loaded.emit(asset);
        return asset;
      });
    return this.promise;
  }
}
