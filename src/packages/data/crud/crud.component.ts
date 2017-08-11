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
  @Input() model: string;
  @Input() config: CrudConfig = {};

  ngOnChanges() {
    if (!this.model) {
      return;
    }
  }

  private log(form) {
    console.dir(form);
  }

  private hasMethod(method: string) {
    return !this.config.methods || this.config.methods.indexOf(method) !== -1;
  }

  private maySave(form: EntryFormComponent) {
    const edit = form.isEditing();
    return (!edit && this.hasMethod('create')) || (edit && this.hasMethod('update'))
  }
}