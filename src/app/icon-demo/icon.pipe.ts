import { Pipe, Injectable, PipeTransform } from '@angular/core';
import { Symbol } from '@ec.components/ui';

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
}
