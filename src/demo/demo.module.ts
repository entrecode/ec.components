import { NgModule } from '@angular/core';
import { DemoComponent } from './demo.component';
import { UiModule } from '@ec.components/ui';
import { DataModule } from '@ec.components/data';

@NgModule({
  declarations: [
    DemoComponent,
  ],
  imports: [
    UiModule,
    DataModule
  ],
  providers: [],
  bootstrap: [DemoComponent]
})
export class DemoModule {
}
