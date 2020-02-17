import { NgModule } from '@angular/core';
import { AceComponent } from './ace.component';
import { UiModule } from '@ec.components/ui';

@NgModule({
  imports: [UiModule],
  exports: [AceComponent],
  declarations: [AceComponent],
  entryComponents: [AceComponent],
  providers: [],
})
export class AceModule {}
