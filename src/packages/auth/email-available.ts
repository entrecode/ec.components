import { FormControl } from '@angular/forms';
import { Datamanager } from '../data/datamanager/datamanager';

export const emailAvailable = (control: FormControl, delay: number = 500) => {
  return Datamanager.api().emailAvailable(control.value).then((available) => {
    if (available) {
      return null;
    }
    return { emailUnavailable: true };
  });
};

