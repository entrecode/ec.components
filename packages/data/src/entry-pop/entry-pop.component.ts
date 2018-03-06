import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { CrudConfig } from '../crud/crud-config.interface';
import EntryResource from 'ec.sdk/lib/resources/publicAPI/EntryResource';
import { PopComponent } from '@ec.components/ui/src/pop/pop.component';
import { EntryFormComponent } from '../entry-form/entry-form.component';
import { AuthService } from '../auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

/** Entry Pop is an extension of Pop component to host an entry-form.
 * You can use it like a normal pop but with the extra handling of an entry form inside.
 * You can call edit with an entry object to edit an entry, or just call show.
 * It is also possible to bind an entry directly which will then be bound to the form.
 * <example-url>https://components.entrecode.de/data/entry-pop/muffin/create</example-url>
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
  /** Route that should be headed to when an entry is edited. Navigates to route/:entryID */
  @Input() editRoute: string;
  /** Route that should be headed to when an entry is created. */
  @Input() createRoute: string;

  constructor(private auth: AuthService, private router: Router, private route: ActivatedRoute) {
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

  /*   public getUrlUntil(url: string, stop: string[]): string {
      const parts = url.split('/');
      return parts.reduce((state, part) => {
        if (state.done || [this.editRoute, this.createRoute].includes(part)) {
          state.done = true;
          return state;
        }
        state.url += part;
        return state;
      }, { url: '', done: false }).url;
    } */
  /** escapes the given string to be usable in a regex */
  escapeRegExp(str) {
    return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
  }

  pathRegExp(path) {
    return path.split('/').map(subpath => this.escapeRegExp(subpath)).join('/');
  }

  /** Edit the given entry. */
  edit(entry: EntryResource) {
    if (this.editRoute) {
      const matcher = '(' + this.pathRegExp(this.editRoute) + '|' + this.pathRegExp(this.createRoute) + ').*';
      const trimmed = this.router.url.replace(new RegExp(matcher, 'g'), '');
      this.router.navigate([trimmed, this.editRoute, entry.id]);
    }
    this.entry = entry;
    this.show();
  }

  /** Opens the pop after deleting the current bound entry from the instance. */
  create() {
    delete this.entry;
    if (this.createRoute) {
      const matcher = '(' + this.pathRegExp(this.editRoute) + '|' + this.pathRegExp(this.createRoute) + ').*';
      const trimmed = this.router.url.replace(new RegExp(matcher, 'g'), '');
      this.router.navigate([trimmed, this.createRoute]);
    }
    if (this.form) { // clears form if already used before
      this.form.create();
    }
    this.show();
  }

  /** Initialize the allowed methods to determine which buttons should be shown. */
  ngOnInit() {
    this.auth.getAllowedModelMethods(this.model, this.config.methods)
      .then((methods) => {
        this.config.methods = methods;
      });
  }

  /** Logs the current form (Developer help). */
  private log(form) {
    console.dir(form);
  }
}
