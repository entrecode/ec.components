import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormComponent } from './form.component';
import { DefaultInputComponent } from './default-input/default-input.component';
import { DefaultOutputComponent } from './default-output/default-output.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PopModule } from '../pop/pop.module';
import { FormService } from './form.service';
import { VisibleFieldsPipe } from './visible-fields.pipe';
import { IoModule } from '../io/io.module';
import { DatetimeComponent } from './datetime/datetime.component';
/*import { MonthComponent } from './datetime/month.component';
import { DatetimePipe } from './datetime/datetime.pipe';
import { CalendarComponent } from './datetime/calendar.component';
import { HeatmapComponent } from './datetime/heatmap.component';
import { DaterangeComponent } from './datetime/daterange.component'; */
import { ToggleComponent } from './toggle/toggle.component';
import { LoaderModule } from '../loader/loader.module';
import { IconModule } from '../icon/icon.module';
import { MaxItemsPipe } from './max-items.pipe';
import { SymbolModule } from '../symbol/symbol.module';
import { CalendarModule } from '../../../calendar/src/calendar.module';
import { SymbolService } from '../symbol/symbol.service';

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
    /* DatetimePipe,
    MonthComponent,
    HeatmapComponent,
    DaterangeComponent,
    CalendarComponent, */
    VisibleFieldsPipe,
    MaxItemsPipe,
    ToggleComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PopModule,
    IoModule,
    LoaderModule,
    IconModule,
    SymbolModule,
    CalendarModule
  ],
  exports: [
    FormComponent,
    ReactiveFormsModule,
    DatetimeComponent,
    /* DatetimePipe,
    CalendarComponent,
    HeatmapComponent,
    DaterangeComponent,
    MonthComponent, */
    PopModule,
    VisibleFieldsPipe,
    MaxItemsPipe,
    IoModule,
    ToggleComponent,
  ],
  providers: [
    FormService,
    {
      provide: 'moment.format.date',
      useValue: SymbolService.resolve('moment.format.date')
    },
    {
      provide: 'moment.format.time',
      useValue: SymbolService.resolve('moment.format.time')
    },
    {
      provide: 'moment.format.month',
      useValue: SymbolService.resolve('moment.format.month')
    }
  ]
})
export class FormModule {
}
