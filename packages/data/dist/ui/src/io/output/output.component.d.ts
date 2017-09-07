import { DynamicSlotComponent } from '../dynamic-slot/dynamic-slot.component';
import { Field } from '@ec.components/core/src/field/field';
import { Item } from '@ec.components/core/src/item/item';
/** Outputs the given field of the given item, rendering the component dynamically. */
export declare class OutputComponent extends DynamicSlotComponent {
    /** The instance of field that should be used in the template */
    field: Field<any>;
    /** The belonging item */
    item: Item<any>;
    /** The component is loade as soon as the field and item are known.
     * If the field has no output property set, the DefaultOutputComponent will be rendered. */
    ngOnChanges(): void;
}
