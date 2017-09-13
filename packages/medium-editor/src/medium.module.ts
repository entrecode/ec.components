import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MediumEditorDirective } from './medium-editor.directive';

@NgModule({
  imports: [CommonModule],
  exports: [MediumEditorDirective],
  declarations: [MediumEditorDirective],
  providers: [],
})
export class MediumModule {
}
