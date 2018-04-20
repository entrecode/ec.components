import { Component, OnInit, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
    selector: 'ec-location-picker',
    templateUrl: './location-picker.component.html',
    styleUrls: ['./location-picker.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => LocationPickerComponent),
            multi: true
        }
    ]
})

export class LocationPickerComponent implements OnInit, ControlValueAccessor {
    value: {
        latitude: number,
        longitude: number
    } = {
            latitude: 51.678418,
            longitude: 7.809007
        };
    constructor() { }

    ngOnInit() { }

    clickedMap(value) {
        console.log('clicked map', value);
    }


    /** Writes value to editor on outside model change. */
    writeValue(value: any) {
        this.value = value;
    }

    propagateChange = (_: any) => { };

    registerOnChange(fn) {
        this.propagateChange = fn;
    }

    registerOnTouched() { }
}
