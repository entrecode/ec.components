import { Component, OnInit } from '@angular/core';
import { SymbolService } from '../../../packages/ui/src/symbol/symbol.service';

@Component({
    selector: 'ec-symbol-demo',
    templateUrl: 'symbol-demo.component.html'
})

export class SymbolDemoComponent implements OnInit {
    constructor(public symbol: SymbolService) {

        console.log('symbol', this.symbol.resolve('success.save'));
    }

    ngOnInit() { }
}
