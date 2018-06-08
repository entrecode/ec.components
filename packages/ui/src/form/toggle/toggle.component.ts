import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

/** The toggle component is an alternative to the default boolean checkbox with fancier style.
 * It is used in the default input template for the view 'toggle'. */
@Component({
  selector: 'ec-toggle',
  templateUrl: './toggle.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ToggleComponent),
      multi: true
    }
  ]
})
export class ToggleComponent implements ControlValueAccessor {
  /** The current value */
  value: boolean;
  /** The toggles placeholder (currently not in use) */
  @Input() placeholder: string;

  /** Toggles the value */
  toggle() {
    this.value = !this.value;
    this.propagateChange(this.value);
  }
  /** writes incoming value */
  writeValue(value: boolean) {
    this.value = value;
  }
  /* Propagates change*/
  propagateChange = (_: any) => {
  };
  /** Registers change callback */
  registerOnChange(fn) {
    this.propagateChange = fn;
  }
  /** Register Touch */
  registerOnTouched() {
  }

}
