import { Injectable } from '@angular/core';
import { Symbol } from './symbol.interface';
import { de } from './de';
import { en } from './en';
/** Service to register symbols for localization. The default set is de.
 * <example-url>https://components.entrecode.de/ui/symbols?e=1</example-url>
*/
// https://github.com/ng-packagr/ng-packagr/issues/696
@Injectable()
export class SymbolService {
    /** The current symbol set that is registered to the service. It will be used to resolve strings from. */
    public static sets: { [key: string]: Symbol[] } = {
        en, de
    };
    public static registry: Symbol[] = Object.keys(SymbolService.sets).length ? SymbolService.sets[Object.keys(SymbolService.sets)[0]] : [];

    public registry: Symbol[];
    public sets: { [key: string]: Symbol[] } = {
        en, de
    };

    /** finds a symbol in the registry by name */
    static get(name: string, registry = SymbolService.registry): Symbol {
        const symbol = registry.find(s => s.name === name);
        return symbol;
    }

    static resolve(name: string, registry = SymbolService.registry): string {
        const symbol = SymbolService.get(name, registry);
        if (symbol) {
            return symbol.content;
        }
        return null;
    }
    /** Uses the given symbol set to enhance the current registry.
     * All duplicates will be overriden. Non specified symbols will stay in the registry. */
    static set(symbols: Symbol[] = [], registry = SymbolService.registry) {
        symbols.map(symbol => {
            const index = registry.indexOf(this.get(symbol.name));
            if (index === -1) {
                registry.push(symbol);
            } else {
                registry[index] = symbol;
            }
        });
    }

    constructor() {
        this.registry = Object.keys(this.sets).length ? this.sets[Object.keys(this.sets)[0]] : [];
    }

    /** Uses the given symbol set. Replaces registry. */
    use(symbols: Symbol[]) {
        this.registry = symbols;
    }

    /** uses the set with the given key */
    useSet(key: string) {
        if (!this.sets[key]) {
            throw new Error('the symbol set with the key "' + key + '" does not exist');
        }
        this.use(this.sets[key]);
    }

    /** finds a symbol in the registry by name */
    get(name: string): Symbol {
        return SymbolService.get(name, this.registry);
    }

    /** resolves a symbols content by name */
    resolve(name: string): string {
        return SymbolService.resolve(name, this.registry);
    }

    /** Uses the given symbol set to enhance the current registry.
     * All duplicates will be overriden. Non specified symbols will stay in the registry. */
    set(symbols: Symbol[] = []) {
        SymbolService.set(symbols, this.registry);
    }
}
