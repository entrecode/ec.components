import { Component, EventEmitter, forwardRef, Input, OnChanges, Output, Type } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR, AbstractControl } from '@angular/forms';
import { FieldConfigProperty } from '@ec.components/core';
import { Field } from '@ec.components/core/src/field/field';
import { Form } from '@ec.components/core/src/form/form';
import { Item } from '@ec.components/core/src/item/item';
import { DefaultInputComponent } from '../../form/default-input/default-input.component';
import { DynamicSlotComponent } from '../dynamic-slot/dynamic-slot.component';

/** This directive can be used to display a field. It is used inside ec-form as well as ec-list. */
@Component({
  selector: 'ec-input',
  templateUrl: '../dynamic-slot/dynamic-slot.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ]
})
export class InputComponent extends DynamicSlotComponent implements ControlValueAccessor, OnChanges {
  /** The belonging form group */
  @Input() group: FormGroup;
  /** The belonging form control. This is not required if you pass in a field and group. */
  @Input() control: AbstractControl;
  /** The changed ouput emits whenever the form control of the input changes. */
  @Output() changed = new EventEmitter();
  /** Debounce time in ms before the changed event emits. */
  @Input() debounce = 0;
  /** The instance of field that should be used in the template, can also be a property name. */
  @Input() field: Field;
  /** The property name that is edited. Expects a form as item input */
  @Input() property: string;
  /** The belonging item */
  @Input() item: Item<any>;
  /** Config that should be used, only needed when not using field input */
  @Input() config: FieldConfigProperty;
  /** Overrides the default component */
  @Input() component: Type<any>;
  /** Holds a reference to the component instance. This is helpful when you want to modify the component after form intialization.
   * You can access a form's InputComponents via FormComponent#inputs */
  componentInstance: Component

  ngOnChanges() {
    if (this.property && this.item instanceof Form) {
      this.field = this.item.getField(this.property);
    } else if (!this.field && this.config) {
      this.field = new Field(this.property || 'input', this.config);
    }
    if (!this.field) {
      return;
    }
    if (!this.control) {
      this.control = this.group ? this.group.get(this.field.property) : new FormControl();
    }
    if (!this.group) {
      this.group = new FormGroup({
        [this.property || this.field.property || 'input']: this.control
      });
    }
    const data = {
      group: this.group,
      control: this.control,
      item: this.item,
      field: this.field,
      input: this
    };
    const componentRef = this.loadComponent(this.component || this.field.input || DefaultInputComponent, data);
    this.componentInstance = componentRef.instance;
    if (componentRef.instance.control) {
      componentRef.instance.control.valueChanges
        .debounceTime(this.debounce)
        .subscribe((change) => {
          this.changed.emit(change);
          this.propagateChange(change);
        });
    }
    if (this.field && typeof this.field.init === 'function') {
      this.field.init(this.componentInstance, this);
    }
  }

  /** writes value to editor on outside model change. */
  writeValue(value: any) {
    if (this.componentInstance && this.componentInstance['writeValue']) {
      this.componentInstance['writeValue'](value); // TODO: this is pretty hacky
    }
  }

  propagateChange = (_: any) => {
  };

  /** Registers change callback */
  registerOnChange(fn) {
    this.propagateChange = fn;
  }

  registerOnTouched() {
  }
}
