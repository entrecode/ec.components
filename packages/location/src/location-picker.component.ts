import { Component, OnInit, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { DefaultInputComponent, InputComponent } from '@ec.components/ui';

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

export class LocationPickerComponent extends DefaultInputComponent implements OnInit, ControlValueAccessor {
    @Input() readOnly: boolean;
    /** Form input component */
    input: InputComponent;
    defaultValue = {
        longitude: 6.963059734375065,
        latitude: 50.93323460234276
    };
    value: {
        longitude: number,
        latitude: number
    } = this.defaultValue;

    ngOnInit() { }

    markerDragEnd(coords) {
        if (!coords) {
            console.warn('no coords');
            return;
        }
        const position = { longitude: coords.lng, latitude: coords.lat };
        this.value = position; // centers map
        this.propagateChange(position);
        if (this.input) {
            this.input.propagateChange(position);
        }
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
