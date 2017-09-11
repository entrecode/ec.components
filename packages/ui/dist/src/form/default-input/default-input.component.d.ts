import { FormControl, FormGroup } from '@angular/forms';
import { Field } from '@ec.components/core/src/field/field';
import { Item } from '@ec.components/core/src/item/item';
/** This component holds the templates for all basic field types. */
export declare class DefaultInputComponent {
    /** The field for which the input is meant. */
    field: Field<any>;
    /** The item that is targeted by the input */
    item: Item<any>;
    /** The form group that is used */
    group: FormGroup;
    /** The form control that is used */
    control: FormControl;
}
