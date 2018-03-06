import { Component, Input, Output, EventEmitter } from '@angular/core';
import PublicAssetResource from 'ec.sdk/lib/resources/publicAPI/PublicAssetResource';
import { PopComponent } from '@ec.components/ui/src/pop/pop.component';
import { Selection, Item } from '@ec.components/core';
import { CrudConfig } from '../../crud/crud-config.interface';
import { AuthService } from '../../auth/auth.service';
import { Upload } from '../file.service';

/** Entry Pop is an extension of Pop component to host an entry-form.
 * You can use it like a normal pop but with the extra handling of an entry form inside.
 * You can call edit with an entry object to edit an entry, or just call show.
 * It is also possible to bind an entry directly which will then be bound to the form.
 * */
@Component({
  selector: 'ec-asset-list-pop',
  templateUrl: './asset-list-pop.component.html',
  styleUrls: ['./asset-list-pop.component.scss']
})

export class AssetListPopComponent extends PopComponent {
  /** CrudConfig for customizing the entry-form and the pop.*/
  @Input() config: CrudConfig<PublicAssetResource> = {};
  /** The used selection */
  @Input() selection: Selection<PublicAssetResource>;
  /** Event emitter on item selection */
  @Output() columnClicked: EventEmitter<Item<PublicAssetResource>> = new EventEmitter();
  /** Injects auth service and calls super constructor. */
  constructor(private auth: AuthService) {
    super();
  }

  /** method that is called after the upload to select the uploaded item(s). */
  selectUpload(upload: Upload) {
    if (this.config.solo) {
      this.selection.select(upload.item);
    } else {
      this.selection.toggleAll(upload.items);
    }
  }
  /** emits columnClicked event or toggles selection if no observers. */
  select($event) {
    if (this.columnClicked.observers.length) {
      this.columnClicked.emit($event);
    } else if (this.selection) {
      this.selection.toggle($event);
    }
  }
}
