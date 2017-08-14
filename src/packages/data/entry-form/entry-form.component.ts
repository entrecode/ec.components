import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormComponent } from '../../ui/form/form.component';
import { ModelConfig } from '../model-config/model-config';
import { LoaderService } from '../../ui/loader/loader.service';
import { NotificationsService } from '../../ui/notifications/notifications.service';
import { CrudService } from '../crud/crud.service';

/** The EntryListComponent is a thin holder of an EntryList instance. It extends the ListComponent */
@Component({
  selector: 'ec-entry-form',
  templateUrl: '../../ui/form/form.component.html',
  styleUrls: ['./entry-form.component.scss']
})
export class EntryFormComponent extends FormComponent {
  /** The model of the form. It is used to extract the schema and generate the config from. */
  @Input() model: string;
  /** This output fires when the entry has been deleted using deleteEntry(). */
  @Output() deleted: EventEmitter<any> = new EventEmitter();

  /** Injects the required services. */
  constructor(protected loaderService: LoaderService, private modelConfig: ModelConfig, protected notificationService: NotificationsService, protected crud: CrudService) {
    super(loaderService, notificationService);
  }

  /** As soon as the model is known, the config is generated to then instantiate the form with. */
  ngOnChanges() {
    if (!this.model) {
      return;
    }
    Promise.resolve(this.config || this.modelConfig.generateConfig(this.model))
    .then((config) => {
      this.config = Object.assign(this.config || {}, config);
      this.init();
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
