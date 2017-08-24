import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { NotificationsModule } from './notifications/notifications.module';
import { PopModule } from './pop/pop.module';
import { LoaderModule } from './loader/loader.module';
import { ListModule } from "./list/list.module";
import { FormModule } from './form/form.module';
import { UtilityModule } from './utility/utility.module';
import { IoModule } from './io/io.module';
import { InputErrorsComponent } from './io/input-errors/input-errors.component';

@NgModule({
  entryComponents: [
  ],
  declarations: [],
  imports: [
    BrowserModule,
    FormsModule,
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
    FormModule
  ],
  providers: [],
})
export class UiModule {
}