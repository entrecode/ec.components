import { Component, Input, ViewChild } from '@angular/core';
import { CrudConfig } from '../crud/crud-config.interface';
import EntryResource from 'ec.sdk/src/resources/publicAPI/EntryResource';
import { PopComponent } from '@ec.components/ui/src/pop/pop.component';
import { EntryFormComponent } from '../entry-form/entry-form.component';

@Component({
  selector: 'ec-entry-pop',
  templateUrl: './entry-pop.component.html',
  styleUrls: ['./entry-pop.component.scss']
})

export class EntryPopComponent extends PopComponent {
  /** CrudConfig for customizing the entry-form and the pop.*/
  @Input() config: CrudConfig<EntryResource> = {};
  /** The entry form inside the view */
  @ViewChild(EntryFormComponent) form: EntryFormComponent;
  /** The pop inside the view */
  @ViewChild(PopComponent) pop: PopComponent;
  /** The allowed methods (post, put, get, delete). */
  methods: string[];
  /** The model that should be edited/created*/
  model: string;

  /** Returns true if the given method is part of the methods array (or if there is no methods array) */
  public hasMethod(method: string) { // !this.methods?
    return this.methods && this.methods.indexOf(method) !== -1;
  }

  /** Determines if the current form can be saved, based on the allowed method (edit/update). */
  public maySave(form: EntryFormComponent) {
    const edit = form.isEditing();
    return (!edit && this.hasMethod('post')) || (edit && this.hasMethod('put'))
  }
}
