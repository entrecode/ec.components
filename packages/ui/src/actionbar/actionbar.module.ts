import { NgModule } from '@angular/core';

import { ActionbarComponent } from './actionbar.component';
import { CommonModule } from '@angular/common';
import { LoaderModule } from '../loader/loader.module';
import { FormsModule } from '@angular/forms';
import { UiModule } from '../ui.module';

@NgModule({
    imports: [
        CommonModule,
        LoaderModule,
        FormsModule,
        UiModule,
    ],
    exports: [ActionbarComponent],
    declarations: [ActionbarComponent],
    providers: [],
})
export class ActionbarModule { }
