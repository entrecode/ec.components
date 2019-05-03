import { NgModule } from '@angular/core';
import { TinymceComponent } from './tinymce/tinymce.component';

export const tinymceModuleConfig = {
  declarations: [TinymceComponent],
  entryComponents: [TinymceComponent],
  exports: [TinymceComponent],
};

@NgModule(tinymceModuleConfig)
export class TinymceModule {}
