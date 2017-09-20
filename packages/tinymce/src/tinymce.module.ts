import { NgModule } from '@angular/core';
import { TinymceComponent } from './tinymce/tinymce.component';

@NgModule({
  declarations: [TinymceComponent],
  exports: [TinymceComponent]
})
export class TinymceModule {
}
