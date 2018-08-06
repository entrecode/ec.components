import { Component, OnInit } from '@angular/core';
import { SymbolService } from '../../../packages/ui/src/symbol/symbol.service';

@Component({
    selector: 'ec-symbol-demo',
    templateUrl: 'symbol-demo.component.html'
})

export class SymbolDemoComponent implements OnInit {
    public sets: string[];
    constructor(public symbol: SymbolService) {
        console.log('symbol', this.symbol.resolve('symbol.language'));
        this.sets = Object.keys(this.symbol.sets);
    }

    ngOnInit() { }
}
