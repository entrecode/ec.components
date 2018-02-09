import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IconComponent } from './icon.component';
import { IconService } from './icon.service';

@NgModule({
    imports: [CommonModule],
    declarations: [IconComponent],
    exports: [IconComponent],
    providers: [IconService],
})
export class IconModule { }
