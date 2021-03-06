import { Component, forwardRef, Input, ViewChild } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DefaultInputComponent, FormService, InputComponent, KeycommandsService } from '@ec.components/ui';
import { GeocodeService } from './geocode.service';
import { LocationMapComponent } from './location-map.component';
import { LocationSearchComponent } from './location-search.component';

/** Component with map and autocomplete input to pick a location. Implements ControlValueAccessor */
@Component({
  selector: 'ec-location-picker',
  templateUrl: './location-picker.component.html',
  styleUrls: ['./location-picker.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => LocationPickerComponent),
      multi: true,
    },
  ],
})
export class LocationPickerComponent extends DefaultInputComponent implements ControlValueAccessor {
  /** The form control that holds the location */
  @Input() formControl: FormControl;
  /** If true, the raw location value will be visible*/
  @Input() showRawValue = true;
  /** Placeholder for search input */
  @Input() placeholder;
  /** The nested LocationMapComponent */
  @ViewChild(LocationMapComponent, { static: true }) map: LocationMapComponent;
  /** The nested LocationSearchComponent */
  @ViewChild(LocationSearchComponent, { static: true }) search: LocationSearchComponent;
  /** Form input component */
  input: InputComponent;
  /** readonly? */
  @Input() disabled: boolean;

  constructor(
    public geocodeService: GeocodeService,
    public formService: FormService,
    public keycommands: KeycommandsService
  ) {
    super(formService, keycommands);
  }

  /** Sets value of map and propagates change */
  setValue(value, fromSearch?: boolean) {
    if (!value) {
      this.search.clear();
    }
    this.map.setValue(value);
    if (!fromSearch) {
      this.updateAddress();
    }
    this.propagateChange(value);
  }

  /** Writes value to editor on outside model change. */
  writeValue(value: any) {
    this.map.setValue(value);
    this.updateAddress();
  }

  /** updates the address string by reverse geo lookup  */
  updateAddress() {
    const value = this.map.value;
    if (!value) {
      this.search.searchInput.nativeElement.value = '';
      return;
    }
    this.geocodeService.getNearestAddress(value).then((results) => {
      if (results.length) {
        this.search.searchInput.nativeElement.value = results[0].formatted_address;
      } else {
        this.search.searchInput.nativeElement.value = '';
      }
    });
  }

  propagateChange = (_: any) => {};

  registerOnChange(fn) {
    this.propagateChange = fn;
  }

  registerOnTouched() {}

  setDisabledState(isDisabled) {
    this.disabled = isDisabled;
  }
}
