import { Pipe, Injectable, PipeTransform } from '@angular/core';


@Pipe({
    name: 'stringPipe'
})
@Injectable()
export class StringPipe implements PipeTransform {
    transform(array: string[], string: any): any {
        if (!string) {
            return array;
        }
        return array.filter(icon => icon.toLowerCase().indexOf(string.toLowerCase()) !== -1);
    }
};
