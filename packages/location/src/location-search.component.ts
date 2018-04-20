import { MapsAPILoader, GoogleMapsAPIWrapper } from '@agm/core';
import { } from 'googlemaps';
import { google } from '@agm/core/services/google-maps-types';
import { Component, ElementRef, Input, NgZone, OnInit, ViewChild, AfterViewInit, forwardRef, Output, EventEmitter } from '@angular/core';
import { FormControl, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { GeocodeService } from './geocode.service';
import { LocationMapComponent } from './location-map.component';

@Component({
    selector: 'ec-location-search',
    templateUrl: './location-search.component.html'
})

export class LocationSearchComponent implements AfterViewInit {

    public latitude: number;
    public longitude: number;
    @Input() placeholder = 'Search Location';
    public zoom: number;
    @ViewChild('search') searchInput: ElementRef;
    @Output() change: EventEmitter<any> = new EventEmitter();

    constructor(
        private geocodeService: GeocodeService,
        private ngZone: NgZone
    ) {
    }

    ngAfterViewInit() {
        this.geocodeService.autocompleteAddress(this.searchInput.nativeElement)
            .subscribe(
                coords => {
                    this.change.emit(coords);
                }
            );
    }
}
