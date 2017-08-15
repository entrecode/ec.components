import { Component, EventEmitter, Input, Output, } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';
import { Field, Form, FormConfig, Item } from '../../core';
import { ItemConfig } from '../../core/item/item-config.interface';
import { LoaderComponent } from '../loader/loader.component';
import { LoaderService } from '../loader/loader.service';
import { NotificationsService } from '../notifications/notifications.service';

/** This component renders a form using a FieldConfig Object. */
@Component({
  selector: 'ec-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {
  /** The instance of Form that is used. */
  form: Form<any>;
  /** The current (angular) form group. */
  protected group: FormGroup;
  /** You can also use a FormConfig/ItemConfig as input (with defined fields property) */
  @Input() config: FormConfig<any>;
  /** You can also use an Item as input */
  @Input() item: Item<any>;
  /** If you pass an object to value, the form will generate an item from it. */
  @Input() value: any;
  /** If set to true, the form will be rendered empty, to be referenced from the outside. */
  @Input() empty: boolean;
  /** If set to true, the form will be rendered without a submit button. */
  @Input() submitButton: boolean;
  /** The loader that should be used. */
  @Input() loader: LoaderComponent;
  /** Emits when the form is submitted. The form can only be submitted if all Validators succeeded. */
  @Output('submit') submitted: EventEmitter<FormGroup> = new EventEmitter();
  /** Emits when a new instance of Form is present */
  @Output() change: EventEmitter<FormComponent> = new EventEmitter();

  /** Injects the services. */
  constructor(protected loaderService: LoaderService, protected notificationService: NotificationsService) {
  }

  /** inits the forms item based on the given value, config or item */
  protected initItem() {
    if (this.value) {
      this.item = new Item(this.value);
    }
    if (!this.item && !this.config) {
      return;
    }
    if (this.item) {
      Object.assign(this, this.item);
    } else {
      this.item = new Item(null, this.config);
    }
    return this.item;
  }

  /** On change, the form instance is (re)created by combining all inputs. If no item is given, an empty form is created using the config. You can also pass just an item to use its config and body.*/
  ngOnChanges() {
    this.init();
  }

  /** Inits the form (if ready) */
  protected init() {
    if (!this.initItem()) {
      return;
    }
    this.form = new Form(this.item.resolve(), this.config);
    this.initGroup();
  }

  /** Initializes the form group from the form fields*/
  protected initGroup(force?: boolean) {
    if (this.group && !force) {
      return;
    }
    const control = {};
    this.form.fields.forEach((field) => {
      const validators = this.getValidators(field);
      control[field.property] = new FormControl(this.item.resolve(field.property), validators)
    });
    this.group = new FormGroup(control);
    this.group.valueChanges.subscribe((change) => {
      this.change.emit(this);
    });
  }

  dirtyTalk() {
    if (this.group.dirty) {
      console.warn('form is dirty');
      //TODO open dialog to either save or discard changes
    }
  }

  /** edits a given Item instance by using its config and body. */
  edit(item: Item<any>) {
    this.dirtyTalk();
    this.config = item.getConfig() || this.config;
    this.item = item;
    delete this.group;
    this.ngOnChanges();
  }

  /* clears the form and uses the given config (falls back to existing one). Renders an empty form. */
  create(config?: ItemConfig<any>) {
    this.dirtyTalk();
    this.config = config || this.config;
    if (!this.config) {
      console.warn('cannot create new form: no config present');
      return;
    }
    delete this.group;
    delete this.item;
    delete this.value;
    this.ngOnChanges();
  }

  validateFactory(field: Field<any>): ValidationErrors | null {
    return (control: AbstractControl) => {
      if (!field.validate) {
        return;
      }
      const error = field.validate(control.value, field);
      if (field.validate(control.value, field)) {
        return {
          custom: error
        }
      }
    }
  }

  /** Extracts all validators from a given Field instance. */
  getValidators(field: Field<any>): ValidatorFn[] {
    const validators = [];
    if (field.required) {
      validators.push(Validators.required);
    }
    if (field.validate) {
      validators.push(this.validateFactory(field));
    }
    return validators;
  }

  /** Method that is invoked when the form is submitted.*/
  submit() {
    const submit = this.item.save(this.group.value)
    .then((item) => {
      this.submitted.emit(this.group);
      this.edit(item);
      this.notificationService.emit({ //TODO pull out to entry-form?
        title: 'Eintrag gespeichert',
        type: 'success'
      });
    }).catch((err) => {
      console.error(err, err.errors);
      this.notificationService.emit({
        title: 'Fehler beim Speichern',
        error: err
      });
    });
    this.loaderService.wait(submit, this.loader);
    return submit;
  }

  /** Returns the current value of the form control group. */
  getValue() {
    return this.group.value;
  }
}
