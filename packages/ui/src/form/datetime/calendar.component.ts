import { Component, forwardRef, Input, ViewChild } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import moment from 'moment-es6';
import { MonthComponent } from './month.component';
import { PopComponent } from '../../pop/pop.component';
import { SymbolService } from '@ec.components/ui/src/symbol/symbol.service';

/** Input for a datetime. */
@Component({
  selector: 'ec-calendar',
  templateUrl: 'calendar.component.html',
  styleUrls: ['calendar.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CalendarComponent),
      multi: true
    }
  ]
})
export class CalendarComponent implements ControlValueAccessor {
  /** The date that should be displayed at start. */
  @Input() date: moment.Moment;
  /** The form control that holds the date */
  @Input() formControl: FormControl;
  /** The current value of the input */
  value = '';
  /** The calendar view child. */
  @ViewChild(MonthComponent) grid: MonthComponent;
  /** The dropdown pop with the calendar*/
  @ViewChild('calendarPop') pop: PopComponent;
  /** Array of the days of a week. */
  public weekdays: string[];
  /** The input's placeholder */
  @Input() placeholder = '';
  /** If true, the time will not be displayed nor will be editable. */
  @Input() disableTime: boolean;
  /** Allowed date input patterns. The first one will be standard. */
  private patterns = ['DD.MM.YYYY', 'DD.MM', 'DD.MM.YY', 'MM-DD-YYYY', 'YYYY-MM-DD', 'YYYY-MM-DD'];
  /** Sets the input format of the time */
  private timeFormat = 'HH:mm';

  /** The constructor gets the weekdays for the calendar header and instantiates the allowed input patterns.*/
  constructor(private symbol: SymbolService) {
    // pattern localization
    this.patterns = this.symbol.resolve('moment.format.date') ? [this.symbol.resolve('moment.format.date')] : this.patterns;
    this.timeFormat = this.symbol.resolve('moment.format.time') || this.timeFormat;

    // TODO: find way to localize
    this.weekdays = moment.weekdaysMin(true);
    if (!this.disableTime) {
      this.patterns = this.patterns.map((pattern) => {
        return pattern + ' ' + this.timeFormat;
      }).concat(this.patterns);
    }
  }

  getPattern(_moment) {
    const format = _moment.creationData().format;
    if (this.patterns.indexOf(format) !== -1) {
      return format;
    }
    return this.patterns[0];
  }

  /** Updates the value with the given moment and propagates the change. */
  select(selected) {
    if (this.value) {
      const previous = moment(this.value, this.patterns, true);
      selected.hour(previous.hour());
      selected.minute(previous.minute());
    }
    this.value = selected.format(this.getPattern(selected));
    this.propagateChange(selected.toISOString() || 'invalid');
  }

  /** Called upon input value change by the user. */
  input(value) {
    this.value = value;
    const typed = moment(value, this.patterns, true);
    if (typed.isValid()) {
      this.grid.selectDay(typed);
    } else if (value === '') {
      this.grid.clearSelection();
      this.propagateChange(null);
    } else {
      this.propagateChange(typed.toISOString() || 'invalid');
    }
  }

  /** Selects the given Date when the model changes. */
  writeValue(value: Date) {
    if (!value) {
      return '';
    }
    const date = moment(value);
    if (!date.isValid()) {
      console.warn('written model value is not valid', date);
      return;
    }
    this.value = date.format(this.patterns[0]) || '';
    this.grid.selectDay(moment(value));
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
