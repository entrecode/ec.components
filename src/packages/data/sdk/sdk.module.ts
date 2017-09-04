// import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SdkService } from './sdk.service';
import { PublicService } from './public.service';
import { AdminService } from './admin.service';

@NgModule({
  entryComponents: [],
  declarations: [],
  imports: [],
  exports: [],
  providers: [
    SdkService,
    PublicService,
    AdminService,
  ],
})
export class SdkModule {
}