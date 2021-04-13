import { Component, forwardRef, Input, ViewChild } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CalendarComponent } from '@ec.components/calendar';
import moment from 'moment-es6';

/** Input for a datetime.
 *
 * <example-url>https://components.entrecode.de/ui/datetime?e=1</example-url>
 *
 */
@Component({
  selector: 'ec-datetime',
  templateUrl: 'datetime.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatetimeComponent),
      multi: true,
    },
  ],
})
export class DatetimeComponent implements ControlValueAccessor {
  /** The date that should be displayed at start. */
  @Input() date: moment.Moment;
  /** The form control that holds the date */
  @Input() formControl: FormControl = new FormControl();
  /** The used calendar component */
  @ViewChild(CalendarComponent, { static: true }) calendar: CalendarComponent;
  /** Array of the days of a week. */
  public weekdays: string[];
  /** If true, the time will not be displayed nor will be editable. */
  @Input() disableTime: boolean;
  /** The input's placeholder */
  @Input() placeholder = '';
  /** If true, the time cannot be changed */
  disabled: boolean;

  /** Selects the given Date when the model changes. */
  writeValue(value: Date) {
    this.calendar.writeValue(value);
  }

  /** Change propagation for ControlValueAccessor */
  propagateChange = (_: any) => {};

  /** registerOnChange implementation of ControlValueAccessor */
  registerOnChange(fn) {
    this.propagateChange = fn;
  }

  /** registerOnTouched implementation of ControlValueAccessor */
  registerOnTouched() {}

  setDisabledState(isDisabled) {
    this.disabled = isDisabled;
  }
}
