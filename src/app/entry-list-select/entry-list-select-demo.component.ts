import { Component, OnInit } from '@angular/core';
import { TypeConfigService } from '@ec.components/data';

@Component({
    selector: 'ec-entry-list-select-demo',
    templateUrl: './entry-list-select-demo.component.html'
})

export class EntryListSelectDemoComponent implements OnInit {
    constructor(public typeConfig: TypeConfigService) {
        this.typeConfig.set('entries', {
            /* input: EntryListSelectComponent */
            inputView: 'entry-list-select'
        });
    }
    ngOnInit() { }
}
