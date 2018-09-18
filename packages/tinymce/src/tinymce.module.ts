import { NgModule } from '@angular/core';
import { TinymceComponent } from './tinymce/tinymce.component';
import { UiModule } from '@ec.components/ui';
import { DataModule } from '@ec.components/data';

@NgModule({
  declarations: [TinymceComponent],
  entryComponents: [TinymceComponent],
  imports: [UiModule, DataModule],
  exports: [TinymceComponent]
})
export class TinymceModule {
}
