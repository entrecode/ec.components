import { Component, OnInit, Input } from '@angular/core';
import { InputComponent } from '../../../packages/ui';
import { ControlValueAccessor } from '@angular/forms';

@Component({
    selector: 'ec-counter',
    templateUrl: './counter.component.html'
})

export class CounterComponent extends InputComponent implements ControlValueAccessor {

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

    propagateChange = (_: any) => {
    };

    registerOnChange(fn) {
        this.propagateChange = fn;
    }

    registerOnTouched() {
    }

}
