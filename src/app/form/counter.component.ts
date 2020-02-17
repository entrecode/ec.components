import { Component } from '@angular/core';
import { InputComponent } from '@ec.components/ui';
import { ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'ec-counter',
  templateUrl: './counter.component.html',
})
export class CounterComponent extends InputComponent implements ControlValueAccessor {
  // TODO: add explicit constructor

  value = 0;

  increment() {
    this.propagateChange(++this.value);
  }

  decrement() {
    this.propagateChange(--this.value);
  }

  writeValue(value: any) {
    this.value = value;
    console.log('received value', value);
  }

  propagateChange = (_: any) => {};

  registerOnChange(fn) {
    this.propagateChange = fn;
  }

  registerOnTouched() {}
}
