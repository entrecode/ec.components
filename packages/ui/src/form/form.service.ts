import { Injectable } from '@angular/core';
import { Form } from '../../../core/src/form/form';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';
import { Field } from '../../../core/src/field/field';

/** This service is the interface between Angular Forms and ec.components core classes. */
@Injectable()
export class FormService {

  /** Returns true if the field should be included in the form.
   * Decides based on field config values form, edit and create */
  public shouldBePartOfForm(field, form) {
    if (field.create === false && !form.getBody()) {
      return false;
    }
    if (field.edit === false && !!form.getBody()) {
      return false;
    }
    return field.form !== false;
  }

  /** Initializes the form group from the form fields*/
  public getGroup(form: Form<any>) {
    const control = {};
    form.fields.filter((field) => this.shouldBePartOfForm(field, form))
      .forEach((field) => {
        const validators = this.getValidators(field);
        control[field.property] = new FormControl(form.getValue(field.property), validators)
        // TODO use { updateOn: blur } when updating to angular 5.0.0
        // see https://github.com/angular/angular/commit/333a708bb632d4258ecb5fd4a0e86229fe9d26e4
      });
    return new FormGroup(control);
  }

  /** adds a new field to a form. handles form group and control */
  public addField(field: Field, form: Form<any>, group: FormGroup) {
    const validators = this.getValidators(field);
    const control = new FormControl(form.getValue(field.property), validators);
    group.addControl(field.property, control);
  }

  /** Extracts all validators from a given Field instance. */
  getValidators(field: Field): ValidatorFn[] {
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
  validateFactory(field: Field): ValidationErrors | null {
    return (control: AbstractControl) => {
      if (!field.validate) {
        return;
      }
      const error = field.validate(control.value, field);
      if (error) {
        return {
          custom: error
        }
      }
    }
  }

}
