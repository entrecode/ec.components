/** A Form is an extension of an Item. In advance to an Item it will create an Array of fields that is either extracted
 * from config.fields or directly from the item body. */
import { FieldConfigProperty } from '../config/field-config-property.interface';
import { Field } from '../field/field';
import { Item } from '../item/item';
import { FormConfig } from './form-config.interface';
/** The Form class is an Item with additional info about its properties (Fields). */
export declare class Form<T> extends Item<T> {
    /** Array of fields. It will be populated automatically when the form is constructed. */
    fields: Field[];
    /** The configuration of the form. It is an extension of ItemConfig. */
    config: FormConfig<T>;
    /** The constructor will populate the fields array.
     * If config.fields is set only the configured fields will be created.
     * If not, all properties of the given body will be used as fields. */
    constructor(body: T, config?: FormConfig<T>);
    /** creates and adds a single field to the form */
    createField(property: string, config: FieldConfigProperty): Field | undefined;
    /** returns the field instance of the given property */
    getField(property: string): Field;
    /** Returns the original value of the property, if any. */
    getValue(property: string): any;
    /** Returns true if the form is currently in edit mode (has a body set) */
    isEditing(): boolean;
    /** Returns true if the form is currently in create mode (has not a body set) */
    isCreating(): boolean;
}
