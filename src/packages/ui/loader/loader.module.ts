// import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { LoaderComponent } from './loader.component';
import { LoaderService } from './loader.service';

@NgModule({
  declarations: [
    LoaderComponent,
  ],
  imports: [
    // BrowserModule,
    CommonModule,
    HttpModule,
  ],
  exports: [
    LoaderComponent,
  ],
  providers: [LoaderService]
})
export class LoaderModule {
}
