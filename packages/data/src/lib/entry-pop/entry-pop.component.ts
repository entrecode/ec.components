import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Form } from '@ec.components/core';
import { FormService, PopComponent, PopService, SymbolService } from '@ec.components/ui';
import EntryResource from 'ec.sdk/lib/resources/publicAPI/EntryResource';
import { AuthService } from '../auth/auth.service';
import { CrudConfig } from '../crud/crud-config.interface';
import { EntryFormComponent } from '../entry-form/entry-form.component';

/** Entry Pop is an extension of Pop component to host an entry-form.
 * You can use it like a normal pop but with the extra handling of an entry form inside.
 * You can call edit with an entry object to edit an entry, or just call show.
 * It is also possible to bind an entry directly which will then be bound to the form.
 * <example-url>https://components.entrecode.de/entries/entry-pop/muffin/create?e=1</example-url>
 * */
@Component({
  selector: 'ec-entry-pop',
  templateUrl: './entry-pop.component.html',
  styleUrls: ['./entry-pop.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
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
  /** Emits when the entry-form is submitted. */
  @Output() submitted: EventEmitter<Form<EntryResource>> = new EventEmitter();
  /** Emits when the resource has been deleted. */
  @Output() deleted: EventEmitter<Form<EntryResource>> = new EventEmitter();
  /** Set host class to make sure the type is used */
  @HostBinding('class') class = 'ec-entry-pop modal-wrapper modal-wrapper_backdrop';

  constructor(
    public popService: PopService,
    public auth: AuthService,
    public formService: FormService,
    public symbol: SymbolService,
    public elementRef: ElementRef,
    public cdr: ChangeDetectorRef,
  ) {
    super(popService, elementRef, cdr);
  }

  /** Returns true if the given method is part of the methods array (or if there is no methods array) */
  public hasMethod(method: string) {
    return this.config.methods && this.config.methods.indexOf(method) !== -1;
  }

  /** Determines if the current form can be saved, based on the allowed method (edit/update). */
  public maySave(form: EntryFormComponent) {
    const edit = form.isEditing();
    return (!edit && this.hasMethod('post')) || (edit && this.hasMethod('put'));
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
    return path
      .split('/')
      .map((subpath) => this.escapeRegExp(subpath))
      .join('/');
  }

  /** Edit the given entry. */
  edit(entry: EntryResource) {
    if (this.editRoute) {
      // TODO: find solution for automatic routing
      /* const matcher = '(' + this.pathRegExp(this.editRoute) + '|' + this.pathRegExp(this.createRoute) + ').*';
      const trimmed = this.router.url.replace(new RegExp(matcher, 'g'), '');
      this.router.navigate([trimmed, this.editRoute, entry.id]); */
    }
    this.editEntry(entry).then((preparedEntry: EntryResource) => {
      this.entry = preparedEntry;
      this.show();
    });
  }

  editEntry(resource: EntryResource): Promise<EntryResource> {
    if (this.config && this.config.onEdit) {
      return Promise.resolve(this.config.onEdit(resource));
    }
    return Promise.resolve(resource);
  }

  /** Opens the pop after deleting the current bound entry from the instance. */
  create() {
    delete this.entry;
    /* if (this.createRoute) {
      const matcher = '(' + this.pathRegExp(this.editRoute) + '|' + this.pathRegExp(this.createRoute) + ').*';
      const trimmed = this.router.url.replace(new RegExp(matcher, 'g'), '');
      this.router.navigate([trimmed, this.createRoute]);
    } */
    if (this.form) {
      // clears form if already used before
      this.form.create();
    }
    this.show();
  }

  /** Initialize the allowed methods to determine which buttons should be shown. */
  ngOnInit() {
    this.auth.getAllowedModelMethods(this.model, this.config.methods).then((methods) => {
      this.cdr.markForCheck();
      this.config.methods = methods;
    });
  }

  /** Logs the current form (Developer help). */
  public log(form) {
    console.dir(form);
  }
  /** Called when the form has been submitted and saved */
  formSubmitted(form: Form<EntryResource>) {
    this.submitted.next(form);
    if (!this.config.keepPopOpen) {
      this.hide();
    }
  }

  /** Fires when the resource has been deleted. */
  public deletedEntry() {
    this.hide();
    this.deleted.emit(this.form.form);
  }

  /** Returns header for current form */
  getHeader(form) {
    const label = this.config.singularLabel || form.model;
    return this.formService.getFormLabel(form, label);
  }

  /** Returns header for current form */
  getSaveButtonLabel() {
    return this.config.saveButtonLabel || 'Speichern';
  }

  /** Returns header for current form */
  getDeleteButtonLabel() {
    return this.config.deleteButtonLabel || 'Löschen';
  }
}
