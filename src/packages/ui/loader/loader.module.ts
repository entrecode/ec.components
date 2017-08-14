import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { LoaderComponent } from './loader.component';
import { LoaderService } from './loader.service';

@NgModule({
  declarations: [
    LoaderComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
  ],
  exports: [
    LoaderComponent,
  ],
  providers: [LoaderService]
})
export class LoaderModule {
}
