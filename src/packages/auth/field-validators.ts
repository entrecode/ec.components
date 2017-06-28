import { FormControl, Validators } from '@angular/forms';
import { Datamanager } from '../data';

/**
 * Created by felix on 25.04.17.
 */
export const FieldValidators = {
  email: Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/),
  emailAvailable: (control: FormControl, delay: number = 500) => {
    return Datamanager.api().emailAvailable(control.value).then((available) => {
      if (available) {
        return null;
      }
      return { emailUnavailable: true };
    });
  }
};