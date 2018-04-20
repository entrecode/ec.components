import { AgmCoreModule } from '@agm/core';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { UiModule } from '@ec.components/ui';
import { GeocodeService } from './geocode.service';
import { LocationPickerComponent } from './location-picker.component';
import { LocationSearchComponent } from './location-search.component';
import { LocationMapComponent } from './location-map.component';
import { CommonModule } from '@angular/common';



const LOCATION_COMPONENTS = [
    LocationMapComponent,
    LocationSearchComponent,
    LocationPickerComponent,
];
@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        UiModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyAdgEUE1Yxo1F-qb1MrO56u5KATpX9j8o4',
            libraries: ['places']
        })],
    exports: LOCATION_COMPONENTS,
    declarations: LOCATION_COMPONENTS,
    entryComponents: LOCATION_COMPONENTS,
    providers: [GeocodeService],
})
export class LocationModule { }
