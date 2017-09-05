import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { PopComponent } from './pop.component';

@NgModule({
  declarations: [
    PopComponent
  ],
  imports: [
    CommonModule,
    HttpModule,
  ],
  exports: [
    PopComponent
  ],
  providers: []
})
export class PopModule {
}
