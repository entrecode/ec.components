import { Injectable } from '@angular/core';
import { Symbol } from './symbol.interface';
import de from './de';
import en from './en';
/** Service to register symbols for localization. The default set is de. */
@Injectable()
export class SymbolService {
    /** The current symbol set that is registered to the service. It will be used to resolve strings from. */
    public registry: Symbol[];
    public sets: { [key: string]: Symbol[] } = {
        en, de
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
        return this.registry.find(symbol => symbol.name === name);
    }

    /** resolves a symbols content by name */
    resolve(name: string): string {
        const symbol = this.get(name);
        if (symbol) {
            return symbol.content;
        }
        return null;
    }

    /** Uses the given symbol set to enhance the current registry. 
     * All duplicates will be overriden. Non specified symbols will stay in the registry. */
    set(symbols: Symbol[] = []) {
        symbols.map(symbol => {
            const index = this.registry.indexOf(this.get(symbol.name));
            if (index === -1) {
                this.registry.push(symbol);
            } else {
                this.registry[index] = symbol;
            }
        })
    }
}
