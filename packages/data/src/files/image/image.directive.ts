/**
 * Created by felix on 23.05.17.
 */
import { Directive, ElementRef, Input, OnChanges } from '@angular/core';
import { PublicAssetDirective } from '../public-asset/public-asset.directive';
import { SdkService } from '../../sdk/sdk.service';

/** Loads an public asset by id to the template. */
@Directive({
  selector: '[ecImage]',
  exportAs: 'ecImage'
})
export class ImageDirective extends PublicAssetDirective implements OnChanges {
  @Input() thumb: boolean;
  @Input() size = 200;
  @Input() ecImage: string;
  url: string;

  constructor(public sdk: SdkService, private elementRef: ElementRef) {
    super(sdk);

  }

  ngOnChanges() {
    if (this.ecImage) {
      this.assetId = this.ecImage;
    }
    if (this.autoload !== false) {
      this.load();
    }
  }

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
      if (this.elementRef.nativeElement.nodeName === 'IMG') {
        this.elementRef.nativeElement.src = this.url;
      }
    });
  }
}
