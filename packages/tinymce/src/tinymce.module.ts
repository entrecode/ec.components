import { NgModule } from '@angular/core';
import { TinymceComponent } from './tinymce/tinymce.component';
import { UiModule } from '@ec.components/ui';
import { FilesModule } from '@ec.components/data/src/files';

@NgModule({
  declarations: [TinymceComponent],
  entryComponents: [TinymceComponent],
  imports: [UiModule, FilesModule],
  exports: [UiModule, FilesModule]
})
export class TinymceModule {
}
