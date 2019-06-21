import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Item, Selection } from '@ec.components/core';
import { PopComponent, PopService, SearchbarComponent, SymbolService } from '@ec.components/ui';
import PublicAssetResource from 'ec.sdk/lib/resources/publicAPI/PublicAssetResource';
import PublicTagResource from 'ec.sdk/lib/resources/publicAPI/PublicTagResource';
import { Subject } from 'rxjs';
import { CrudConfig } from '../../crud/crud-config.interface';
import { ResourceListComponent } from '../../resource-list/resource-list.component';
import { SdkService } from '../../sdk/sdk.service';
import { FileService } from '../file.service';

/** Entry Pop is an extension of Pop component to host an entry-form.
 * You can use it like a normal pop but with the extra handling of an entry form inside.
 * You can call edit with an entry object to edit an entry, or just call show.
 * It is also possible to bind an entry directly which will then be bound to the form.
 * */
@Component({
  selector: 'ec-asset-list-pop',
  templateUrl: './asset-list-pop.component.html',
  styleUrls: ['./asset-list-pop.component.scss'],
})
export class AssetListPopComponent extends PopComponent implements OnInit {
  /** CrudConfig for customizing the entry-form and the pop.*/
  @Input() config: CrudConfig<PublicAssetResource> = {};
  /** The used selection */
  @Input() selection: Selection<PublicAssetResource>;
  /** The assetGroupID that should be picked from. If empty, legacy assets are used */
  @Input() assetGroupID: string;
  /** Event emitter on item selection */
  @Output() columnClicked: EventEmitter<Item<PublicAssetResource>> = new EventEmitter();
  /** Emits when the group changes */
  @Output() groupChanged: EventEmitter<string> = new EventEmitter();
  /** Subject that is nexted when the items update */
  public groupChange: Subject<string> = new Subject();
  /** The loaded assetGroups */
  public assetGroups: string[];
  /** The nested searchbar */
  @ViewChild(SearchbarComponent) searchbar: SearchbarComponent;
  /** The nested resource-list */
  @ViewChild(ResourceListComponent) resourceList: ResourceListComponent;
  uploadConfig: CrudConfig<PublicAssetResource> & { disableListPop: boolean };
  tagSelectConfig: CrudConfig<PublicTagResource> = {
    disableCreatePop: true,
    disableListPop: true,
    methods: ['get'],
  };
  assetTypes = [
    { value: 'image', label: this.symbol.resolve('dmAsset.field.label.type.image') },
    { value: 'video', label: this.symbol.resolve('dmAsset.field.label.type.video') },
    { value: 'audio', label: this.symbol.resolve('dmAsset.field.label.type.audio') },
    { value: 'plain', label: this.symbol.resolve('dmAsset.field.label.type.plain') },
    { value: 'document', label: this.symbol.resolve('dmAsset.field.label.type.document') },
    { value: 'spreadsheet', label: this.symbol.resolve('dmAsset.field.label.type.spreadsheet') },
    { value: 'other', label: this.symbol.resolve('dmAsset.field.label.type.other') },
  ];
  typeSelectConfig = {
    label: 'label',
    identifier: 'value',
    fields: {
      label: {},
    },
  };

  /** Set host class to make sure the type is used */
  @HostBinding('class') class = 'modal-wrapper has-backdrop';

  /** Injects auth service and calls super constructor. */
  constructor(
    public popService: PopService,
    public fileService: FileService,
    public sdk: SdkService,
    public elementRef: ElementRef,
    public symbol: SymbolService,
    public cdr: ChangeDetectorRef,
  ) {
    super(popService, elementRef, cdr);
  }

  /** Changes the assetGroupID to the given value, emits groupChange */
  setGroup(group) {
    if (!group) {
      return;
    }
    this.groupChanged.emit(group);
    if (this.searchbar) {
      this.searchbar.clear();
      this.searchbar.focusEvent.emit(true);
    }
    this.assetGroupID = group;
  }

  filterByTags(tags) {
    this.resourceList.filter('tags', tags);
  }
  filterByTypes(types) {
    this.resourceList.filter('type', types);
  }

  ngOnInit() {
    this.fileService.assetGroupList().then((assetGroups) => {
      this.assetGroups = assetGroups;
    });
    this.uploadConfig = Object.assign({}, this.config, { disableListPop: true });
    this.config = Object.assign(
      this.fileService.getAssetConfig(this.assetGroupID),
      {
        hidePagination: true,
        disableHeader: true,
        fields: {
          thumb: {
            form: false,
            list: true,
            label: this.symbol.resolve('asset.field.label.thumb'),
            view: 'preview',
            resolve: (asset) => {
              if (asset.type !== 'image' || !asset.thumbnails || !asset.thumbnails.length) {
                return '';
              }
              return asset.thumbnails[0].url;
            },
            immutable: true,
          },
          title: {
            label: '',
            view: 'title',
          },
        },
      },
      this.config,
    );
  }

  /** emits columnClicked event or toggles selection if no observers. */
  select($event) {
    if (this.columnClicked.observers.length) {
      this.columnClicked.emit($event);
    } else if (this.selection) {
      this.selection.toggle($event);
    }
    this.searchbar.focusEvent.emit(true);
  }

  /** Returns the full resource relation name based on the current assetGroupID  */
  getGroupRelation() {
    return this.fileService.isOldAssetGroupID(this.assetGroupID) ? 'legacyAsset' : 'dmAsset.' + this.assetGroupID;
  }

  isLegacy() {
    return this.getGroupRelation() === 'legacyAsset';
  }

  /*   showTagSelect() {
      return this.config.hideAssetGroupSelect === false;
    } */
}
