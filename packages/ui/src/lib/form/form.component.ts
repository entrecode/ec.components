import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Field, FieldConfigProperty, Form, FormConfig, Item, ItemConfig } from '@ec.components/core';
import { InputComponent } from '../io/input/input.component';
import { LoaderComponent } from '../loader/loader.component';
import { LoaderService } from '../loader/loader.service';
import { WithLoader } from '../loader/with-loader.interface';
import { Notification } from '../notifications/notification';
import { NotificationsService } from '../notifications/notifications.service';
import { WithNotifications } from '../notifications/with-notifications.interface';
import { SymbolService } from '../symbol/symbol.service';
import { formTemplate } from './form.component.html';
import { FormService } from './form.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

/** This component renders a form using a FieldConfig Object.
 *
 * Example:
 *
 * <example-url>https://components.entrecode.de/ui/form?e=1</example-url>
 */
@Component({
  selector: 'ec-form',
  template: formTemplate,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormComponent<T> implements OnChanges, WithLoader, WithNotifications {
  /** The instance of Form that is used. */
  public form: Form<T>;
  /** The current (angular) form group. */
  public group: FormGroup;
  /** The current form config */
  public config: FormConfig<T>;
  /** Recent Error notification */
  notifications: Notification[] = [];
  /** You can also use a FormConfig/ItemConfig as input (with defined fields property) */
  // tslint:disable-next-line:no-input-rename
  @Input('config') configInput: FormConfig<T>;
  /** You can also use an Item as input */
  @Input() readonly item: Item<T>;
  /** If you pass an object to value, the form will generate an item from it. */
  @Input() value: T;
  /** If set to true, the form will be rendered empty, to be referenced from the outside. */
  @Input() empty: boolean;
  /** If set to false, the form will be rendered without a submit button. Default: true */
  @Input() submitButton: boolean;
  /** If true, no notifications will be emitted. */
  @Input() silent: boolean;
  /** The loader that should be used. */
  @Input() loader: LoaderComponent;
  /** Emits when the form is submitted. The form can only be submitted if all Validators succeeded. */
  @Output() submitted: EventEmitter<Form<T>> = new EventEmitter();
  /** Emits when the form has been initialized.  */
  @Output() ready: EventEmitter<FormComponent<T>> = new EventEmitter();
  /** Emits when a new instance of Form is present */
  @Output() changed: EventEmitter<FormComponent<T>> = new EventEmitter();
  /** debounce time till changed event/callback will be fired */
  @Input() debounceTime = 200;
  /** If true, the form will only init once. On new changes, the form values will be patched (see patchValue) */
  @Input() lazy: boolean;
  /** The forms default loader. it is used when no loader is passed via the loader input */
  @ViewChild(LoaderComponent) defaultLoader: LoaderComponent;
  /** The InputComponents that are used to control the fields */
  @ViewChildren(InputComponent) inputs: QueryList<InputComponent>;

  /** Injects the services. */
  constructor(
    protected loaderService: LoaderService,
    protected notificationService: NotificationsService,
    public formService: FormService,
    protected symbol: SymbolService,
    protected cdr: ChangeDetectorRef,
  ) { }

  /** On change, the form instance is (re)created by combining all inputs.
   * If no item is given, an empty form is created using the config.
   * You can also pass just an item to use its config and body.*/
  ngOnChanges(changes?) {
    this.config = Object.assign({}, this.config || {}, this.configInput || {});
    if (this.lazy && this.group && changes.value) {
      this.patchValue();
    } else {
      this.init();
    }
  }

  /** Returns the column class for data-col, based on configured columns */
  getColumns(field: Field): string {
    return field.columns ? `${field.columns}` : '12';
  }

  patchValue(value = this.value) {
    this.value = value;
    if (!this.value || Object.keys(this.value).length === 0) {
      this.group.reset();
    } else {
      this.form.fields.forEach((field) => {
        const control = this.group.get(field.property);
        if (control && control.value && control.value !== this.value[field.property]) {
          control.patchValue(this.value[field.property]);
        }
      });
    }
  }

  /** Inits the form (if ready) */
  protected init(item: Item<T> = this.item, config: FormConfig<T> = this.config) {
    if (this.value) {
      // if value is set, create item from value only
      this.form = new Form(this.value, config);
    } else if (item instanceof Item) {
      this.form = new Form(item.getBody(), item.getConfig() || config || {});
    } else if (config) {
      this.form = new Form(null, config);
    }
    this.initGroup();
  }
  /** Initializes the FormGroup which is generated from the current form instance. Sets valueChanges listener */
  protected initGroup() {
    if (!this.form) {
      return;
    }
    this.group = this.formService.getGroup(this.form);
    this.cdr.markForCheck();
    Object.keys(this.group.controls).forEach((property) => {
      const control = this.group.controls[property];
      control.valueChanges
        // TODO: remove when fixed: https://github.com/angular/angular/issues/12540
        .pipe(
          distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)),
          debounceTime(this.debounceTime),
        )
        .subscribe((value) => {
          const changedField = this.form.getField(property);
          if (changedField.changed) {
            changedField.changed(value, this, changedField);
          }
        });
    });

    this.group.valueChanges
      // TODO: remove when fixed: https://github.com/angular/angular/issues/12540
      .pipe(
        distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)),
        debounceTime(this.debounceTime)
      )
      .subscribe((change) => {
        this.changed.emit(this);
      });
    this.ready.emit(this);
  }

  public patchObjectField(property, path, value) {
    const control = this.group.get(property);
    control.patchValue(patchObject(control.value, path, value));
  }

  /** Adds a new field with the given config to the form */
  public addField(property: string, config: FieldConfigProperty) {
    const field = this.form.createField(property, config);
    if (field) {
      this.formService.addField(field, this.form, this.group);
    }
  }

  /** Clears the current value */
  clear() {
    delete this.value;
  }

  /* clears the form and uses the given config (falls back to existing one). Renders an empty form. */
  create(config: ItemConfig<T> = this.config) {
    this.clear();
    this.init(null, config);
  }

  /** edits a given Item instance by using its config and body. */
  edit(item: Item<T>) {
    this.init(item);
  }

  /** edits a given value by creating an item and calling edit. */
  editValue(value: T, config = this.config) {
    const item = new Item(value, config);
    this.edit(item);
  }

  /** Method that is invoked when the form is submitted.*/
  submit() {
    const submit = this.form
      .save(this.group.value)
      .then((form: Form<T>) => {
        this.edit(form);
        this.group.markAsPristine();
        this.submitted.emit(this.form);
        if (this.silent) {
          return;
        }
        this.notificationService.emit({
          // TODO pull out to entry-form?
          title: this.symbol.resolve('success.save'),
          type: 'success',
          hide: this.notifications,
        });
      })
      .catch((err) => {
        console.error(err, err.errors);
        if (this.silent) {
          return;
        }
        this.notificationService.emit({
          title: this.symbol.resolve('error.save'),
          error: err,
          sticky: true,
          hide: this.notifications,
          replace: this.notifications,
        });
        throw new Error(err);
      });
    this.loaderService.wait(submit, this.loader || this.defaultLoader);
    return submit;
  }

  /** Decides if the submit button should be rendered or not based on config */
  showSubmitButton() {
    return this.submitButton !== false && !this.config.hideSubmitButton;
  }

  /** Determindes if the given field's label should be shown based on hideFormLabel+hideFormLabelIfEmpty flags */
  showLabel(field, form) {
    if (!field || !form) {
      return false;
    }
    return !field.hideFormLabel && (!field.hideFormLabelIfEmpty || !!form.resolve(field.property));
  }

  /** Determines if the field labels should always show the field property (EDITOR-431) */
  showTitle(field, form) {
    if (!field || !form) {
      return false;
    }
    return field.label && field.showTitle && field.property !== field.label;
  }

  /** Returns the current value of the form control group. When passing a property, it directly returns the property value. */
  getValue(property?: string) {
    if (property) {
      return this.group.value[property];
    }
    return this.group.value;
  }

  /** Returns an Error containing all field validator errors as subErrors.  */
  getErrors(formComponent: FormComponent<T>, touchedOnly = true): Error {
    const errs = Object.keys(formComponent.group.controls).reduce((errors, property) => {
      const control = formComponent.group.get(property);
      if ((touchedOnly && !control.touched) || !control.errors) {
        return errors;
      }
      return errors.concat({ property, errors: control.errors });
    }, []);
    if (!errs.length) {
      return;
    }
    const error: any = new Error('Validierungsfehler');
    error.subErrors = errs.map(({ property, errors }) => {
      const label = formComponent.form.getField(property).label || property;
      return new Error(label + ': ' + Object.values(errors).join(', '));
    });
    return error;
  }
}


function patchObject(o, path, value) {
  const p = path.split('.');
  if (p.length === 1) {
    return {
      ...(o || {}),
      [p[0]]: value,
    };
  }
  return {
    ...(o || {}),
    [p[0]]: patchObject((o || {})[p[0]], p.slice(1).join('.'), value),
  };
}

