import { Injectable } from '@angular/core';
import { Form } from '../../core/form/form';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators
} from "@angular/forms";
import { Field } from '../../core/field/field';

/** This service is the interface between Angular Forms and ec.components core classes. */
@Injectable()
export class FormService {

  /** Initializes the form group from the form fields*/
  public getGroup(form: Form<any>) {
    const control = {};
    form.fields.forEach((field) => {
      const validators = this.getValidators(field);
      control[field.property] = new FormControl(form.getValue(field.property), validators)
    });
    return new FormGroup(control);
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

  /** Returns a Validation function from the given field (using field.validate) */
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

}