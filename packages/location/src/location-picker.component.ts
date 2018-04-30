import { Component, OnInit, forwardRef, Input, ViewChild } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormControl } from '@angular/forms';
import { DefaultInputComponent, InputComponent } from '@ec.components/ui';
import { LocationMapComponent } from './location-map.component';
import { LocationSearchComponent } from './location-search.component';
import { GeocodeService } from './geocode.service';

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

export class LocationPickerComponent extends DefaultInputComponent implements ControlValueAccessor, OnInit {
    /** The form control that holds the location */
    @Input() formControl: FormControl;
    @ViewChild(LocationMapComponent) map: LocationMapComponent;
    @ViewChild(LocationSearchComponent) search: LocationSearchComponent;
    /** Form input component */
    input: InputComponent;

    constructor(
        private geocodeService: GeocodeService,
    ) {
        super();
    }

    ngOnInit() {
    }

    setValue(value, fromSearch?: boolean) {
        if (!value) {
            this.search.clear();
        }
        this.map.setValue(value);
        if (!fromSearch) {
            this.updateAddress();
        }
        this.propagateChange(value);
        if (this.input) {
            this.input.propagateChange(value);
        }
    }

    /** Writes value to editor on outside model change. */
    writeValue(value: any) {
        this.map.setValue(value);
        this.updateAddress();
    }

    updateAddress() {
        const value = this.map.value;
        if (!value) {
            this.search.searchInput.nativeElement.value = '';
            return;
        }
        this.geocodeService.getNearestAddress(value)
            .then(results => {
                if (results.length) {
                    this.search.searchInput.nativeElement.value = results[0].formatted_address;
                } else {
                    this.search.searchInput.nativeElement.value = '';
                }
            });
    }

    propagateChange = (_: any) => { };

    registerOnChange(fn) {
        this.propagateChange = fn;
    }

    registerOnTouched() { }
}
