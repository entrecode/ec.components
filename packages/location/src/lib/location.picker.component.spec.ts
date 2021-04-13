import { AgmCoreModule } from '@agm/core';
import { CommonModule } from '@angular/common';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { UiModule } from '@ec.components/ui';
import { GeocodeService, LocationMapComponent, LocationSearchComponent } from '../public_api';
import { LocationPickerComponent } from './location-picker.component';

describe('LocationPickerComponent', () => {
  let component: LocationPickerComponent;
  let fixture: ComponentFixture<LocationPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
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
      declarations: [LocationMapComponent, LocationSearchComponent, LocationPickerComponent],
      providers: [GeocodeService],
    }).compileComponents();
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
