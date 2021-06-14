import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
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
  /** The current value */
  value = '';
  amount = 1;
  period = 'D';
  /** If true, the time cannot be changed */
  disabled: boolean;

  constructor() { }

  ngOnInit() {

  }

  update() {
    setTimeout(() => {
      const value = 'P' + this.amount + this.period;
      console.log('change', value);
      this.propagateChange(value);
    })
  }

  /** Selects the given Date when the model changes. */
  writeValue(value: string) {
    if (!value) {
      return '';
    }
    const [amount, period] = value.match(/^P(\d)([smhDWMY])$/)?.slice(1) || [];
    if (amount !== undefined && period !== undefined) {
      console.log('default mode');
      this.amount = +amount;
      this.period = period;
    } else {
      console.log('custom mode', amount, period);
      this.value = value;
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