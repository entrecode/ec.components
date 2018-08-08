import { Component, EventEmitter, Input, OnChanges, Output, ViewChild } from '@angular/core';
import { Item, ListConfig, Selection } from '../../../core';
import { PopComponent } from '../../../ui';
import { PopService } from '../../../ui/src/pop/pop.service';
import { SearchbarComponent } from '../../../ui/src/list/searchbar/searchbar.component';
import Resource from 'ec.sdk/lib/resources/Resource';
import { ResourceConfig } from '../resource-config/resource-config.service';
import Core from 'ec.sdk/lib/Core';

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
    @ViewChild(SearchbarComponent) searchbar: SearchbarComponent;
    lightModel: any;

    constructor(
        public resourceConfig: ResourceConfig,
        protected popService: PopService
    ) {
        super(popService);
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
    }
}