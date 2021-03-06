import { Component, EventEmitter, forwardRef, Inject, Input, Output, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
/* import { SymbolService } from '../../symbol/symbol.service'; */
import moment from 'moment-es6';
import { MonthComponent } from './month.component';

/** Input for a datetime.
 *
 * <example-url>https://components.entrecode.de/ui/datetime?e=1</example-url>
 */
@Component({
  selector: 'ec-calendar',
  templateUrl: 'calendar.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CalendarComponent),
      multi: true,
    },
  ],
})
export class CalendarComponent extends MonthComponent implements ControlValueAccessor {
  /** Output that emits when the value changes */
  @Output() changed: EventEmitter<any> = new EventEmitter();
  /** The current value */
  value = '';
  /** The current value of the input */
  inputValue = '';
  /** The calendar view child. */
  @ViewChild(MonthComponent, { static: true }) grid: MonthComponent;
  /** Array of the days of a week. */
  public weekdays: string[];
  /** The input's placeholder */
  @Input() placeholder = '';
  /** If true, the date cannot be changed */
  @Input() disabled;
  /** If true, the time will not be displayed nor will be editable. */
  @Input() disableTime: boolean;
  /** If true, the time will not be in the emitted value */
  @Input() dateOnly: boolean;
  /** If true, past dates cannot be selected */
  @Input() disablePast: boolean;
  /** Allowed date input patterns. The first one will be standard. */
  private patterns = ['DD.MM.YYYY', 'DD.MM', 'DD.MM.YY', 'MM-DD-YYYY', 'YYYY-MM-DD', 'YYYY-MM-DD'];
  /** Sets the input format of the time */
  private timeFormat = 'HH:mm';

  /** The constructor gets the weekdays for the calendar header and instantiates the allowed input patterns.*/
  constructor(
    @Inject('moment.format.date') public defaultDateFormat,
    @Inject('moment.format.time') public defaultTimeFormat,
    @Inject('moment.format.month') protected defaultMonthFormat /* public symbol: SymbolService */,
  ) {
    /* super(symbol); */
    super(defaultMonthFormat);
    this.patterns = defaultDateFormat ? [defaultDateFormat] : this.patterns;
    this.timeFormat = defaultTimeFormat || this.timeFormat;
    this.weekdays = moment.weekdaysMin(true);
  }

  ngOnInit() {
    if (!this.disableTime) {
      this.patterns = this.patterns
        .map((pattern) => {
          return pattern + ' ' + this.timeFormat;
        })
        .concat(this.patterns);
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
    if (this.disabled) {
      console.warn('cannot select date: calendar is set to disabled=true');
      return;
    }
    if (this.value && selected.hour() === 0 && selected.minute() === 0) {
      const previous = moment(this.value, this.patterns, true);
      selected.hour(previous.hour());
      selected.minute(previous.minute());
    }
    this.value = selected.format(this.getPattern(selected));
    this.inputValue = this.value;
    if (this.dateOnly) {
      this.setValue(selected.format("YYYY-MM-DD") || 'invalid');
    } else {
      this.setValue(selected.toISOString() || 'invalid');
    }
  }

  /** Called upon input value change by the user. */
  input(value) {
    this.value = value;
    const typed = moment(value, [...this.patterns, moment.ISO_8601], true);
    if (typed.isValid()) {
      this.grid.selectDay(typed, false);
      this.setValue(typed.toISOString());
    } else if (value === '') {
      this.grid.clearSelection();
      this.setValue(null);
    } else {
      this.setValue(typed.toISOString() || 'invalid');
    }
  }

  /** called when the value should be changed from inside the component. calls propagateChange and emits the change output */
  setValue(value) {
    this.propagateChange(value);
    this.changed.emit(value);
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
    this.inputValue = this.value;
    this.grid.selectDay(moment(value));
  }

  /** Change propagation for ControlValueAccessor */
  propagateChange = (_: any) => { };

  /** registerOnChange implementation of ControlValueAccessor */
  registerOnChange(fn) {
    this.propagateChange = fn;
  }

  /** registerOnTouched implementation of ControlValueAccessor */
  registerOnTouched() { }

  setDisabledState(isDisabled) {
    this.disabled = isDisabled;
  }
}
