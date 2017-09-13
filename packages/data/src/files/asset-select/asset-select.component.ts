/**
 * Created by felix on 23.05.17.
 */
import { Component, forwardRef, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Field } from '@ec.components/core/src/field/field';
import { Item } from '@ec.components/core/src/item/item';
import { FileService, Upload } from '../file.service';
import { PopComponent } from '@ec.components/ui/src/pop/pop.component';
import { SelectComponent } from '@ec.components/ui';
import PublicAssetResource from 'ec.sdk/src/resources/publicAPI/PublicAssetResource';

/** Shows assets of a selection and is able to pick new ones from a crud list */
@Component({
  selector: 'ec-asset-select',
  templateUrl: './asset-select.component.html',
  styleUrls: ['../../../../ui/src/select/select.component.scss'],

  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AssetSelectComponent),
      multi: true
    }
  ]
})
export class AssetSelectComponent extends SelectComponent<PublicAssetResource> implements OnInit {
  /** The formControl that is used. */
  @Input() formControl: FormControl;
  /** The used field, which should contain a model property (when not using model input) */
  @Input() field: Field<PublicAssetResource>;
  /** The form group that is used */
  protected group: FormGroup;
  /** The form control that is used */
  protected control: FormControl;
  /** The used item */
  @Input() item: Item<any>;
  /** The model to pick from, alternative to field with model property set. */
  @Input() model: string;
  /** The asset list pop with the list to select from */
  @ViewChild('assetPop') pop: PopComponent;

  constructor(private fileService: FileService) {
    super();
  }

  ngOnInit() {
    if (!this.formControl) {
      this.formControl = new FormControl(this.value || []);
    } else if (this.value) {
      console.warn('asset-select: setting a value to a asset-select with given formControl ' +
        'is currently not supported. Ask your favorite frontend dev to fix it.');
      // TODO
    }

    this.config = Object.assign({}, this.fileService.assetListConfig);
    Object.assign(this.config, { solo: this.solo });
    this.useConfig(this.config);
  }

  /** writeValue is overridden to fetch unresolved assetID's */
  writeValue(value) {
    value = value ? !Array.isArray(value) ? [value] : value : [];
    this.fileService.resolveAssets(value).then((assets) => {
      super.writeValue(assets);
    });
  }

  select(item: Item<any>) {
    this.selection.toggle(item);
    if (this.config.solo) {
      this.pop.toggle(false);
      this.active = false;
    }
  }

  selectUpload(upload: Upload) {
    if (this.solo) {
      this.selection.select(upload.item);
    } else {
      this.selection.toggleAll(upload.items);
    }
  }

  editItem(item) {
    if (!item.getBody().isResolved) {
      item.getBody().resolve().then((asset) => {
        console.log('resolved', asset);
      })
    } else {
      console.log('edit', item.getBody());
    }
    // TODO open edit pop
  }
}
