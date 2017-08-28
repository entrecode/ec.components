import { Component, forwardRef, Input, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import * as moment from 'moment';
import { MonthComponent } from './month.component';

@Component({
  selector: 'ec-datetime',
  templateUrl: 'datetime.component.html',
  styleUrls: ['datetime.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatetimeComponent),
      multi: true
    }
  ]
})
export class DatetimeComponent implements ControlValueAccessor {
  before: moment.Moment;
  date: moment.Moment;
  value: Date;
  after: moment.Moment;

  @Input() placeholder: string;
  @ViewChild('calendar') calendar: MonthComponent;
  private weekdays: string[];

  constructor() {
    this.setDate();
    this.weekdays = moment.weekdaysMin(true);
  }

  setDate(date = moment()) {
    this.date = date;
    this.before = this.date.clone().subtract(1, 'month');
    this.after = this.date.clone().add(1, 'month');
  }

  select(moment) {
    this.value = moment.toDate();
    this.propagateChange(this.value);
  }

  writeValue(value: any) {
    if (!value) {
      return;
    }
    if (typeof value === 'string') {
      console.log('utc date??', value); //TODO
    } else {
      console.log('js date? ', value);
      this.value = value;
      this.calendar.selectDay(moment(value));
    }
  }

  propagateChange = (_: any) => {
  };

  registerOnChange(fn) {
    this.propagateChange = fn;
  }

  registerOnTouched() {

  }
}
