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
import { Item, ListConfig, Selection } from '@ec.components/core';
import { PopComponent, PopService, SearchbarComponent } from '@ec.components/ui';
import Core from 'ec.sdk/lib/Core';
import Resource from 'ec.sdk/lib/resources/Resource';
import { ResourceConfig } from '../resource-config/resource-config.service';

@Component({
  selector: 'ec-resource-list-pop',
  templateUrl: './resource-list-pop.component.html',
})
export class ResourceListPopComponent extends PopComponent implements OnChanges {
  @Input() relation: string;
  @Input() api: Core;
  @Input() config: ListConfig<Resource>;
  @Input() selection: Selection<Resource>;
  @Output() columnClicked: EventEmitter<Item<Resource>> = new EventEmitter();
  @Output() pasted: EventEmitter<Item<Resource>> = new EventEmitter();
  @ViewChild(SearchbarComponent) searchbar: SearchbarComponent;
  /** Set host class to make sure the type is used */
  @HostBinding('class') class = 'toast-wrapper';
  lightModel: any;

  constructor(
    public resourceConfig: ResourceConfig,
    public popService: PopService,
    public elementRef: ElementRef,
    public cdr: ChangeDetectorRef,
  ) {
    super(popService, elementRef, cdr);
  }

  ngOnChanges() {
    if (this.relation) {
      this.config = Object.assign({}, this.config || {}, this.resourceConfig.get(this.relation));
    }
    if (this.config) {
      this.config = Object.assign({ hidePagination: true, disableHeader: true }, this.config);
    }
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
}
