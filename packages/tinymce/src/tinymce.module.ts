import { NgModule } from '@angular/core';
import { TinymceComponent } from './tinymce/tinymce.component';
import { UiModule } from '../../ui/src/ui.module';
import { DataModule } from '../../data/src/data.module';

@NgModule({
  declarations: [TinymceComponent],
  entryComponents: [TinymceComponent],
  imports: [UiModule, DataModule],
  exports: [TinymceComponent]
})
export class TinymceModule {
}
