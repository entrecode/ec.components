import { NgModule } from '@angular/core';
import { AceComponent } from './ace.component';

export const aceModuleConfig = {
    imports: [],
    exports: [AceComponent],
    declarations: [AceComponent],
    entryComponents: [AceComponent],
    providers: [],
};

@NgModule(aceModuleConfig)
export class AceModule { }
