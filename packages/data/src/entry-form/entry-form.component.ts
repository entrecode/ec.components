import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormComponent } from '@ec.components/ui/src/form/form.component';
import { ModelConfigService } from '../model-config/model-config.service';
import { LoaderService } from '@ec.components/ui/src/loader/loader.service';
import { NotificationsService } from '@ec.components/ui/src/notifications/notifications.service';
import { CrudService } from '../crud/crud.service';
import { Item } from '@ec.components/core/src/item/item';
import { FormConfig } from '@ec.components/core/src/form/form-config.interface';
import { FormService } from '@ec.components/ui/src/form/form.service';

/** The EntryListComponent is a thin holder of an EntryList instance. It extends the ListComponent */
@Component({
  selector: 'ec-entry-form',
  templateUrl: '../../../ui/src/form/form.component.html',
  styleUrls: ['./entry-form.component.scss']
})
export class EntryFormComponent extends FormComponent {
  /** The model of the form. It is used to extract the schema and generate the config from. */
  @Input() model: string;
  /** The entry that should be edited. */
  @Input() entry;//: EntryResource;
  /** This output fires when the entry has been deleted using deleteEntry(). */
  @Output() deleted: EventEmitter<any> = new EventEmitter();

  /** Injects the required services. */
  constructor(protected loaderService: LoaderService, private modelConfig: ModelConfigService, protected notificationService: NotificationsService, protected crud: CrudService, protected formService: FormService) {
    super(loaderService, notificationService, formService);
  }

  /** As soon as the model is known, the config is generated to then instantiate the form with. */
  init(item: Item<any> = this.item, config: FormConfig<any> = this.config) {
    if (!this.model) {
      return;
    }
    Promise.resolve(config || this.modelConfig.generateConfig(this.model))
    .then((config) => {
      if (this.entry) {
        item = new Item(this.entry, config);
      }
      super.init(item, config);
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
        title: 'Eintrag gelöscht', type: 'success'
      });
    }).catch((error) => {
      this.notificationService.emit({
        title: 'Fehler beim Löschen', error
      });
    });
    this.loaderService.wait(deletion, this.loader);
  }
}
