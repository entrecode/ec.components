/**
 * Created by felix on 23.05.17.
 */
import { Component, Input, OnInit, ViewChild, ViewEncapsulation, forwardRef } from '@angular/core';
import { FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Item } from '@ec.components/core/src/item/item';
import { SdkService } from '@ec.components/data';
import { SelectComponent } from '@ec.components/ui';
import DMAssetResource from 'ec.sdk/lib/resources/publicAPI/DMAssetResource';
import PublicAssetResource from 'ec.sdk/lib/resources/publicAPI/PublicAssetResource';
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
export class AssetSelectComponent extends SelectComponent<DMAssetResource | PublicAssetResource> implements OnInit {
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
  /** If true, the asset group cannot be changed */
  @Input() forceGroup = false;
  /** The assetGroupID that should be picked from. If empty, legacy assets are used */
  @Input() assetGroupID: string;
  /** The asset list pop with the list to select from */
  @ViewChild(AssetListPopComponent) pop: AssetListPopComponent;
  /** The nested upload component */
  @ViewChild(UploadComponent) uploader: UploadComponent;
  /** Configuration Object for List */
  @Input() config: CrudConfig<DMAssetResource | PublicAssetResource> = {};
  /** config for new assets */
  public dmAssetConfig = Object.assign({}, this.resourceConfig.get('dmAsset'));
  /** config for legacy assets */
  public legacyAssetConfig = Object.assign({}, this.resourceConfig.get('legacyAsset'), { forceGroup: true });

  constructor(
    private fileService: FileService,
    public resourceConfig: ResourceConfig,
    public sdk: SdkService
  ) {
    super();
  }

  setGroup(group) {
    if (!group) {
      return;
    }
    let config;
    if (group === 'legacyAsset') {
      config = Object.assign({}, this.legacyAssetConfig);
    }
    config = Object.assign({}, this.initConfig());
    this.assetGroupID = group;
    this.useConfig(config);
  }

  containsNewAssets() {
    return (this.value && this.fileService.isNewAsset(this.value));
  }
  containsOldAssets() {
    return (this.value && !this.fileService.isNewAsset(this.value, true));
  }

  initConfig(): CrudConfig<DMAssetResource | PublicAssetResource> {
    let config = {};
    if (!this.formControl) {
      this.formControl = new FormControl(this.value || []);
    }
    if (this.containsOldAssets() && this.containsNewAssets()) {
      console.error('Mixed Content!', this.formControl.value)
      return;
    }
    if (this.containsNewAssets() || (this.assetGroupID && this.assetGroupID !== 'legacyAsset')) {
      config = this.dmAssetConfig;
      // this.assetGroupID = this.assetGroupID || this.value[0].
    } else if (this.containsOldAssets() || this.assetGroupID === 'legacyAsset') {
      // legacy assets
      config = this.legacyAssetConfig;
      this.assetGroupID = 'legacyAsset';
    }
    return Object.assign(config, { solo: !!this.solo });
  }

  groupReady() {
    return this.assetGroupID;
  }

  /** Called when the model changes */
  writeValue(value: any) {
    this.value = value;
    this.useConfig(this.initConfig());
    this.use(value, false);
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
