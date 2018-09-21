import { Component, EventEmitter, Input, OnChanges, Output, ViewChild, HostBinding } from '@angular/core';
import { Item, ListConfig, Selection } from '../../../core';
import { PopComponent } from '../../../ui';
import { PopService } from '../../../ui/src/pop/pop.service';
import EntryResource from 'ec.sdk/lib/resources/publicAPI/EntryResource';
import { SearchbarComponent } from '../../../ui/src/list/searchbar/searchbar.component';
import { ModelConfigService } from '../model-config/model-config.service';

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
        protected popService: PopService
    ) {
        super(popService);
    }

    ngOnChanges() {
        if (this.model) {
            this.modelConfig.getLightModel(this.model).then(model => this.lightModel = model);
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
    }
}
