/*
 * Public API Surface of location
 */

// fix for @agm/core
declare module '@angular/core' {
  interface ModuleWithProviders<T = any> {
    ngModule: Type<T>;
    providers?: Provider[];
  }
}

export * from './lib/geocode.service';
export * from './lib/location-map.component';
export * from './lib/location-picker.component';
export * from './lib/location-search.component';
export * from './lib/location.module';

