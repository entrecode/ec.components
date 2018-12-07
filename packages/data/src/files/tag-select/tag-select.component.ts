import { Component, OnInit, ChangeDetectorRef, ElementRef, OnChanges } from '@angular/core';
import { ResourceSelectComponent } from '../../resource-select/resource-select.component';
import { SymbolService } from '@ec.components/ui/src/symbol/symbol.service';
import { AuthService } from '../../..';
import { ResourceConfig } from '../../resource-config/resource-config.service';
import { SdkService } from '../../sdk/sdk.service';
import { Item } from '@ec.components/core';
import Resource from 'ec.sdk/lib/resources/Resource';

@Component({
    selector: 'ec-tag-select',
    templateUrl: '../../resource-select/resource-select.component.html'
})

export class TagSelectComponent extends ResourceSelectComponent implements OnInit, OnChanges {

    relation = 'tags';
    placeholder = this.symbol.resolve('tag-select.placeholder');
    config = {
        label: 'tag',
        identifier: 'tag',
        methods: ['get'],
        disableListPop: true,
        disableCreatePop: true,
        fields: {
            tag: {}
        }
    }
    constructor(
        protected resourceConfig: ResourceConfig,
        protected auth: AuthService,
        public elementRef: ElementRef,
        public symbol: SymbolService,
        public cdr: ChangeDetectorRef,
        public sdk: SdkService
    ) {
        super(resourceConfig, auth, elementRef, symbol, cdr);
        this.enterPressed.asObservable().subscribe((s) => {
            this.selection.add(new Item({ tag: this.searchbar.query }, this.config));
            this.searchbar.clear();
            this.dropdownList.list.clearFilter();
        })
    }

    init() {
        this.sdk.ready.then(() => {
            this.api = this.sdk.api;
            super.init();
        });
    }
}
