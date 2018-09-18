import { NgModule } from '@angular/core';
import { TinymceComponent } from './tinymce/tinymce.component';
import { UiModule } from '@ec.components/ui';

@NgModule({
  declarations: [TinymceComponent],
  entryComponents: [TinymceComponent],
  imports: [UiModule],
  exports: [UiModule]
})
export class TinymceModule {
}
