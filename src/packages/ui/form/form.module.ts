import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormComponent } from './form.component';
import { DefaultInputComponent } from './default-input/default-input.component';
import { DefaultOutputComponent } from './default-output/default-output.component';
import { ReactiveFormsModule } from "@angular/forms";
import { SelectComponent } from './select/select.component';
import { PopModule } from '../pop/pop.module';
import { FormService } from './form.service';
import { VisibleFieldsPipe } from './visible-fields.pipe';
import { IoModule } from '../io/io.module';
import { DatetimeComponent } from './datetime/datetime.component';
import { MonthComponent } from './datetime/month.component';
import { DatetimePipe } from './datetime/datetime.pipe';

@NgModule({
  entryComponents: [
    DefaultInputComponent,
    DefaultOutputComponent,
  ],
  declarations: [
    FormComponent,
    DefaultInputComponent,
    DefaultOutputComponent,
    SelectComponent,
    DatetimeComponent,
    DatetimePipe,
    MonthComponent,
    VisibleFieldsPipe,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    ReactiveFormsModule,
    PopModule,
    IoModule,
  ],
  exports: [
    FormComponent,
    ReactiveFormsModule,
    SelectComponent,
    DatetimeComponent,
    DatetimePipe,
    MonthComponent,
    PopModule,
    VisibleFieldsPipe,
    IoModule,
  ],
  providers: [
    FormService
  ]
})
export class FormModule {
}
