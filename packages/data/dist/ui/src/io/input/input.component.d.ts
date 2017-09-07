import { EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DynamicSlotComponent } from '../dynamic-slot/dynamic-slot.component';
import { Field } from '@ec.components/core/src/field/field';
import { Item } from '@ec.components/core/src/item/item';
/** This directive can be used to display a field. It is used inside ec-form as well as ec-list. */
export declare class InputComponent extends DynamicSlotComponent {
    /** The belonging form group */
    group: FormGroup;
    /** The belonging form control. This is not required if you pass in a field and group. */
    control: FormControl;
    /** The changed ouput emits whenever the form control of the input changes. */
    changed: EventEmitter<{}>;
    /** Debounce time in ms before the changed event emits. */
    debounce: number;
    /** The instance of field that should be used in the template */
    field: Field<any>;
    /** The belonging item */
    item: Item<any>;
    ngOnChanges(): void;
}
