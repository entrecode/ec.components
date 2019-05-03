/**
 * Created by felix on 23.05.17.
 */
import { Directive, Input, OnChanges } from '@angular/core';
import { LoaderComponent, WithLoader, NotificationsService } from '@ec.components/ui';
import EntryList from 'ec.sdk/lib/resources/publicAPI/EntryList';
import EntryResource from 'ec.sdk/lib/resources/publicAPI/EntryResource';
import { SdkService } from '../sdk/sdk.service';
import { SymbolService } from '@ec.components/ui';

// import { filterOptions } from 'ec.sdk/lib/resources/ListResource';

/** Loads an entryList of a given model with the given config.
 * <example-url>https://components.entrecode.de/entries/entries?e=1</example-url>
 */
@Directive({
  selector: '[ecEntries]',
  exportAs: 'ecEntries',
})
export class EntriesDirective implements OnChanges, WithLoader {
  /** The promise of the entryList call. */
  private promise: any;
  /** The model to load from. */
  @Input() model: string;
  /** The filterOptions for loading. */
  @Input() options: any = {}; // TODO cannot import #simibug : filterOptions;
  /** If true, calling next will append the next page to the items, making the list grow.*/
  @Input() endless = false;
  /** Should the entries be loaded immediately? Defaults to true */
  @Input() autoload: boolean;
  /** The loader that should be used. */
  @Input() loader: LoaderComponent;
  /** The current loaded entryList */
  private entryList: EntryList;
  public items: EntryResource[] = [];

  /** Injects sdk */
  constructor(
    private sdk: SdkService,
    public symbol: SymbolService,
    public notificationService: NotificationsService,
  ) {}

  /** When the model is known, the entryList will be loaded. */
  ngOnChanges() {
    if (!this.model) {
      return;
    }
    if (this.endless && this.options.page && this.options.page > 1) {
      console.warn('cannot init ecEntries on page!==1 with strategy=endless');
    }
    if (this.autoload !== false) {
      this.load();
    }
  }

  /** Loads the entries */
  load() {
    this.promise = this.sdk.api
      .entryList(this.model, this.options)
      .then((list) => this.useList(list))
      .catch((error) =>
        this.notificationService.emit({
          title: this.symbol.resolve('entries.load.error'),
          error,
        }),
      );
    if (this.loader) {
      this.loader.wait(this.promise);
    }
    return this.promise;
  }

  useList(entryList) {
    this.entryList = entryList;
    const items = this.entryList.getAllItems();
    if (this.endless) {
      this.items = this.items.concat(items);
      this.items = this.items.filter((item) => this.items.find((_item) => _item.id === item.id));
    } else {
      this.items = this.entryList.getAllItems();
    }
  }

  next() {
    this.promise = this.entryList.followNextLink().then((list) => this.useList(list));
    if (this.loader) {
      this.loader.wait(this.promise);
    }
  }

  prev() {
    this.promise = this.entryList.followPrevLink().then((list) => this.useList(list));
    if (this.loader) {
      this.loader.wait(this.promise);
    }
  }

  isLast() {
    return !this.entryList || !this.entryList.hasNextLink();
  }

  isFirst() {
    if (this.endless) {
      return true;
    }
    return !this.entryList || !this.entryList.hasFirstLink();
  }

  /** This helper returns all items of the current entryList. */
  entries() {
    if (!this.entryList) {
      return [];
    }
    return this.entryList.getAllItems();
  }
}
