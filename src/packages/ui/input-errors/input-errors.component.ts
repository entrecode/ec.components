import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { errors } from './input-errors';

/** This component keeps track of a form control's errors and displays them. It is meant to be used beneath a form control. */
@Component({
  selector: 'ec-input-errors',
  templateUrl: './input-errors.component.html',
  styleUrls: ['./input-errors.component.scss']
})
export class InputErrorsComponent {
  /** The form control that should be tracked */
  @Input() control: FormControl;
  /** Imported error messages. */
  errors = errors;

  /** This method will iterate over the control errors and generate objects for the template. */
  private getErrors() {
    return Object.keys(this.control.errors).reduce((errs, key) => {
      let message;
      if (key === 'custom') {
        message = this.control.errors[key];
      } else {
        message = errors[key] || 'Ungültige Eingabe';
      }
      errs.push({
        key: key,
        error: this.control.errors[key],
        message
      });
      return errs;
    }, []);
  }

}
