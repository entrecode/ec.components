import { AfterViewInit, Component, EventEmitter, Input, Output, OnInit, OnChanges, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Item, List } from '@ec.components/core';
import { SymbolService } from '../../symbol/symbol.service';
import { Subject } from 'rxjs/Subject';
import { distinctUntilChanged } from 'rxjs/operators';
import { Focus } from '../../utility/focus/focus.interface';
import { ListComponent } from '../list.component';

/** Genereic Searchbar component. Filters a given list its label property (or given property).
 * Supports autofocus and arrow navigation. */
@Component({
  selector: 'ec-searchbar',
  templateUrl: 'searchbar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class SearchbarComponent implements AfterViewInit, Focus, OnInit, OnChanges {
  /** Searchbar placeholder */
  @Input() placeholder: string;
  /** Default placeholder when no placeholder is given */
  @Input() defaultPlaceholder: string;
  /** The input query that should be prefilled */
  @Input() public query: string;
  /** Property that should be filtered */
  @Input() property: string;
  /** If true, the input will be autofocused */
  @Input() autofocus = true;
  /** The event that focuses the input */
  public focusEvent: EventEmitter<boolean> = new EventEmitter();
  /** Delay until search is fired */
  @Input() debounceTime = 200;
  /** Subject that is triggered on keyup */
  public queryValue: Subject<any> = new Subject<any>();
  /** Subject that is triggered on key trigger */
  public keySubject: Subject<any> = new Subject<any>();
  /** Subject that is nexted when something is pasted */
  public paste: Subject<any> = new Subject<any>();
  /** The list that should be filtered */
  @Input() list: List<any>;
  /** The list component that should be controled */
  @Input() listComponent: ListComponent<any>;
  /** Output that emits when enter is pressed on a selected item */
  @Output() selected: EventEmitter<any> = new EventEmitter();
  /** Emits when enter key is pressed */
  @Output() enter: EventEmitter<any> = new EventEmitter();
  /** Emits on keyup*/
  @Output() keyup: EventEmitter<any> = new EventEmitter();
  /** Emits on keypress */
  @Output() keypressed: EventEmitter<any> = new EventEmitter();
  /** Emits on blur */
  @Output() blur: EventEmitter<any> = new EventEmitter();
  /** Emits on focus */
  @Output() focus: EventEmitter<any> = new EventEmitter();
  /** Emits on paste */
  @Output() pasted: EventEmitter<any> = new EventEmitter();
  /** Emitted when the query changes, including debounce */
  @Output() queryChanged: EventEmitter<any> = new EventEmitter();
  /** timestamp of latest keypress that has been emitted */
  latestQuery;

  constructor(public route: ActivatedRoute, public symbol: SymbolService) {
    this.defaultPlaceholder = this.symbol.resolve('searchbar.placeholder');
    this.queryValue.next('');
    this.paste.asObservable()
      .subscribe((e) => {
        const pasted = (e.clipboardData).getData('text');
        if (this.pasted.observers.length) {
          this.pasted.emit(e);
        } else if (this.list.config.identifierPattern && pasted.match(this.list.config.identifierPattern)) {
          this.preventDefault(e);
          this.clear();
          this.selected.emit(new Item({
            [this.list.config.identifier]: pasted,
          }, this.list.config));
        }
      });

    this.queryValue.asObservable().debounceTime(this.debounceTime)
      .pipe(distinctUntilChanged())
      .subscribe(value => this.filterList(value));

    this.keySubject.asObservable()
      .debounceTime(100)
      .subscribe(data => {
        this.keypressed.emit(data);
      });

    this.route.params
      .subscribe(() => {
        if (this.autofocus) {
          this.focusEvent.emit(true);
        }
        this.clear();
      })
  }

  updatedList(list) {
    this.list = list;
    this.updateQueryFromOutside(list.getFilterValue(this.property) || '');
    if (this.autofocus) {
      this.focusEvent.emit(true);
    }
  }

  initList() {
    if (this.listComponent && this.listComponent.list) {
      this.list = this.listComponent.list;
    }
    if (!this.list) {
      return;
    }
    this.property = this.property || this.list.config.label;
    if (!this.property) {
      console.warn('searchbar is missing property to filter..');
    }
    const list = this.list;
    if (!list || !list.change$) {
      // console.warn('no change listener', list);
      return;
    }
    list.change$.subscribe(newList => {
      if (!this.list.config.filter || !this.list.config.filter[this.property]) {
        this.clear();
      }
    });
  };

  ngOnInit() {
    this.initList();
  }

  ngOnChanges() {
    this.initList();
  }

  /** clears the input query */
  clear() {
    this.updateQueryFromOutside('');
  }

  /** Updates the query string if the change happened outside */
  updateQueryFromOutside(query) {
    if (query !== this.latestQuery) {
      this.query = query;
    }
  }

  /** prevents the event default and disables propagation */
  preventDefault(e) {
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();
  }

  /** After the view is ready, the searchbar needs to be focused (if autofocus is true) */
  ngAfterViewInit() {
    if (this.autofocus) {
      this.focusEvent.emit(true);
    }
  }

  /** Filters the list by the given value, either uses property or list.config.label.
   * If paste is true and the value matches the list.config.identifierPattern,
   * select is emitted immediately with a pseudo item containing the value as item identifier. */
  filterList(value) {
    // this.query = value;
    this.latestQuery = value;

    this.updateQueryFromOutside(value);
    if (this.queryChanged.observers.length) {
      this.queryChanged.emit(value);
      return;
    }
    if (!this.list) {
      console.warn('could not search: no list given!', this.list);
      return;
    }
    if (!this.property && !this.list.config.label) {
      console.warn('cannot filter list: no property set and no label property configured');
      return;
    }
    this.list.filter(this.property || this.list.config.label, value);
  }

  keyupEvent(e) {
    if (['Escape',
      'Enter',
      'ArrowLeft',
      'ArrowRight',
      'ArrowUp',
      'ArrowDown'].includes(e.key)) {
      return;
    }
    this.queryValue.next(e.target.value);
    this.keyup.emit(e);
    this.preventDefault(e);
  }

  /** called on keydown. if arrow keys are pressed, toggle selection of next/prev elements of list */
  handleKey(e, listComponent = this.listComponent) {
    this.keySubject.next({ event: e, query: this.query });
    if (!listComponent || !listComponent.selection) {
      // console.warn('Arrow navigation is disabled: no listComponent given to searchbar');
      return;
    }
    switch (e.key) {
      case 'ArrowUp':
        listComponent.focusPrev();
        this.preventDefault(e);
        break;
      case 'ArrowDown':
        listComponent.focusNext();
        this.preventDefault(e);
        break;
      case 'ArrowRight':
        listComponent.list.pagination.next();
        break;
      case 'ArrowLeft':
        listComponent.list.pagination.prev();
        break;
      case 'Enter':
        if (listComponent.focusItem) {
          if (this.selected.observers.length) {
            this.selected.emit(listComponent.focusItem);
          } else {
            listComponent.selection.toggle(listComponent.focusItem);
          }
        }
        this.enter.emit(e);
        break;
    }
  }
}
