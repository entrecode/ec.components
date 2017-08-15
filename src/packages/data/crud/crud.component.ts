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
  @ViewChild('crudForm') form: EntryFormComponent;
  /** The EntryList inside the template. */
  @ViewChild('crudList') list: EntryListComponent;
  /** The Pop inside the template. */
  @ViewChild('formPop') pop: PopComponent;
  /** Emits when a list element is clicked */
  @Output() select: EventEmitter<any> = new EventEmitter();
  /** Emits when the selection has changed */
  @Output() selected: EventEmitter<any> = new EventEmitter();

  constructor(private sdk: SdkService) {
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

  /** Is called when an item in the list is clicked. */
  private selectEntry(entry) {
    if (this.select.observers.length) {
      this.select.emit(entry);
      return;
    }
    //TODO show loader, fetch errors
    this.sdk.api.entry(this.model, entry.id(), 2)
    .then((leveledEntry) => {
      const entryItem = new Item(leveledEntry, entry.config);
      this.form.edit(entryItem);
      this.pop.show();
    });
    /*    this.form.edit(entry);
        this.pop.show();*/
  }
}