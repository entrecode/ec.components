import { AgmCoreModule } from '@agm/core';
import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { UiModule } from '@ec.components/ui';
import { GeocodeService } from './geocode.service';
import { LocationMapComponent } from './location-map.component';
import { LocationPickerComponent } from './location-picker.component';
import { LocationSearchComponent } from './location-search.component';
/** The components of this module */
const LOCATION_COMPONENTS = [LocationMapComponent, LocationSearchComponent, LocationPickerComponent];

export const locationModuleConfig = {
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UiModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAdgEUE1Yxo1F-qb1MrO56u5KATpX9j8o4',
      libraries: ['places'],
    }),
  ],
  exports: LOCATION_COMPONENTS,
  declarations: LOCATION_COMPONENTS,
  entryComponents: LOCATION_COMPONENTS,
  providers: [GeocodeService],
};
/** This module holds all location/map related components and services */
@NgModule(locationModuleConfig)
export class LocationModule {
  static forRoot({ apiKey }): ModuleWithProviders {
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
