import { Pipe, PipeTransform } from '@angular/core';
/** This pipe slices an array after the nth item */
@Pipe({
  name: 'maxItems',
})
export class MaxItemsPipe implements PipeTransform {
  transform(array: Array<any> = [], maxItems: number, start: number = 0): any {
    return array.slice(start, maxItems);
  }
}
