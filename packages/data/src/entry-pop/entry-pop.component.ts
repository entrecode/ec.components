import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { CrudConfig } from '../crud/crud-config.interface';
import EntryResource from 'ec.sdk/src/resources/publicAPI/EntryResource';
import { PopComponent } from '@ec.components/ui/src/pop/pop.component';
import { EntryFormComponent } from '../entry-form/entry-form.component';
import { AuthService } from '../auth/auth.service';

/** Entry Pop is an extension of Pop component to host an entry-form.
 * You can use it like a normal pop but with the extra handling of an entry form inside.
 * You can call edit with an entry object to edit an entry, or just call show.
 * It is also possible to bind an entry directly which will then be bound to the form.
 * */
@Component({
  selector: 'ec-entry-pop',
  templateUrl: './entry-pop.component.html',
  styleUrls: ['./entry-pop.component.scss']
})

export class EntryPopComponent extends PopComponent implements OnInit {
  /** CrudConfig for customizing the entry-form and the pop.*/
  @Input() config: CrudConfig<EntryResource> = {};
  /** The entry form inside the view */
  @ViewChild(EntryFormComponent) form: EntryFormComponent;
  /** The model that should be edited/created*/
  @Input() model: string;
  /** The entry that should be used in the form. Is also set by edit.*/
  @Input() entry: EntryResource;

  constructor(private auth: AuthService) {
    super();
  }

  /** Returns true if the given method is part of the methods array (or if there is no methods array) */
  public hasMethod(method: string) {
    return this.config.methods && this.config.methods.indexOf(method) !== -1;
  }

  /** Determines if the current form can be saved, based on the allowed method (edit/update). */
  public maySave(form: EntryFormComponent) {
    const edit = form.isEditing();
    return (!edit && this.hasMethod('post')) || (edit && this.hasMethod('put'))
  }

  /** Edit the given entry. */
  edit(entry: EntryResource) {
    this.entry = entry;
    this.show();
  }

  /** Opens the pop after deleting the current bound entry from the instance. */
  create() {
    delete this.entry;
    this.show();
  }

  /** Initialize the allowed methods to determine which buttons should be shown. */
  ngOnInit() {
    this.auth.getAllowedMethods(this.model, this.config.methods)
    .then((methods) => {
      this.config.methods = methods;
    });
  }

  /** Logs the current form (Developer help). */
  private log(form) {
    console.dir(form);
  }
}
