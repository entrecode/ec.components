import { Pipe, Injectable, PipeTransform } from '@angular/core';
import { Symbol } from './symbol.interface';

@Pipe({
    name: 'localePipe'
})
@Injectable()
export class LocalePipe implements PipeTransform {
    transform(name: string): string {
        if (!name) {
            return '';
        }
        return '';
    }
};
