import { SymbolService } from '@ec.components/ui/src/symbol/symbol.service';

/** Configuration for a pagination component */
export class PaginationConfig {
    /** Range of displayed pages in the UI. Controls the number of pages before and after the current page. Defaults to 3.
 * NOTE: For a smoother UX, there are minimum ```2 * range + 1``` pages visible.*/
    range = 2;
    /** Hides first and last Link */
    hideFirstLast: boolean;
    /** Hides pages */
    hidePages: boolean;
    /** The constructor assigns the config */
    constructor(config: PaginationConfig) {
        Object.assign(this, config);
    }
}
