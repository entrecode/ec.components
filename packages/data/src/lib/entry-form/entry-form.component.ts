import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { FieldConfigProperty, FormConfig, Item } from '@ec.components/core';
import {
  FormComponent, FormService, LoaderService, Notification,
  NotificationsService, SymbolService, WithNotifications, formTemplate
} from '@ec.components/ui';
import EntryResource from 'ec.sdk/lib/resources/publicAPI/EntryResource';
import { CrudService } from '../crud/crud.service';
import { ModelConfigService } from '../model-config/model-config.service';
import { TypeConfigService } from '../model-config/type-config.service';

/** The EntryListComponent is a thin holder of an EntryList instance. It extends the ListComponent.
 * <example-url>https://components.entrecode.de/entries/entry-form?e=1</example-url>
*/
@Component({
  selector: 'ec-entry-form',
  template: formTemplate,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EntryFormComponent extends FormComponent<EntryResource> implements WithNotifications {
  /** The model of the form. It is used to extract the schema and generate the config from.
   * If you do not pass any model, it is expected that an EntryResource is passed. */
  @Input() model: string;
  /** The entry that should be edited.
   * If no model was passed, the model of the given entry is used which makes the form dynamic. */
  @Input() entry: EntryResource;
  /** This output fires when the entry has been deleted using deleteEntry(). */
  @Output() deleted: EventEmitter<any> = new EventEmitter();
  /** Error Notifications */
  notifications: Notification[] = [];

  /** Injects the required services. */
  constructor(protected loaderService: LoaderService,
    private modelConfig: ModelConfigService,
    protected notificationService: NotificationsService,
    protected crud: CrudService,
    public formService: FormService,
    protected typeConfig: TypeConfigService,
    protected symbol: SymbolService,
    protected cdr: ChangeDetectorRef) {
    super(loaderService, notificationService, formService, symbol, cdr);
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
      console.error(`ec-entry-form: Tried to edit an entry of model "${this.entry._modelTitle}"
      while "${this.model}" was expected! Entry: `, this.entry);
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

  /** Adds field to entry form. Automatically applies typeconfig */
  addField(property: string, config: FieldConfigProperty) {
    config = Object.assign({}, this.typeConfig.get(config.type), config);
    super.addField(property, config);
  }

  /** Yields true if the current edited entry is already existing in the backend. */
  isEditing() {
    // TODO: deprecate (see form#isEditing)
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
        type: 'success',
        hide: this.notifications
      });
    }).catch((error) => {
      this.notificationService.emit({
        title: this.symbol.resolve('error.delete'),
        error,
        hide: this.notifications,
        replace: this.notifications,
        sticky: true
      });
    });
    this.loaderService.wait(deletion, this.loader);
    return deletion;
  }
}
