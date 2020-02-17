import { NgModule } from '@angular/core';
import { TinymceComponent } from './tinymce/tinymce.component';

@NgModule({
  declarations: [TinymceComponent],
  entryComponents: [TinymceComponent],
  exports: [TinymceComponent],
})
export class TinymceModule {}
