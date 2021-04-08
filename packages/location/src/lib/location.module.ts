import { AgmCoreModule } from '@agm/core';
import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { UiModule } from '@ec.components/ui';
import { GeocodeService } from './geocode.service';
import { LocationMapComponent } from './location-map.component';
import { LocationPickerComponent } from './location-picker.component';
import { LocationSearchComponent } from './location-search.component';

/** This module holds all location/map related components and services */
@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UiModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAdgEUE1Yxo1F-qb1MrO56u5KATpX9j8o4',
      libraries: ['places'],
    }),
  ],
  exports: [LocationMapComponent, LocationSearchComponent, LocationPickerComponent],
  declarations: [LocationMapComponent, LocationSearchComponent, LocationPickerComponent],
  providers: [GeocodeService],
})
export class LocationModule {
  static forRoot({ apiKey }): ModuleWithProviders<LocationModule> {
    return {
      ngModule: LocationModule,
      providers: [
        {
          provide: 'googlemaps.apiKey',
          useValue: apiKey,
        },
      ],
    };
  }
}
