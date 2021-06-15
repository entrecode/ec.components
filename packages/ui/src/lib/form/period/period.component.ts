import { Component, ElementRef, EventEmitter, forwardRef, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'ec-period',
  templateUrl: './period.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PeriodComponent),
      multi: true,
    },
  ],
})

export class PeriodComponent implements ControlValueAccessor {
  /** Output that emits when the value changes */
  @Output() changed: EventEmitter<any> = new EventEmitter();
  /** The form control that holds the date */
  @Input() formControl: FormControl = new FormControl();
  /** If true, no time values can be selected */
  @Input() disableTime: FormControl = new FormControl();
  @ViewChild('customInput') customInput: any;
  /** The current value */
  value = '';
  amount = 1;
  period = 'D';
  /** If true, the time cannot be changed */
  disabled: boolean;
  customMode = false;

  constructor() { }

  parseValue(value) {
    return value.match(/^P(?:(\d+(?:\.\d+)?)([D]|[W]|M|[JY]))?(?:T(\d+(?:\.\d+)?)([sS]|[mM]|[hH]))?$/)?.slice(1) || [];
  }

  isTimePeriod(period) {
    return period.match(/^([sS]|[mM]|[hH])$/);
  }

  // simple mode: update value when amount and period change + propagate change
  updateSimple() {
    setTimeout(() => {
      const isTimePeriod = this.isTimePeriod(this.period);
      const value = 'P' + (isTimePeriod ? 'T' : '') + this.amount + this.period;
      // console.log('change', value);
      this.value = value;
      this.propagateChange(value);
    })
  }

  // custom mode: update amount and period when value changes + propagate change
  updateCustom() {
    setTimeout(() => {
      this.propagateChange(this.value);
    })
  }

  // parse current value and update amount and period => should only do if 
  updateAmountAndPeriod(value = this.value) {
    if (!this.isSimpleValue(value)) {
      throw new Error('cannot update amount and period from a non simple value!')
    }
    const [dateAmount, datePeriod, timeAmount, timePeriod] = this.parseValue(value);
    this.amount = dateAmount !== undefined ? +dateAmount : +timeAmount;
    this.period = datePeriod !== undefined ? datePeriod : timePeriod;
  }

  toggleMode() {
    if (this.customMode) {
      try {
        this.updateAmountAndPeriod(); // before switching to simple mode, update form values
      } catch (error) {
        console.log('cannot switch to simple mode when value is complex!');
        return;
      }
    }
    this.customMode = !this.customMode;
    if (this.customMode) { // after transitioning to custom mode, focus input
      setTimeout(() => {
        this.customInput?.nativeElement?.focus();
      })
    }
  }

  isSimpleValue(value) {
    const [_, datePeriod, __, timePeriod] = this.parseValue(value);
    if (!!timePeriod !== !!datePeriod) {
      return true;
    } else {
      return false;
    }
  }

  /** Selects the given Date when the model changes. */
  writeValue(value: string) {
    if (!value) {
      return '';
    }
    this.value = value;
    try {
      this.updateAmountAndPeriod(value);
      this.customMode = false;
    } catch (error) {
      console.log('error', error);
      this.customMode = true;
    }
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