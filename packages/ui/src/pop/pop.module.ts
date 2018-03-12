import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PopComponent } from './pop.component';
import { PopService } from './pop.service';

@NgModule({
  declarations: [
    PopComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    PopComponent
  ],
  providers: [PopService]
})
export class PopModule {
}
