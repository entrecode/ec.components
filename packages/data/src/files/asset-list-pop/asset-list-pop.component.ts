import { Component, Input } from '@angular/core';
import PublicAssetResource from 'ec.sdk/src/resources/publicAPI/PublicAssetResource';
import { PopComponent } from '@ec.components/ui/src/pop/pop.component';
import { Selection } from '@ec.components/core';
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

  constructor(private auth: AuthService) {
    super();
  }

  selectUpload(upload: Upload) {
    if (this.config.solo) {
      this.selection.select(upload.item);
    } else {
      this.selection.toggleAll(upload.items);
    }
  }
}
