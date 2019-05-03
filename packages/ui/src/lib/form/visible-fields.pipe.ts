import { Pipe, PipeTransform } from '@angular/core';
import { Field, Form } from '@ec.components/core';
import { FormService } from './form.service';

/** The VisibleFieldsPipe filters an array of Fields to only give back the ones that have form NOT set to false. */
@Pipe({
  name: 'visibleFields',
})
export class VisibleFieldsPipe implements PipeTransform {
  constructor(public formService: FormService) {}
  /** Filters out all fields that should not be displayed in a regular form */
  transform(fields: Array<Field>, form: Form<any>): any {
    return fields.filter((field) => this.formService.shouldBePartOfForm(field, form) && !field.hideInForm);
  }
}
