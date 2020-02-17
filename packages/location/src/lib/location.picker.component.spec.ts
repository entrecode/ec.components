import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LocationPickerComponent } from './location-picker.component';
import { RouterTestingModule } from '@angular/router/testing';
import { LocationMapComponent, LocationSearchComponent, GeocodeService } from '../public_api';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { UiModule } from '@ec.components/ui';
import { AgmCoreModule } from '@agm/core';

describe('LocationPickerComponent', () => {
  let component: LocationPickerComponent;
  let fixture: ComponentFixture<LocationPickerComponent>;
  const LOCATION_COMPONENTS = [LocationMapComponent, LocationSearchComponent, LocationPickerComponent];

  beforeEach(async(() => {
    TestBed.configureTestingModule(
      {
        imports: [
          CommonModule,
          ReactiveFormsModule,
          UiModule,
          RouterTestingModule,
          AgmCoreModule.forRoot({
            apiKey: 'AIzaSyAdgEUE1Yxo1F-qb1MrO56u5KATpX9j8o4',
            libraries: ['places'],
          }),
        ],
        declarations: LOCATION_COMPONENTS,
        providers: [GeocodeService],
      }
    ).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
