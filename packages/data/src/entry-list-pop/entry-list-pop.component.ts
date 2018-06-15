import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { Item, ListConfig, Selection } from '@ec.components/core';
import { PopComponent } from '@ec.components/ui';
import { PopService } from '@ec.components/ui/src/pop/pop.service';
import EntryResource from 'ec.sdk/lib/resources/publicAPI/EntryResource';
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
