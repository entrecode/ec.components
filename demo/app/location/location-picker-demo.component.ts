import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'ec-location-picker-demo',
    template: `
    <div>
    <h1>Location Picker</h1>
    <ec-location-picker></ec-location-picker>
    </div>`
})

export class LocationPickerDemoComponent implements OnInit {
    constructor() { }

    ngOnInit() { }
}
