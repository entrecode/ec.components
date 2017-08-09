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

/** This component renders a form using a FieldConfig Object. */
@Component({
  selector: 'ec-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {
  /** The instance of Form that is used. */
  form: Form<any>;
  private group: FormGroup;
  /** You can use a field config directly as input */
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
  /** Emits when the form is submitted. The form can only be submitted if all Validators succeeded. */
  @Output('submit') submitted: EventEmitter<FormGroup> = new EventEmitter();
  /** Emits when a new instance of Form is present */
  @Output() onChange: EventEmitter<FormComponent> = new EventEmitter();

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
    if (!this.initItem()) {
      return;
    }
    this.form = new Form(this.item.resolve(), this.config);
    const control = {};
    this.form.fields.forEach((field) => {
      const validators = this.getValidators(field);
      control[field.property] = new FormControl(this.item.resolve(field.property), validators)
    });
    if (!this.group) {
      this.group = new FormGroup(control);
      this.group.valueChanges.subscribe((change) => {
        this.onChange.emit(this);
      });
    }
  }

  /** edits a given Item instance by using its config and body. */
  edit(item: Item<any>) {
    this.config = item.getConfig() || this.config;
    this.item = item;
    delete this.group;
    this.ngOnChanges();
  }

  /* clears the form and uses the given config (falls back to existing one). Renders an empty form. */
  create(config?: ItemConfig<any>) {
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
    //TODO loader?
    this.item.save(this.group.value).then((v) => {
      this.submitted.emit(this.group);
    });
  }

  /** Returns the current value of the form control group. */
  getValue() {
    return this.group.value;
  }
}
