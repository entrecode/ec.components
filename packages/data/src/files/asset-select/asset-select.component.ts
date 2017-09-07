/**
 * Created by felix on 23.05.17.
 */
import { Component, forwardRef, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Field } from '@ec.components/core/src/field/field';
import { Item } from '@ec.components/core/src/item/item';
import { FileService, Upload } from '../file.service';
import { PopComponent } from '@ec.components/ui/src/pop/pop.component';
import { SelectComponent } from '@ec.components/ui/src/form/select/select.component';
import PublicAssetResource from 'ec.sdk/src/resources/publicAPI/PublicAssetResource';

/** Shows assets of a selection and is able to pick new ones from a crud list */
@Component({
  selector: 'ec-asset-select',
  templateUrl: './asset-select.component.html',
  styleUrls: ['../../../../ui/src/form/select/select.component.scss'],

  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AssetSelectComponent),
      multi: true
    }
  ]
})
export class AssetSelectComponent extends SelectComponent<PublicAssetResource> {
  /** The formControl that is used. */
  @Input() formControl: FormControl;
  /** The value that should be prefilled */
  @Input() value: Array<PublicAssetResource>;
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
    }
    this.config = Object.assign({}, this.fileService.assetListConfig);
    Object.assign(this.config, { solo: this.solo });
    this.useConfig(this.config);
  }

  select(item: Item<any>) {
    this.selection.toggle(item);
    if (this.config.solo) {
      this.pop.toggle(false);
      this.active = false;
    }
  }

  toggle(active: boolean = !this.active, emit: boolean = false) {
    super.toggle(active, emit);
    this.pop.toggle();
  }

  canToggle() {
    return true;
  }

  selectUpload(upload: Upload) {
    console.log('upload', upload);
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
    //TODO open edit pop
  }

}