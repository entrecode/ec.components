
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { UiModule } from '@ec.components/ui'; //this is how you would import it in reality
// import { DataModule } from '@ec.components/data'; //this is how you would import it in reality
import { UiModule } from '../packages/ui';
import { DataModule } from '../packages/data';
import { DemoComponent } from './demo.component';

@NgModule({
  declarations: [
    DemoComponent,
  ],
  imports: [
    CommonModule,
    UiModule,
    DataModule
  ],
  providers: [],
  bootstrap: [DemoComponent]
})
export class DemoModule {
}
