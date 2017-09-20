import { Pipe, PipeTransform } from '@angular/core';
import { Field } from '@ec.components/core/src/field/field';

/** The VisibleFieldsPipe filters an array of Fields to only give back the ones that have form NOT set to false. */
@Pipe({
  name: 'visibleFields'
})
export class VisibleFieldsPipe implements PipeTransform {
  /** Filters out all fields that should not be displayed in a regular form */
  transform(fields: Array<Field>): any {
    return fields.filter((field) => {
      return field.form !== false;
    });
  }
}
