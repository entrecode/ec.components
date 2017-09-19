import { Component, forwardRef, Input, ViewChild } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import * as moment from 'moment';
import { CalendarComponent } from './calendar.component';

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
  /** The used calendar component */
  @ViewChild(CalendarComponent) calendar: CalendarComponent;
  /** Array of the days of a week. */
  public weekdays: string[];
  /** The input's placeholder */
  @Input() placeholder = '';

  /** Selects the given Date when the model changes. */
  writeValue(value: Date) {
    this.calendar.writeValue(value);
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
