/**
 * Created by felix on 23.05.17.
 */
import { Component, forwardRef, Input, OnInit, ViewChild, ViewEncapsulation, EventEmitter, ElementRef } from '@angular/core';
import { FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Item } from '@ec.components/core/src/item/item';
import { SdkService } from '../../..';
import { SelectComponent } from '@ec.components/ui';
import { SymbolService } from '@ec.components/ui/src/symbol/symbol.service';
import DMAssetResource from 'ec.sdk/lib/resources/publicAPI/DMAssetResource';
import PublicAssetResource from 'ec.sdk/lib/resources/publicAPI/PublicAssetResource';
import { CrudConfig } from '../../crud/crud-config.interface';
import { ResourceConfig } from '../../resource-config/resource-config.service';
import { AssetListPopComponent } from '../asset-list-pop/asset-list-pop.component';
import { FileService, Upload } from '../file.service';
import { UploadComponent } from '../upload/upload.component';
import { UploadSelectComponent } from '../upload-select/upload-select.component';

/** Shows assets of a selection and is able to pick new ones from a crud list.
 * <example-url>https://components.entrecode.de/data/asset-select?e=1</example-url>
*/
@Component({
  selector: 'ec-asset-select',
  templateUrl: './asset-select.component.html',
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
  /** If true, a pop will open that can be used to rename files before upload */
  @Input() custom: boolean;
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
  /** Configuration Object for List */
  @Input() config: CrudConfig<DMAssetResource | PublicAssetResource> = {};
  /** config for new assets */
  public dmAssetConfig = Object.assign({}, this.resourceConfig.get('dmAsset'));
  /** config for legacy assets */
  public legacyAssetConfig = Object.assign({}, this.resourceConfig.get('legacyAsset'), { forceGroup: true });
  /** The Url to upload from */
  urlsToUpload = '';
  /** Wether or not the url input should be visible */
  showUrlInput = false;
  /** The event that focuses the url input */
  public focusEvent: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private fileService: FileService,
    public resourceConfig: ResourceConfig,
    public sdk: SdkService,
    public symbol: SymbolService,
    public elementRef: ElementRef
  ) {
    super(elementRef);
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

  getAssetGroupID() {
    if (!this.value || (Array.isArray(this.value) && this.value.length === 0)) {
      return 'legacyAsset';
    } else if (Array.isArray(this.value)) {
      return this.value[0].assetGroupID || 'legacyAsset';
    }
    return this.value.assetGroupID;
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
    if (this.assetGroupID === 'null') {
      delete this.assetGroupID;
    }
    if (this.containsNewAssets() || (this.assetGroupID && this.assetGroupID !== 'legacyAsset')) {
      const oldAssetTypes = ['image', 'video', 'audio', 'plain', 'document', 'spreadsheet'];
      if (!this.assetGroupID || oldAssetTypes.concat('legacyAsset').includes(this.assetGroupID)) {
        console.error('ALARM: asset picker hat neues asset aber assetGroupID "' + this.assetGroupID + '". Bitte füge im model die assetGroupID "' + this.getAssetGroupID() + '" als validation des feldes hinzu');
      }
      config = this.dmAssetConfig;
      this.assetGroupID = this.assetGroupID || this.getAssetGroupID();
    } else if (this.containsOldAssets() || this.assetGroupID === 'legacyAsset') {
      // legacy assets
      if (this.assetGroupID && this.assetGroupID !== 'legacyAsset') {
        console.error('ALARM: asset picker hat altes asset aber assetGroupID "' + this.assetGroupID + '". Entweder asset entfernen oder validation rausnehmen.');
      }
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


}
