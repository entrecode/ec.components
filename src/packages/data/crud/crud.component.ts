/**
 * Created by felix on 26.05.17.
 */
import { Component, Input } from '@angular/core';
import { CrudConfig } from './crud-config.interface';
import { EntryFormComponent } from '../entry-form/entry-form.component';

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
}