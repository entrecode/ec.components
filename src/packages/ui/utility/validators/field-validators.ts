import { emailValidator } from './email.validator';
import { ValidatorFn } from '@angular/forms';

export const FieldValidators: { [key: string]: ValidatorFn } = {
  email: emailValidator
};