import { Component, forwardRef, Input, ViewChild } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import * as moment from 'moment';
import { MonthComponent } from './month.component';
import { PopComponent } from '../../pop/pop.component';

/** Input for a datetime. */
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
  /** The date that should be displayed at start. */
  @Input() date: moment.Moment;
  /** The form control that holds the date */
  @Input() formControl: FormControl;
  /** The current value of the input */
  value: string = '';
  /** The calendar view child. */
  @ViewChild('calendar') calendar: MonthComponent;
  /** The dropdown pop with the calendar*/
  @ViewChild('calendarPop') pop: PopComponent;
  /** Array of the days of a week. */
  private weekdays: string[];
  /** The input's placeholder */
  @Input() placeholder: string;
  /** If true, the time will not be displayed nor will be editable. */
  @Input() disableTime: boolean;
  /** Allowed date input patterns. The first one will be standard. */
  private patterns = ['DD.MM.YYYY', 'DD.MM', 'DD.MM.YY', 'MM-DD-YYYY', 'YYYY-MM-DD', 'YYYY-MM-DD'];
  /** Sets the input format of the time */
  private timeFormat = 'HH:mm';

  /** The constructor gets the weekdays for the calendar header and instantiates the allowed input patterns.*/
  constructor() {
    this.weekdays = moment.weekdaysMin(true);
    if (!this.disableTime) {
      this.patterns = this.patterns.concat(this.patterns.map((pattern) => {
        return pattern + ' ' + this.timeFormat;
      }));
    }
  }

  getPattern(moment) {
    const format = moment.creationData().format;
    if (this.patterns.indexOf(format) !== -1) {
      return format;
    }
    return this.patterns[0];
  }

  /** Updates the value with the given moment and propagates the change. */
  select(selected) {
    this.value = selected.format(this.getPattern(selected));
    this.propagateChange(selected.toDate());
  }

  /** Called upon input value change by the user. */
  input(e) {
    const value = e.target.value;
    this.value = value;
    if (!value) {
      return;
    }
    const typed = moment(value, this.patterns, true);
    if (typed.isValid()) {
      this.calendar.selectDay(typed);
    } else {
      this.propagateChange(typed.toDate());
    }
  }

  /** Selects the given Date when the model changes. */
  writeValue(value: Date) {
    if (!value) {
      return '';
    }
    if (typeof value === 'string') {
      console.log('utc date??', value); //TODO
    } else {
      const date = moment(value);
      if (!date.isValid()) {
        console.log('model value is not valid', date);
        return;
      }
      this.value = date.format(this.patterns[0]) || '';
      this.calendar.selectDay(moment(value));
    }
  }

  /** Change propagation for ControlValueAccessor */
  propagateChange = (_: any) => {
  };

  /** registerOnChange implementation of ControlValueAccessor */
  registerOnChange(fn) {
    this.propagateChange = fn;
  }

  /** registerOnTouched implementation of ControlValueAccessor */
  registerOnTouched() {
  }
}
