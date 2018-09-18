import { NgModule } from '@angular/core';
import { TinymceComponent } from './tinymce/tinymce.component';
import { FilesModule } from '@ec.components/data/src/files/files.module';
import { PopModule } from '@ec.components/ui/src/pop/pop.module';
import { IconModule } from '@ec.components/ui/src/icon/icon.module';

@NgModule({
  declarations: [TinymceComponent],
  entryComponents: [TinymceComponent],
  imports: [IconModule, PopModule, FilesModule],
  exports: [TinymceComponent, IconModule, PopModule, FilesModule]
})
export class TinymceModule {
}
