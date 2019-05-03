import { Directive, ElementRef, Input, OnChanges } from '@angular/core';
import { AssetDirective } from '../asset/asset.directive';
import { SdkService } from '../../sdk/sdk.service';
import DMAssetResource from 'ec.sdk/lib/resources/publicAPI/DMAssetResource';
import PublicAssetResource from 'ec.sdk/lib/resources/publicAPI/PublicAssetResource';

/** Loads an public asset image by id to the template. It can be used with img's to auto load the url to the src. */
@Directive({
  selector: 'img [ecImage]',
  exportAs: 'ecImage',
})
export class ImageDirective extends AssetDirective implements OnChanges {
  /** If true, the image will be requested as thumb (square) */
  @Input() thumb: boolean;
  /** The size that should be requested. */
  @Input() size = 200;
  /** The assetID that should be loaded */
  @Input() ecImage: string | DMAssetResource;
  /** Resolved asset url. */
  url: string;

  constructor(public sdk: SdkService, private elementRef: ElementRef) {
    super(sdk);
  }

  /** Reads ecImage input as assetId and loads if autoload is not false */
  ngOnChanges() {
    if (typeof this.ecImage === 'string') {
      this.assetId = this.ecImage;
    } else if (this.ecImage && this.ecImage.assetID) {
      this.use(this.ecImage);
    }
    if (this.autoload !== false && this.assetId) {
      this.load();
    }
  }

  /** Calls super.load, then resolves the image url and assigns it to the native element src (only if it is an img) */
  load(id?: string) {
    return super.load(id).then(this.use.bind(this));
  }

  use(asset: PublicAssetResource | DMAssetResource) {
    return Promise.resolve()
      .then(() => {
        if (asset.type !== 'image') {
          return Promise.reject(`ecImage only works for assets of type image.
        Loaded id ${asset.id} is of type ${asset.type}`);
        }
        if (asset instanceof DMAssetResource) {
          // new asset
          return asset.getFileVariant(this.size, this.thumb);
        } else if (asset instanceof PublicAssetResource) {
          // old asset
          if (this.thumb) {
            return asset.getImageThumbUrl(this.size, '');
          }
          return asset.getImageUrl(this.size, '');
        }
      })
      .then(this.setUrl.bind(this));
  }

  setUrl(url: string) {
    this.url = url;
    this.elementRef.nativeElement.src = this.url;
  }
}
