import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormComponent } from './form.component';
import { DefaultInputComponent } from './default-input/default-input.component';
import { DefaultOutputComponent } from './default-output/default-output.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PopModule } from '../pop/pop.module';
import { FormService } from './form.service';
import { VisibleFieldsPipe } from './visible-fields.pipe';
import { IoModule } from '../io/io.module';
import { DatetimeComponent } from './datetime/datetime.component';
import { MonthComponent } from './datetime/month.component';
import { DatetimePipe } from './datetime/datetime.pipe';
import { ToggleComponent } from './toggle/toggle.component';
import { CalendarComponent } from './datetime/calendar.component';

@NgModule({
  entryComponents: [
    DefaultInputComponent,
    DefaultOutputComponent,
  ],
  declarations: [
    FormComponent,
    DefaultInputComponent,
    DefaultOutputComponent,
    DatetimeComponent,
    DatetimePipe,
    MonthComponent,
    CalendarComponent,
    VisibleFieldsPipe,
    ToggleComponent,
  ],
  imports: [
    CommonModule,
    HttpModule,
    ReactiveFormsModule,
    PopModule,
    IoModule
  ],
  exports: [
    FormComponent,
    ReactiveFormsModule,
    DatetimeComponent,
    DatetimePipe,
    CalendarComponent,
    MonthComponent,
    PopModule,
    VisibleFieldsPipe,
    IoModule,
    ToggleComponent,
  ],
  providers: [
    FormService
  ]
})
export class FormModule {
}
