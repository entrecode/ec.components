import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormComponent } from '@ec.components/ui/src/form/form.component';
import { ModelConfigService } from '../model-config/model-config.service';
import { LoaderService } from '@ec.components/ui/src/loader/loader.service';
import { NotificationsService } from '@ec.components/ui/src/notifications/notifications.service';
import { CrudService } from '../crud/crud.service';
import { Item } from '@ec.components/core/src/item/item';
import { FormConfig } from '@ec.components/core/src/form/form-config.interface';
import { FormService } from '@ec.components/ui/src/form/form.service';
import EntryResource from 'ec.sdk/lib/resources/publicAPI/EntryResource';
import { SymbolService } from '../../../ui/src/symbol/symbol.service';

/** The EntryListComponent is a thin holder of an EntryList instance. It extends the ListComponent */
@Component({
  selector: 'ec-entry-form',
  templateUrl: '../../../ui/src/form/form.component.html',
  styleUrls: ['./entry-form.component.scss']
})
export class EntryFormComponent extends FormComponent<EntryResource> {
  /** The model of the form. It is used to extract the schema and generate the config from.
   * If you do not pass any model, it is expected that an EntryResource is passed. */
  @Input() model: string;
  /** The entry that should be edited.
   * If no model was passed, the model of the given entry is used which makes the form dynamic. */
  @Input() entry: EntryResource;
  /** This output fires when the entry has been deleted using deleteEntry(). */
  @Output() deleted: EventEmitter<any> = new EventEmitter();

  /** Injects the required services. */
  constructor(protected loaderService: LoaderService,
    private modelConfig: ModelConfigService,
    protected notificationService: NotificationsService,
    protected crud: CrudService,
    protected formService: FormService,
    protected symbol: SymbolService) {
    super(loaderService, notificationService, formService, symbol);
  }

  /** As soon as the model is known, the config is generated to then instantiate the form with. */
  init(item: Item<any> = this.item, config: FormConfig<any> = this.config) {
    if (!this.model && this.entry) {
      this.model = this.entry._modelTitle; // use entry model if no model specified
    }
    if (!this.model) {
      return;
    }
    if (this.entry && this.entry._modelTitle !== this.model) { // warn if model does not match
      console.error(`ec-entry-form: Tried to edit an entry of model "${this.entry._modelTitle}" while "${this.model}" was expected!"`);
      return;
    }
    Promise.resolve(this.modelConfig.generateConfig(this.model, (this.config || {}).fields))
      .then((_config) => {
        if (this.entry) {
          item = new Item(this.entry, _config);
        }
        super.init(item, _config);
      });
  }

  /** Yields true if the current edited entry is already existing in the backend. */
  isEditing() {
    if (!this.form) {
      return;
    }
    const entry = this.form.getBody();
    return entry && entry.save;
  }

  /** Deletes the edited entry. Fires the deleted Output. */
  deleteEntry() {
    if (!this.form || !this.isEditing()) {
      return;
    }
    const deletion = this.crud.del(this.model, this.form.getBody()).then(() => {
      this.deleted.emit();
      this.create();
      this.notificationService.emit({
        title: this.symbol.resolve('success.delete'),
        type: 'success'
      });
    }).catch((error) => {
      this.notificationService.emit({
        title: this.symbol.resolve('error.delete'),
        error
      });
    });
    this.loaderService.wait(deletion, this.loader);
    return deletion;
  }
}
