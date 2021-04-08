import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import { FormConfig } from '@ec.components/core';
import { FormComponent, LoaderComponent, PopComponent, PopService, SymbolService } from '@ec.components/ui';
import { DefaultEntryInputComponent } from '../../entry-form/default-entry-input.component';
import { SdkService } from '../../sdk/sdk.service';
import { FileService } from '../file.service';

/** This component is a pop with a form to add images. You can set an the alternative Text and the size.
 * The size inputs will keep the image ratio by default.  */
@Component({
  selector: 'ec-image-select-pop',
  templateUrl: './image-select-pop.component.html',
})
export class ImageSelectPopComponent extends PopComponent implements OnInit {
  /** The assetGroupID to pick from */
  @Input() assetGroupID;
  /** The default size used */
  @Input() defaultSize = 400;
  /** Ouput that emits when image changes  */
  @Output() changed: EventEmitter<any> = new EventEmitter();
  /** The instance of the imageForm  */
  imageForm: FormConfig<any>;
  /** The loader that is shown after an image has been selected  */
  @ViewChild('imageLoader', { static: true }) imageLoader: LoaderComponent;
  /** Set host class to make sure the type is used */
  @HostBinding('class') class = 'ec-image-select-pop modal-wrapper';

  constructor(
    public popService: PopService,
    public sdk: SdkService,
    public symbol: SymbolService,
    public fileService: FileService,
    public elementRef: ElementRef,
    public cdr: ChangeDetectorRef,
  ) {
    super(popService, elementRef, cdr);
  }
  /** Inits the form */
  ngOnInit() {
    const isOldAssetGroupID = this.fileService.isOldAssetGroupID(this.assetGroupID);
    this.imageForm = {
      submitButtonLabel: this.symbol.resolve('image-select-pop.submitButtonLabel'),
      onSave: (form, value: { img; height; width; alt }) => {
        const size = Math.max(value.width, value.height);
        if (isOldAssetGroupID) {
          this.sdk.api
            .asset(value.img)
            .then((asset) => asset.getImageUrl(size, ''))
            .then((url) => {
              this.hide();
              this.changed.emit({ url, alt: value.alt, size });
            });
        } else {
          const loadImage = this.sdk.api
            .dmAsset(this.assetGroupID, value.img)
            .then((asset) => asset.getImageUrl(size))
            .then((url) => {
              this.hide();
              this.changed.emit({ url, alt: value.alt, size });
            });
          this.imageLoader.wait(loadImage);
        }
      },
      fields: {
        img: {
          label: ' ',
          input: DefaultEntryInputComponent,
          inputView: isOldAssetGroupID ? 'asset-select' : 'dmAsset-select',
          relation: !isOldAssetGroupID ? this.assetGroupID : 'legacyAsset',
          required: true,
          changed: (value, form) => {
            const loadImg = Promise.resolve()
              .then(() => {
                if (isOldAssetGroupID) {
                  return this.sdk.api.asset(value).then((asset) => {
                    const original = asset.getOriginalFile();
                    const resolution = original.resolution;
                    return { resolution, title: asset.title };
                  });
                } else {
                  return this.sdk.api.dmAsset(this.assetGroupID, value).then((asset) => {
                    const resolution = asset.file.resolution;
                    return { resolution, title: asset.title };
                  });
                }
              })
              .then(({ resolution, title }) => {
                const ratio = resolution.width / resolution.height;
                const width = Math.min(this.defaultSize, resolution.width);
                form.group.controls.width.setValue(width);
                form.group.controls.alt.setValue(title);
                form.group.controls.ratio.setValue(ratio);
              });
            this.imageLoader.wait(loadImg);
          },
        },
        alt: {
          label: this.symbol.resolve('image-select-pop.alt'),
          view: 'string',
        },
        ratio: {
          hideInForm: true,
          view: 'number',
        },
        keepRatio: {
          label: this.symbol.resolve('image-select-pop.keepRatio'),
          view: 'boolean',
          prefill: true,
        },
        width: {
          label: this.symbol.resolve('image-select-pop.width'),
          view: 'number',
          columns: 6,
          changed: (value, form: FormComponent<any>) => {
            const ratio = form.getValue('ratio');
            if (ratio && form.getValue('keepRatio')) {
              form.group.controls.height.setValue(Math.round(value / ratio));
            }
          },
        },
        height: {
          label: this.symbol.resolve('image-select-pop.height'),
          view: 'number',
          columns: 6,
          changed: (value, form) => {
            const ratio = form.getValue('ratio');
            if (ratio && form.getValue('keepRatio')) {
              form.group.controls.width.setValue(Math.round(value * ratio));
            }
          },
        },
      },
    };
  }
}
