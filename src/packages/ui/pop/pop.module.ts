import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { PopComponent } from './pop.component';

@NgModule({
  declarations: [
    PopComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
  ],
  exports: [
    PopComponent
  ],
  providers: []
})
export class PopModule {
}
