import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

/** The toggle component is an alternative to the default boolean checkbox with fancier style.
 * It is used in the default input template for the view 'toggle'. */
@Component({
  selector: 'ec-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ToggleComponent),
      multi: true
    }
  ]
})
export class ToggleComponent implements ControlValueAccessor {
  value: boolean;
  @Input() placeholder: string;

  /** Toggles the value */
  toggle() {
    this.value = !this.value;
    this.propagateChange(this.value);
  }

  writeValue(value: boolean) {
    this.value = value;
  }

  propagateChange = (_: any) => {
  };

  registerOnChange(fn) {
    this.propagateChange = fn;
  }

  registerOnTouched() {
  }

}
