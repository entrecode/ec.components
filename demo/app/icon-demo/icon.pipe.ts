import { Pipe, Injectable, PipeTransform } from '@angular/core';
import { Symbol } from '../../../packages/ui/src/symbol/symbol.interface';

@Pipe({
    name: 'iconPipe'
})
@Injectable()
export class IconPipe implements PipeTransform {
    transform(array: Symbol[], string: any): any {
        if (!string) {
            return array;
        }
        return array.filter(icon => icon.name.toLowerCase().indexOf(string.toLowerCase()) !== -1);
    }
};
