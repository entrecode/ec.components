import { NgModule } from '@angular/core';

import { InteractionComponent } from './interaction.component';
import { CommonModule } from '@angular/common';
import { LoaderModule } from '../loader/loader.module';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        LoaderModule,
        FormsModule,
    ],
    exports: [InteractionComponent],
    declarations: [InteractionComponent],
    providers: [],
})
export class InteractionModule { }
