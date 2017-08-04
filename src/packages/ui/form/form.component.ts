import { ChangeDetectorRef, Component, EventEmitter, Input, Output, } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';
import { Field, Form, FormConfig, Item } from '../../core';

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
  /** Emits when the form is submitted. The form can only be submitted if all Validators succeeded. */
  @Output('onSubmit') submit: EventEmitter<FormGroup> = new EventEmitter();
  /** Emits when a new instance of Form is present */
  @Output() onChange: EventEmitter<FormComponent> = new EventEmitter();

  /** The constructor injects the FormBuilder. */
  constructor(private fb: FormBuilder, private cdr: ChangeDetectorRef) {
  }

  /** On change, the form instance is (re)created by combining all inputs. If no item is given, an empty form is created using the config. You can also pass just an item to use its config and body.*/
  ngOnChanges() {
    if (this.item) {
      Object.assign(this, this.item);
    } else if (!this.config) {
      return;
    }
    if (!this.item) {
      this.item = new Item({}, this.config);
    }
    this.form = new Form(this.item.resolve(), this.config);
    const control = {};
    this.form.fields.forEach((field) => {
      const validators = this.getValidators(field);
      control[field.property] = new FormControl(this.item.resolve(field.property), validators)
    });
    this.group = new FormGroup(control);

    this.onChange.emit(this);
  }

  edit(item: Item<any>) {
    this.config = item.getConfig() || this.config;
    this.item = item;
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
  onSubmit() {
    this.item.save(this.group.value);
    this.submit.emit(this.group);
  }
}
