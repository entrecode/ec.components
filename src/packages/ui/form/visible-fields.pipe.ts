import { Pipe, PipeTransform } from '@angular/core';
import { Field } from '../../core/field/field';

/** The GroupPipe filters an array of Item instances by a given property value.
 * It is meant to be used to get only the items with the exact same value. */
@Pipe({
  name: 'visibleFields'
})
export class VisibleFieldsPipe implements PipeTransform {
  transform(fields: Array<Field<any>>, type: string = 'form'): any {
    return fields.filter((field) => {
      return field.form !== false;
    });
  }
}
