/** A Form is an extension of an Item. In advance to an Item it will create an Array of fields that is either extracted from config.fields or directly from the item body.*/
import { Item } from '../item/item';
import { Field } from '../field/field';
import { FormConfig } from './form-config.interface';
/** The Form class is an Item with additional info about its properties (Fields). */
export declare class Form<Object> extends Item<Object> {
    /** Array of fields. It will be populated automatically when the form is constructed. */
    fields: Field[];
    /** The configuration of the form. It is an extension of ItemConfig. */
    protected config: FormConfig<Object>;
    /** The constructor will populate the fields array.
     * If config.fields is set only the configured fields will be created.
     * If not, all properties of the given body will be used as fields. */
    constructor(body: Object, config?: FormConfig<Object>);
    /** returns the field instance of the given property */
    getField(property: string): any;
    /** Returns the original value of the property, if any. */
    getValue(property: string): any;
}
