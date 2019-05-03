import { emailValidator } from './email.validator';
import { ValidatorFn } from '@angular/forms';

/** Groups together all validators that are meant to be used on fields. */
export const FieldValidators: { [key: string]: ValidatorFn } = {
  email: emailValidator,
};
