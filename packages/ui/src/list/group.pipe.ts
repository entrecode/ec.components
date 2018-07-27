import { Pipe, PipeTransform } from '@angular/core';
import { Item } from '../../../core';

/** The GroupPipe filters an array of Item instances by a given property value.
 * It is meant to be used to get only the items with the exact same value. */
@Pipe({
  name: 'group'
})
export class GroupPipe implements PipeTransform {
  transform(items: Array<Item<any>>, property: string, value: any): any {
    if (!property) {
      return items;
    }
    return items.filter((item) => {
      return item.group(property) === value;
    });
  }
}
