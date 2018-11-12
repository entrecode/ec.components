import { Component, OnInit } from '@angular/core';
import { EntryListSelectComponent } from '@ec.components/data/src/entry-list-select/entry-list-select.component';
import { TypeConfigService } from '@ec.components/data/src/model-config/type-config.service';

@Component({
    selector: 'ec-entry-list-select-demo',
    templateUrl: './entry-list-select-demo.component.html'
})

export class EntryListSelectDemoComponent implements OnInit {
    constructor(public typeConfig: TypeConfigService) {
        this.typeConfig.set('entries', {
            input: EntryListSelectComponent
        })
        /* this.typeConfig.set('dmAsset', {
            view: 'preview'
        }); */
    }
    ngOnInit() { }
}
