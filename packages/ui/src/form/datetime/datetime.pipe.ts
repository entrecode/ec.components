import { Pipe, PipeTransform } from '@angular/core';
import moment from 'moment-es6';

/** The GroupPipe filters an array of Item instances by a given property value.
 * It is meant to be used to get only the items with the exact same value. */
@Pipe({
  name: 'datetime'
})
export class DatetimePipe implements PipeTransform {
  transform(value: Date | string, pattern: string | string[] = 'DD.MM.YYYY', raw?: string): string {
    if (!value) {
      return '';
    }
    if (raw) {
      console.log('raw', raw);
    }
    const typed = moment(value, pattern, true);
    if (!typed.isValid()) {
      return '';
    }
    if (Array.isArray(pattern)) {
      pattern = pattern[0];
    }
    return moment(value).format(pattern);
  }
}
