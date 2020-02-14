import { NgModule, ModuleWithProviders } from '@angular/core';
import { DatetimePipe } from './datetime.pipe';
import { CalendarComponent } from './calendar/calendar.component';
import { HeatmapComponent } from './heatmap/heatmap.component';
import { DaterangeComponent } from './daterange/daterange.component';
import { MonthComponent } from './calendar/month.component';
import { CommonModule } from '@angular/common';

export const calendarModuleConfig = {
  imports: [CommonModule],
  exports: [DatetimePipe, CalendarComponent, HeatmapComponent, DaterangeComponent, MonthComponent],
  declarations: [DatetimePipe, CalendarComponent, HeatmapComponent, DaterangeComponent, MonthComponent],
  providers: [
    {
      provide: 'moment.format.date',
      useValue: 'DD.MM.YYYY',
    },
    {
      provide: 'moment.format.time',
      useValue: 'HH:mm',
    },
    {
      provide: 'moment.format.month',
      useValue: 'MMMM YYYY',
    },
  ],
};

/** This Module contains all calendar related components */
@NgModule(calendarModuleConfig)
export class CalendarModule {
  static forRoot(formats: { date?; time?; month? }): ModuleWithProviders<CalendarModule> {
    return {
      ngModule: CalendarModule,
      providers: [
        {
          provide: 'moment.format.date',
          useValue: formats.date,
        },
        {
          provide: 'moment.format.time',
          useValue: formats.time,
        },
        {
          provide: 'moment.format.month',
          useValue: formats.month,
        },
      ],
    };
  }
}
