import { Pipe, Injectable, PipeTransform } from '@angular/core';
import { Icon } from '../../../packages/ui/src/icon/icon.interface';


@Pipe({
    name: 'iconPipe'
})
@Injectable()
export class IconPipe implements PipeTransform {
    transform(array: Icon[], string: any): any {
        if (!string) {
            return array;
        }
        return array.filter(icon => icon.name.toLowerCase().indexOf(string.toLowerCase()) !== -1);
    }
};
