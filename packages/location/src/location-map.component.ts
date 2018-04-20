import { Component, OnInit, forwardRef, Input, EventEmitter, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormControl } from '@angular/forms';
import { DefaultInputComponent, InputComponent } from '@ec.components/ui';

@Component({
    selector: 'ec-location-map',
    templateUrl: './location-map.component.html',
    styleUrls: ['./location-map.component.scss']
})

export class LocationMapComponent implements OnInit {
    @Input() center: { longitude: any; latitude: any; } = { latitude: 48.8093253, longitude: 9.159388100000001 };
    @Input() readOnly: boolean;
    @Output() change: EventEmitter<any> = new EventEmitter();
    /** Form input component */
    @Input() value: {
        longitude: number,
        latitude: number
    };

    ngOnInit() { }

    setValue(value) {
        this.value = value;
        if (value) {
            this.center = value;
        }
    }

    markerDragEnd(coords) {
        if (!coords) {
            console.warn('no coords');
            return;
        }
        const position = { longitude: coords.lng, latitude: coords.lat };
        this.value = position; // centers map
        this.center = position;
        this.change.emit(position);
    }
}
