// import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { PopComponent } from './pop.component';

@NgModule({
  declarations: [
    PopComponent
  ],
  imports: [
    // BrowserModule,
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
