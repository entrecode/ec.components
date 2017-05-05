import { NgModule } from '@angular/core';
import { DemoComponent } from './demo.component';
// import { UiModule } from '@ec.components/ui'; //this is how you would import it in reality
// import { DataModule } from '@ec.components/data'; //this is how you would import it in reality
import { UiModule } from '../packages/ui';
import { DataModule } from '../packages/data';

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
