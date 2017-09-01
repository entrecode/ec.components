// import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { NotificationsModule } from './notifications/notifications.module';
import { PopModule } from './pop/pop.module';
import { LoaderModule } from './loader/loader.module';
import { ListModule } from "./list/list.module";
import { FormModule } from './form/form.module';
import { UtilityModule } from './utility/utility.module';

@NgModule({
  entryComponents: [],
  declarations: [],
  imports: [
    // BrowserModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    UtilityModule,
    NotificationsModule,
    PopModule,
    LoaderModule,
    FormModule,
    ListModule,
  ],
  exports: [
    ReactiveFormsModule,
    FormsModule,
    UtilityModule,
    PopModule,
    NotificationsModule,
    LoaderModule,
    ListModule,
    FormModule,
  ],
  providers: [],
})
export class UiModule {
}