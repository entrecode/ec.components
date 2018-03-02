import { Pipe, Injectable, PipeTransform } from '@angular/core';
import { Symbol } from './symbol.interface';
import { SymbolService } from './symbol.service';

@Pipe({
    name: 'symbol'
})
@Injectable()
export class SymbolPipe implements PipeTransform {
    constructor(private symbol: SymbolService) { }
    transform(name: string): string {
        if (!name) {
            return '';
        }
        return this.symbol.resolve(name) || '';
    }
};
