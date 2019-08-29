import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  OnChanges,
  Output,
  ViewChild,
} from '@angular/core';
import { Item, Selection } from '@ec.components/core';
import { PopComponent, PopService, SearchbarComponent } from '@ec.components/ui';
import { CrudConfig } from '../crud/crud-config.interface';
import { ModelConfigService } from '../model-config/model-config.service';
import EntryResource from 'ec.sdk/lib/resources/publicAPI/EntryResource';

/** A Pop that contains an entry list. TODO: add demo */
@Component({
  selector: 'ec-entry-list-pop',
  templateUrl: './entry-list-pop.component.html',
})
export class EntryListPopComponent extends PopComponent implements OnChanges {
  @Input() model: string;
  @Input() config: CrudConfig<EntryResource>;
  @Input() selection: Selection<EntryResource>;
  @Output() columnClicked: EventEmitter<Item<EntryResource>> = new EventEmitter();
  @ViewChild(SearchbarComponent, { static: false }) searchbar: SearchbarComponent;
  /** Set host class to make sure the type is used */
  @HostBinding('class') class = 'ec-list-pop modal-wrapper modal-wrapper_backdrop';
  lightModel: any;

  constructor(
    public modelConfig: ModelConfigService,
    public popService: PopService,
    public elementRef: ElementRef,
    public cdr: ChangeDetectorRef,
  ) {
    super(popService, elementRef, cdr);
  }

  ngOnChanges() {
    if (this.model) {
      this.modelConfig.getLightModel(this.model).then((model) => (this.lightModel = model));
    }
    this.config = Object.assign({}, this.config || {}, { hidePagination: true, disableHeader: true });
  }

  /** emits columnClicked event or toggles selection if no observers. */
  select(item) {
    if (this.columnClicked.observers.length) {
      this.columnClicked.emit(item);
    } else if (this.selection) {
      this.selection.toggle(item);
    }
    // this.searchbar.focusEvent.emit(true);
  }
  getHeader(entryList) {
    const label = this.config.singularLabel || `${entryList.model}`;
    if (!this.selection || this.selection.isEmpty()) {
      return `${label}`;
    }
    return `${label}: ${this.selection.items.length} selected`;
  }
}
