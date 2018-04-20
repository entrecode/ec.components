import { Component, OnInit, forwardRef, Input, EventEmitter, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormControl } from '@angular/forms';
import { DefaultInputComponent, InputComponent } from '@ec.components/ui';

@Component({
    selector: 'ec-location-map',
    templateUrl: './location-map.component.html',
    styleUrls: ['./location-map.component.scss']
})

export class LocationMapComponent implements OnInit {
    @Input() readOnly: boolean;
    @Output() change: EventEmitter<any> = new EventEmitter();
    /** Form input component */
    @Input() value: {
        longitude: number,
        latitude: number
    } = {
            longitude: 6.963059734375065,
            latitude: 50.93323460234276
        }

    ngOnInit() { }

    markerDragEnd(coords) {
        if (!coords) {
            console.warn('no coords');
            return;
        }
        const position = { longitude: coords.lng, latitude: coords.lat };
        this.value = position; // centers map
        this.change.emit(position);
    }
}
