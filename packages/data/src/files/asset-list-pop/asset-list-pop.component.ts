import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Item, Selection } from '@ec.components/core';
import { SdkService } from '@ec.components/data';
import { PopComponent } from '@ec.components/ui/src/pop/pop.component';
import { PopService } from '@ec.components/ui/src/pop/pop.service';
import PublicAssetResource from 'ec.sdk/lib/resources/publicAPI/PublicAssetResource';
import { Subject } from 'rxjs/Subject';
import { SearchbarComponent } from '../../../../ui/src/list/searchbar/searchbar.component';
import { AuthService } from '../../auth/auth.service';
import { CrudConfig } from '../../crud/crud-config.interface';
import { FileService } from '../file.service';

/** Entry Pop is an extension of Pop component to host an entry-form.
 * You can use it like a normal pop but with the extra handling of an entry form inside.
 * You can call edit with an entry object to edit an entry, or just call show.
 * It is also possible to bind an entry directly which will then be bound to the form.
 * */
@Component({
  selector: 'ec-asset-list-pop',
  templateUrl: './asset-list-pop.component.html',
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

  /** Injects auth service and calls super constructor. */
  constructor(protected popService: PopService,
    private auth: AuthService,
    private fileService: FileService,
    public sdk: SdkService) {
    super(popService);
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

  ngOnInit() {
    this.fileService.assetGroupList().then(assetGroups => {
      this.assetGroups = assetGroups
      /* if (!this.assetGroupID) {
        this.assetGroupID = assetGroups[0] || 'legacyAsset';
        this.groupChanged.emit(this.assetGroupID);
      } */
    });
  }

  /** emits columnClicked event or toggles selection if no observers. */
  select($event) {
    if (this.columnClicked.observers.length) {
      this.columnClicked.emit($event);
    } else if (this.selection) {
      console.log('selection', this.selection);
      // this.selection.toggle($event);
    }
  }

  /** Returns the full resource relation name based on the current assetGroupID  */
  getGroupRelation() {
    return !this.assetGroupID || this.assetGroupID === 'legacyAsset' ? 'legacyAsset'
      : 'dmAsset.' + this.assetGroupID;
  }
}
