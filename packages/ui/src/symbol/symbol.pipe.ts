import { Pipe, Injectable, PipeTransform } from '@angular/core';
import { Symbol } from './symbol.interface';
import { SymbolService } from './symbol.service';

/** The symbol pipe translates Symbol names to their content.
 *
 * ```html
 * {{ 'entry.saved' | symbol }}
 * ```
 *
 * See SymbolService for more info about Symbols.
 */
@Pipe({
    name: 'symbol'
})
@Injectable()
export class SymbolPipe implements PipeTransform {
    /** Depends on the SymbolService */
    constructor(private symbol: SymbolService) { }
    /** Calls SymbolService.resolve with the given name */
    transform(name: string): string {
        if (!name) {
            return '';
        }
        return this.symbol.resolve(name) || '';
    }
};
