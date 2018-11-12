import { Component, EventEmitter, Input, OnChanges, Output, ViewChild, HostBinding, ElementRef } from '@angular/core';
import { Item, ListConfig, Selection } from '@ec.components/core';
import { PopComponent } from '@ec.components/ui';
import { PopService } from '@ec.components/ui/src/pop/pop.service';
import EntryResource from 'ec.sdk/lib/resources/publicAPI/EntryResource';
import { SearchbarComponent } from '@ec.components/ui/src/list/searchbar/searchbar.component';
import { ModelConfigService } from '../model-config/model-config.service';

/** A Pop that contains an entry list. TODO: add demo */
@Component({
    selector: 'ec-entry-list-pop',
    templateUrl: './entry-list-pop.component.html',

})
export class EntryListPopComponent extends PopComponent implements OnChanges {
    @Input() model: string;
    @Input() config: ListConfig<EntryResource>;
    @Input() selection: Selection<EntryResource>;
    @Output() columnClicked: EventEmitter<Item<EntryResource>> = new EventEmitter();
    @ViewChild(SearchbarComponent) searchbar: SearchbarComponent;
    /** Set host class to make sure the type is used */
    @HostBinding('class') class = 'dialog-wrapper';
    lightModel: any;

    constructor(
        public modelConfig: ModelConfigService,
        protected popService: PopService,
        public elementRef: ElementRef
    ) {
        super(popService, elementRef);
    }

    ngOnChanges() {
        if (this.model) {
            this.modelConfig.getLightModel(this.model).then(model => this.lightModel = model);
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
    }
}
