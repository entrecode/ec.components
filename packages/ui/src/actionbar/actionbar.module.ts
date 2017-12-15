import { NgModule } from '@angular/core';

import { ActionbarComponent } from './actionbar.component';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [
        CommonModule,
    ],
    exports: [ActionbarComponent],
    declarations: [ActionbarComponent],
    providers: [],
})
export class ActionbarModule { }
