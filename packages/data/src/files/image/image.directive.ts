/**
 * Created by felix on 23.05.17.
 */
import { Directive, ElementRef, Input, OnChanges } from '@angular/core';
import { AssetDirective } from '../asset/asset.directive';
import { SdkService } from '../../sdk/sdk.service';

/** Loads an public asset image by id to the template. It can be used with img's to auto load the url to the src. */
@Directive({
  selector: 'img [ecImage]',
  exportAs: 'ecImage'
})
export class ImageDirective extends AssetDirective implements OnChanges {
  @Input() thumb: boolean;
  @Input() size = 200;
  @Input() ecImage: string;
  url: string;

  constructor(public sdk: SdkService, private elementRef: ElementRef) {
    super(sdk);

  }

  /** Reads ecImage input as assetId and loads if autoload is not false */
  ngOnChanges() {
    if (this.ecImage) {
      this.assetId = this.ecImage;
    }
    if (this.autoload !== false && this.assetId) {
      this.load();
    }
  }

  /** Calls super.load, then resolves the image url and assigns it to the native element src (only if it is an img) */
  load(id?: string) {
    return super.load(id).then((asset) => {
      if (asset.type !== 'image') {
        return Promise.reject(`ecImage only works for assets of type image.
        Loaded id ${asset.id} is of type ${asset.type}`);
      }
      if (this.thumb) {
        return asset.getImageThumbUrl(this.size);
      }
      return asset.getImageUrl(this.size)
    }).then((url) => {
      this.url = url;
      this.elementRef.nativeElement.src = this.url;
    });
  }
}
