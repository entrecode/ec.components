import { Observable, Subject } from 'rxjs';
import { ListConfig } from '..';

/** This class can be used to control the loading behaviour of external data. */
export class Pagination {
  /** The total number of items that is being paginated. It can be changed via setTotal. */
  protected total: number;
  /** The pagination config */
  protected config: ListConfig;
  private pages: Array<any>;
  private source = new Subject();
  /** Observable that is nexted when the pagination has changed. */
  public change$: Observable<any> = this.source.asObservable();

  /** You can init each Pagination instance with an optional config.
   * If no config is provided, it will default to ```{page: 1, size: 25}```. */
  constructor(config?: ListConfig, total?: number) {
    this.config = { page: 1, size: 25 };
    Object.assign(this.config, config);
    if (total) {
      this.setTotal(total);
    }
  }

  /** Retrieves the current page */
  getPage(): number {
    return this.config.page;
  }

  /** Retrieves the number of pages */
  getPages(): number {
    return this.pages ? this.pages.length : 0;
  }

  /** Loads the next page. Throws error if already on last page. */
  next(): void {
    if (this.isLast()) {
      return; //already last page
    }
    this.config.page += 1;
    this.load();
  }

  /** Loads the previous page. Throws error if already on first page. */
  prev(): void {
    if (this.isFirst()) {
      return; //already first page
    }
    this.config.page -= 1;
    this.load();
  }

  /**
   * Sets the total number of items and calculcates the page count.
   * */
  setTotal(total: number) {
    this.total = total;
    this.pages = new Array(Math.ceil(this.total / this.config.size));
    if (this.config.page !== 1 && this.config.page > this.pages.length) {
      this.config.page = this.pages.length || 1;
      this.load();
    }
  }

  /** Merges config and fires next on source */
  protected load(config?: ListConfig): void {
    if (config) {
      Object.assign(this.config, config);
    }
    this.source.next(this.config);
  }

  /** Selects the given page number */
  select(page: number): void {
    if (page === this.config.page) {
      return;
    }
    this.load({ page: page });
  }

  /** Loads the first Page */
  first(): void {
    this.load({ page: 1 });
  }

  /** Loads the last page */
  last() {
    if (!this.pages) {
      throw new Error(`Cannot load last page without knowing the item count.
        Call setTotal(itemCount) before loading.`);
    }
    this.load({ page: this.pages.length });
  }

  /** Returns true if the given page number is currently active.*/
  isActive(page: number): boolean {
    return this.config.page === page;
  }

  /** Returns true if the current page is the first one */
  isFirst(): boolean {
    return this.config.page === 1;
  }

  /** Returns true if the current page is the last one */
  isLast(): boolean {
    if (!this.pages) {
      return true;
    }
    return this.config.page === this.pages.length;
  }

  /** slices a given array according to the current pagination state */
  slice(items: Array<any>): Array<any> {
    return items.slice((this.config.page - 1) * this.config.size, (this.config.page) * this.config.size);
  }
}
