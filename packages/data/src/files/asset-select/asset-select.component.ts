/**
 * Created by felix on 23.05.17.
 */
import { Component, Input, OnInit, ViewChild, ViewEncapsulation, forwardRef } from '@angular/core';
import { FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Item } from '@ec.components/core/src/item/item';
import { SelectComponent } from '@ec.components/ui';
import Resource from 'ec.sdk/lib/resources/Resource';
import { CrudConfig } from '../../crud/crud-config.interface';
import { ResourceConfig } from '../../resource-config/resource-config.service';
import { AssetListPopComponent } from '../asset-list-pop/asset-list-pop.component';
import { FileService } from '../file.service';
import { UploadComponent } from '../upload/upload.component';

/** Shows assets of a selection and is able to pick new ones from a crud list.
 * <example-url>https://components.entrecode.de/data/asset-select</example-url>
*/
@Component({
  selector: 'ec-asset-select',
  templateUrl: './asset-select.component.html',
  styleUrls: ['../../../../ui/src/select/select.component.scss', './asset-select.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AssetSelectComponent),
      multi: true
    }
  ]
})
export class AssetSelectComponent extends SelectComponent<Resource> implements OnInit {
  /** The formControl that is used. */
  @Input() formControl: FormControl;
  /** The form group that is used */
  protected group: FormGroup;
  /** The form control that is used */
  protected control: FormControl;
  /** The used item */
  @Input() item: Item<any>;
  /** If true, the selection cannot be changed and no uploads can be made. */
  @Input() readOnly = false;
  /** The assetGroupID that should be picked from. If empty, legacy assets are used */
  @Input() assetGroupID: string;
  /** The asset list pop with the list to select from */
  @ViewChild(AssetListPopComponent) pop: AssetListPopComponent;
  /** The nested upload component */
  @ViewChild(UploadComponent) uploader: UploadComponent;
  /** Configuration Object for List */
  @Input() config: CrudConfig<Resource> = {};

  constructor(private fileService: FileService, public resourceConfig: ResourceConfig) {
    super();
  }

  initGroup() {
    if (this.assetGroupID || (this.formControl.value && this.fileService.isNewAsset(this.formControl.value))) {
      this.config = Object.assign({}, this.config || {}, this.resourceConfig.get('dmAsset'),
        { readOnly: !this.assetGroupID });
      if (!this.assetGroupID) {
        console.warn('asset select has new asset but no assetGroupID was given. Switching to readOnly mode.')
      }
    } else if (this.config.useLegacyAssets) {
      // legacy assets
      this.config = Object.assign({}, this.config || {}, this.resourceConfig.get('legacyAsset'));
    } else {
      return;
    }
    Object.assign(this.config, { solo: this.solo });
    this.useConfig(this.config);
  }

  ngOnInit() {
    if (!this.formControl) {
      this.formControl = new FormControl(this.value || []);
    } else if (this.value) {
      console.warn('asset-select: setting a value to a asset-select with given formControl ' +
        'is currently not supported. Ask your favorite frontend dev to fix it.');
      // TODO
    }
    this.initGroup();
  }

  useLegacyAssets() {
    this.config = Object.assign({}, this.config || {}, { useLegacyAssets: true });
    this.initGroup();
  }

  useGroup(value) {
    this.assetGroupID = value;
    this.initGroup();
  }

  /** writeValue is overridden to fetch unresolved assetID's */
  writeValue(value) {
    if (!this.assetGroupID && (!this.config || !this.config.useLegacyAssets)) {
      /* console.log('have to wait for assetGroupID'); */
      return;
    }

    value = value ? !Array.isArray(value) ? [value] : value : [];
    this.fileService.resolveAssets(value, this.assetGroupID).then((assets) => {
      super.writeValue(assets);
    });
  }

  editItem(item) {
    if (!item.getBody().isResolved) {
      item.getBody().resolve().then((asset) => {
        // console.log('resolved', asset);
      })
    } else {
      // console.log('edit', item.getBody());
    }
    // TODO open edit pop
  }
}
