import { AfterViewInit, Component, ElementRef, EventEmitter, Input, NgZone, Output, ViewChild } from '@angular/core';
import from 'googlemaps';
import { GeocodeService } from './geocode.service';

/** Google Maps Location Searchbar */
@Component({
    selector: 'ec-location-search',
    templateUrl: './location-search.component.html'
})

export class LocationSearchComponent implements AfterViewInit {
    /** Placeholder for input */
    @Input() placeholder = 'Search Location';
    /** The search input element */
    @ViewChild('search') searchInput: ElementRef;
    /** emits when the coords have been changed (after selecting a match) */
    @Output() change: EventEmitter<any> = new EventEmitter();

    constructor(
        private geocodeService: GeocodeService,
        private ngZone: NgZone
    ) {
    }
    /** Clears the searchbar input value */
    clear() {
        if (this.searchInput) {
            this.searchInput.nativeElement.value = '';
        }
    }
    /** subscribes to changes from the inputs autocomplete using geocodeService. */
    ngAfterViewInit() {
        this.geocodeService.autocompleteAddress(this.searchInput.nativeElement)
            .subscribe(
                coords => {
                    this.change.emit(coords);
                }
            );
    }
}
