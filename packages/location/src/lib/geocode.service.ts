import { MapsAPILoader } from '@agm/core';
import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { from } from 'rxjs';

/** declares google namespace */
declare var google: any;

/** Wraps google maps api to handle geocode operations */
@Injectable()
export class GeocodeService {

    constructor(private mapLoader: MapsAPILoader,
        private ngZone: NgZone) { }

    /** Observes a given input element, transforming it into an autocomplete */
    public observeElement(el) {
        return new Observable(observer => {
            const autocomplete = new google.maps.places.Autocomplete(el, {
                types: ['address']
            });
            autocomplete.addListener('place_changed', () => {
                this.ngZone.run(() => {
                    // get the place result
                    const place = autocomplete.getPlace();
                    // verify result
                    if (place.geometry === undefined || place.geometry === null) {
                        return;
                    }
                    const coords = {
                        latitude: place.geometry.location.lat(),
                        longitude: place.geometry.location.lng()
                    };
                    observer.next(coords);
                    /* observer.complete(); */
                });
            });
        });
    }

    /** Turns an input element to an maps autocomplete searchbar. */
    public autocompleteAddress(el): Observable<any> {
        return from(this.mapLoader.load())
            .pipe(switchMap(() => this.observeElement(el)));
    }

    /** Reverse address lookup for a given location */
    geocodeLatLng(geocoder, location): Promise<any> {
        return new Promise((resolve, reject) => {
            geocoder.geocode({ location }, (results, status) => {
                if (status === 'OK') {
                    resolve(results);
                } else {
                    reject(status);
                }
            });
        });
    }

    /** Returns the nearest address for a given location */
    public getNearestAddress(location: { latitude: number, longitude: number }): Promise<Array<any>> {
        return this.mapLoader.load().then(() => {
            return this.geocodeLatLng(
                new google.maps.Geocoder, {
                    lat: location.latitude,
                    lng: location.longitude
                }
            );
        });
    }
}
