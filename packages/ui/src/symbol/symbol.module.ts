import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SymbolService } from './symbol.service';
import { SymbolPipe } from './symbol.pipe';

@NgModule({
    imports: [CommonModule],
    declarations: [SymbolPipe],
    exports: [SymbolPipe],
    providers: [SymbolService],
})
export class SymbolModule { }
