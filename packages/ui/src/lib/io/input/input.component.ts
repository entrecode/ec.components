import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnChanges,
  Output,
  Type,
  ChangeDetectionStrategy,
} from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR, AbstractControl } from '@angular/forms';
import { FieldConfigProperty, Field, Form, Item } from '@ec.components/core';
import { DynamicSlotComponent } from '../dynamic-slot/dynamic-slot.component';
import { DefaultInputComponent } from '../../form/default-input/default-input.component';
import { debounceTime } from 'rxjs/operators';

/** This directive can be used to display a field. It is used inside ec-form as well as ec-list. */
@Component({
  selector: 'ec-input',
  templateUrl: '../dynamic-slot/dynamic-slot.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
})
export class InputComponent extends DynamicSlotComponent implements ControlValueAccessor, OnChanges {
  /** The belonging form group */
  @Input() group: FormGroup;
  /** The belonging form control. This is not required if you pass in a field and group. */
  @Input() control: AbstractControl;
  /** The changed ouput emits whenever the form control of the input changes. */
  @Output() changed = new EventEmitter();
  /** Emits when the component has been loaded */
  @Output() ready = new EventEmitter();
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
  /** If true, the input will never reinit/reload. */
  @Input() lazy: boolean;
  /** Holds a reference to the component instance. This is helpful when you want to modify the component after form intialization.
   * You can access a form's InputComponents via FormComponent#inputs */
  componentInstance: InputComponent;
  /** The current value of the input. Needs to be saved for the case the component is not yet loaded */
  value: any;
  /** Emitter to focus the input field */
  focusEvent: EventEmitter<boolean> = new EventEmitter();

  ngOnChanges(changes?) {
    if (!this.lazy || !this.componentInstance || changes.field) {
      this.init();
    }
  }

  focus(focus = true) {
    if (this.componentInstance && this.componentInstance.focusEvent) {
      this.componentInstance.focusEvent.emit(focus);
    } else {
      console.warn('could not focus component', this.componentInstance);
    }
  }

  init() {
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
        [this.property || this.field.property || 'input']: this.control,
      });
    }
    const data = {
      group: this.group,
      control: this.control || this.group ? this.group.get(this.field.property) : null,
      item: this.item,
      field: this.field,
      input: this,
      config: this.config || this.field.config || {},
      focusEvent: this.focusEvent,
    };
    const componentRef = this.loadComponent(this.component || this.field.input || DefaultInputComponent, data);
    this.componentInstance = componentRef.instance;
    this.connectControl();
    this.ready.emit(this);
    if (this.componentInstance.control) {
      this.componentInstance.control.valueChanges.pipe(debounceTime(this.debounce)).subscribe((change) => {
        this.changed.emit(change);
        this.propagateChange(change);
      });
    }
    if (this.field && typeof this.field.init === 'function') {
      this.field.init(this.componentInstance, this);
    }
  }

  connectControl() {
    if (!this.componentInstance) {
      // console.warn('could not connect control: no instance loaded');
      return;
    }
    if (this.componentInstance.registerOnChange && this.propagateChange) {
      this.componentInstance.registerOnChange(this.propagateChange);
    }
    if (this.value !== undefined) {
      this.writeValue(this.value);
    }
  }

  /** writes value to editor on outside model change. */
  writeValue(value: any) {
    if (this.componentInstance && this.componentInstance.writeValue) {
      this.componentInstance.writeValue(value);
    }
    this.value = value;
  }

  propagateChange = (_: any) => {};

  /** Registers change callback */
  registerOnChange(fn) {
    this.propagateChange = fn;
    this.connectControl();
  }

  registerOnTouched() {}
}
