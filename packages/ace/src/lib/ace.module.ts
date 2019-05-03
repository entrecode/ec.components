import { NgModule } from '@angular/core';
import { AceComponent } from './ace.component';
import { UiModule } from '@ec.components/ui';

export const aceModuleConfig = {
  imports: [UiModule],
  exports: [AceComponent],
  declarations: [AceComponent],
  entryComponents: [AceComponent],
  providers: [],
};

@NgModule(aceModuleConfig)
export class AceModule {}
