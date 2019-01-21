import { FormControl } from '@angular/forms';

/** TODO use this.sdk.accounts.emailAvailable */
export const emailAvailable = (control: FormControl, delay: number = 500) => {
  /*return Datamanager.api().emailAvailable(control.value).then((available) => {
    if (available) {
      return null;
    }
    return { emailUnavailable: true };
  });*/
};
