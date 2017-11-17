import { Observable } from 'rxjs/Observable';
import { ListConfig } from '../list/list-config.interface';
/** This class can be used to control the loading behaviour of external data. */
export declare class Pagination<T> {
    /** The total number of items that is being paginated. It can be changed via setTotal. */
    protected total: number;
    /** The pagination config */
    protected config: ListConfig<T>;
    /** Array to iterate over the number of pages. */
    pages: Array<any>;
    /** Subject for tracking changes. */
    private change;
    /** Observable that is nexted when the pagination has changed. */
    change$: Observable<any>;
    /** You can init each Pagination instance with an optional config.
     * If no config is provided, it will default to ```{page: 1, size: 25}```. */
    constructor(config?: ListConfig<T>, total?: number);
    /** Retrieves the current page */
    getPage(): number;
    /** Retrieves the number of pages */
    getPages(): number;
    /** Loads the next page. Throws error if already on last page. */
    next(): void;
    /** Loads the previous page. Throws error if already on first page. */
    prev(): void;
    /**
     * Sets the total number of items and calculcates the page count.
     * */
    setTotal(total: number): void;
    /** Merges config and fires next on change */
    protected load(config?: ListConfig<T>): void;
    /** Selects the given page number */
    select(page: number): void;
    /** Loads the first Page */
    first(): void;
    /** Loads the last page */
    last(): void;
    /** Returns true if the given page number is currently active.*/
    isActive(page: number): boolean;
    /** Returns true if the current page is the first one */
    isFirst(): boolean;
    /** Returns true if the current page is the last one */
    isLast(): boolean;
    /** slices a given array according to the current pagination state */
    slice(items: Array<any>): Array<any>;
}
