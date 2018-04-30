import { Injectable, NgZone } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { of } from 'rxjs/observable/of';
import { filter, catchError, tap, map, switchMap } from 'rxjs/operators';
import { fromPromise } from 'rxjs/observable/fromPromise';

declare var google: any;

@Injectable()
export class GeocodeService {
    private geocoder: any;

    constructor(private mapLoader: MapsAPILoader,
        private ngZone: NgZone) { }


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
                    }
                    observer.next(coords);
                    /* observer.complete(); */
                });
            });
        });
    }

    public autocompleteAddress(el): Observable<any> {
        return fromPromise(this.mapLoader.load())
            .pipe(switchMap(() => this.observeElement(el)));
    }

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

    public getNearestAddress(location: { latitude: number, longitude: number }): Promise<Array<any>> {
        return this.mapLoader.load().then(() => {
            return this.geocodeLatLng(
                new google.maps.Geocoder, {
                    lat: location.latitude,
                    lng: location.longitude
                }
            );
        })
    }
};
