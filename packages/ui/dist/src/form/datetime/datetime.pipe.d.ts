import { PipeTransform } from '@angular/core';
/** The GroupPipe filters an array of Item instances by a given property value.
 * It is meant to be used to get only the items with the exact same value. */
export declare class DatetimePipe implements PipeTransform {
    transform(value: Date | string, pattern?: string | string[], raw?: string): string;
}
