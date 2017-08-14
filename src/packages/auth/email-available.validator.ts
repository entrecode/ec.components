import { FormControl } from '@angular/forms';

export const emailAvailable = (control: FormControl, delay: number = 500) => {
  //TODO use this.sdk.accounts.emailAvailable
  /*return Datamanager.api().emailAvailable(control.value).then((available) => {
    if (available) {
      return null;
    }
    return { emailUnavailable: true };
  });*/
};