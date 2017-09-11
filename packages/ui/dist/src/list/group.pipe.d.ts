import { PipeTransform } from '@angular/core';
import { Item } from '@ec.components/core';
/** The GroupPipe filters an array of Item instances by a given property value.
 * It is meant to be used to get only the items with the exact same value. */
export declare class GroupPipe implements PipeTransform {
    transform(items: Array<Item<any>>, property: string, value: any): any;
}
