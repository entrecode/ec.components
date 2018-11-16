import { AfterViewInit, Component, EventEmitter, Input, Output, OnInit, OnChanges, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Item, List } from '@ec.components/core';
import { SymbolService } from '../../symbol/symbol.service';
import { Subject } from 'rxjs/Subject';
import { distinctUntilChanged } from 'rxjs/operators';
import { Focus } from '../../utility/focus/focus.interface';
import { ListComponent } from '@ec.components/ui';

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
  @Input() debounceTime = 300;
  /** Subject that is triggered on keyup */
  public keyup: Subject<any> = new Subject<any>();
  /** Subject that is nexted when something is pasted */
  public paste: Subject<any> = new Subject<any>();
  /** The list that should be filtered */
  @Input() list: List<any>;
  /** The list component that should be controled */
  @Input() listComponent: ListComponent<any>;
  /** Output that emits when enter is pressed on a selected item */
  @Output() selected: EventEmitter<any> = new EventEmitter();

  constructor(public route: ActivatedRoute, public symbol: SymbolService) {
    this.defaultPlaceholder = this.symbol.resolve('searchbar.placeholder');
    this.paste.asObservable()
      .subscribe((e) => {
        const pasted = (e.clipboardData).getData('text');
        this.filterList(pasted, true);
      });

    this.keyup.asObservable().debounceTime(this.debounceTime)
      .pipe(distinctUntilChanged())
      .subscribe(value => this.filterList(value));

    this.route.params
      .subscribe(() => {
        if (this.autofocus) {
          this.focusEvent.emit(true);
        }
        this.clear();
      })
  }

  initList() {
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
    this.query = '';
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
  filterList(value, paste = false) {
    if (!this.list) {
      console.warn('could not search: no list given!', this.list);
      return;
    }
    if (!this.property && !this.list.config.label) {
      console.warn('cannot filter list: no property set and no label property configured');
      return;
    }
    if (paste && this.list.config.identifierPattern) {
      if (value.match(this.list.config.identifierPattern)) {
        this.selected.emit(new Item({
          [this.list.config.identifier]: value,
        }, this.list.config));
        /* return true; */
      }
    }
    this.list.filter(this.property || this.list.config.label, value);
  }

  /** called on keydown. if arrow keys are pressed, toggle selection of next/prev elements of list */
  arrowNavigation(e) {
    if (!this.listComponent || !this.listComponent.selection) {
      console.warn('Arrow navigation is disabled: no listComponent given to searchbar');
      return;
    }
    switch (e.key) {
      case 'ArrowUp':
        this.listComponent.selectPrev();
        e.preventDefault();
        break;
      case 'ArrowDown':
        this.listComponent.selectNext();
        e.preventDefault();
        break;
      case 'Enter':
        if (!this.listComponent.selection.isEmpty()) {
          this.selected.emit(this.listComponent.selection.items[0]);
        }
        break;
    }
  }
}
