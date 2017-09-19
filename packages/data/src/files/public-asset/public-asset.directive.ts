/**
 * Created by felix on 23.05.17.
 */
import { Directive, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import PublicAssetResource from 'ec.sdk/src/resources/publicAPI/PublicAssetResource';
import { SdkService } from '../../sdk/sdk.service';

/** Loads an public asset by id to the template. */
@Directive({
  selector: '[ecPublicAsset]',
  exportAs: 'ecPublicAsset'
})
export class PublicAssetDirective implements OnChanges {
  /** The loading promise */
  promise: any;
  /** The asset id that should be loaded*/
  @Input() assetId: string;
  /** Should the asset be loaded immediately? Defaults to true */
  @Input() autoload: boolean;
  /** The levels to use. */
  @Input() levels: number;
  /** Fires as soon as the asset has been loaded. */
  @Output() loaded: EventEmitter<PublicAssetResource> = new EventEmitter();
  /** The current loaded asset */
  public asset: any;

  /** Injects the sdk */
  constructor(public sdk: SdkService) {
  }

  /** as soon as model and id are known, the asset will be loaded. */
  ngOnChanges() {
    if (this.autoload === false) {
      return;
    }
    this.load();
  }

  /** Loads the asset. Can be called from template when using autoload=false */
  load(id?: string) {
    this.assetId = id || this.assetId;
    if (!this.assetId) {
      return;
    }
    this.promise = this.sdk.api.asset(this.assetId)
    .then((asset) => {
      this.asset = asset;
      this.loaded.emit(asset);
      return asset;
    });
    return this.promise;
  }
}
