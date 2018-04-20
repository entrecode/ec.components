import { NgModule } from '@angular/core';

import { LocationPickerComponent } from './location-picker.component';
import { AgmCoreModule } from '@agm/core';

@NgModule({
    imports: [
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyAdgEUE1Yxo1F-qb1MrO56u5KATpX9j8o4'
        })],
    exports: [LocationPickerComponent],
    declarations: [LocationPickerComponent],
    entryComponents: [LocationPickerComponent],
    providers: [],
})
export class LocationModule { }
