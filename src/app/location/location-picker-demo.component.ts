import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'ec-location-picker-demo',
    templateUrl: 'location-picker-demo.component.html'
})

export class LocationPickerDemoComponent implements OnInit {
    myLocation = {
        latitude: 51.678418,
        longitude: 7.809007
    };
    constructor() { }

    ngOnInit() { }
}
