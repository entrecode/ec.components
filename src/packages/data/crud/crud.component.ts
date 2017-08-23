/**
 * Created by felix on 26.05.17.
 */
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { CrudConfig } from './crud-config.interface';
import { EntryFormComponent } from '../entry-form/entry-form.component';
import { EntryListComponent } from '../entry-list/entry-list.component';
import { PopComponent } from '../../ui/pop/pop.component';
import { SdkService } from '../sdk/sdk.service';
import { Item } from '../../core/item/item';
import { LoaderComponent } from '../../ui/loader/loader.component';
import { LoaderService } from '../../ui/loader/loader.service';
import { NotificationsService } from '../../ui/notifications/notifications.service';

/** The CrudComponent takes at least a model name to render an entry list with create/edit/delete functionality out of the box.  */
@Component({
  selector: 'ec-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.scss']
})
export class CrudComponent {
  /** The model that should be crud'ed. */
  @Input() model: string;
  /** CrudConfig for customization of the crud's UI.*/
  @Input() config: CrudConfig = {};
  /** The EntryForm inside the template. */
  @ViewChild(EntryFormComponent) form: EntryFormComponent;
  /** The EntryList inside the template. */
  @ViewChild(EntryListComponent) list: EntryListComponent;
  /** The Pop inside the template. */
  @ViewChild(PopComponent) pop: PopComponent;
  /** The lists loader */
  @ViewChild('listLoader') loader: LoaderComponent;
  /** Emits when a list element is clicked */
  @Output() select: EventEmitter<any> = new EventEmitter();
  /** Emits when the selection has changed */
  @Output() selected: EventEmitter<any> = new EventEmitter();

  constructor(private sdk: SdkService, private loaderService: LoaderService, private notificationService: NotificationsService) {
  }

  /** Logs the current form (Developer help). */
  private log(form) {
    console.dir(form);
  }

  /** Returns true if the given method is part of the methods array (or if there is no methods array) */
  private hasMethod(method: string) {
    return !this.config.methods || this.config.methods.indexOf(method) !== -1;
  }

  /** Determines if the current form can be saved, based on the allowed method (edit/update). */
  private maySave(form: EntryFormComponent) {
    const edit = form.isEditing();
    return (!edit && this.hasMethod('create')) || (edit && this.hasMethod('update'))
  }

  /** Loads the clicked entry item, depending on the configured levels */
  private loadEntry(item) {
    return Promise.resolve().then(() => {
      if (this.config.levels === 1) { //TODO add !this.config.levels ||' when lvl1 is supported
        return item;
      }
      return this.sdk.api.entry(this.model, item.id(), this.config.levels || 2)
      .then((leveledEntry) => {
        return new Item(leveledEntry, item.config);
      });
    }).then((loadedEntry) => {
      this.form.edit(loadedEntry);
      this.pop.show();
    }).catch((err) => {
      console.log('err', err);
      this.notificationService.emit({
        title: 'Fehler beim Laden',
        error: err
      })
    });
  }

  /** Is called when an item in the list is clicked. */
  private selectEntry(item, form) {
    if (!item) {
      return;
    }
    if (this.select.observers.length) {
      this.select.emit(item);
      return;
    }
    this.loaderService.wait(this.loadEntry(item), this.loader);
  }

  /** Returns the pop class that should be used, either uses config.popClass or defaults to sidebar-left. */
  getPopClass() {
    return this.config && this.config.popClass ? this.config.popClass : 'sidebar-left';
  }
}