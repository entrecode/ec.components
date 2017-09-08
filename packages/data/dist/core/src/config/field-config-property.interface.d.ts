import { Type } from '@angular/core';
/** Configuration for a FieldConfig property. */
export interface FieldConfigProperty {
    /** Property name */
    property?: string;
    /** Human readable field label*/
    label?: string;
    /** Placeholder in inputs */
    placeholder?: string;
    /** Custom resolve transformation function.
     * @param body The item body */
    resolve?: (body: any, item: any, property: string) => any;
    /** Custom resolve method to get the title, has priority over label property. */
    title?: (body: any, item: any, property: string) => any;
    /** Custom edit transformation function. It is used before editing the value, e.g. in a form.
     * @param body The item body */
    /** Custom serialize transformation function. It is used before saving it, e.g. in a form.
     * @param body The item body */
    /** Custom display transformation function.
     * @param value The current property value
     * @param field The field property name */
    display?: (value, field, property: string) => any;
    /** Custom group transformation function. Its return value will be used for grouping.
     * @param value The current property value
     * @param field The field property name */
    group?: (value, field) => any;
    /** Custom sort transformation function. Its return value will be used for sorting.
     * @param value The current property value
     * @param field The field property name */
    sort?: (value, field) => any;
    /** Custom validation function. Its return value will be used for validation in a form.
     * @param value The current property value
     * @param field The field property name */
    validate?: (value, field) => any;
    /** Custom validation function. Its return value will be used for validation in a form.
     * @param value The current property value
     * @param field The field property name */
    filter?: (value, items) => any;
    /** The field's type (use FieldType.*) */
    type?: string;
    /** The model title of the entries/entry field */
    model?: string;
    /** The type of cell view. (e.g. tags, email etc..) */
    view?: string;
    /** Tells if the field should be hidden */
    hidden?: boolean;
    /** Tells if the field is required in forms */
    required?: boolean;
    /** The field's JSON schema. */
    schema?: {
        type: string;
        title: string;
    };
    /** Custom Component for input (forms) */
    input?: Type<any>;
    /** Custom Component for output (e.g. list cell) */
    output?: Type<any>;
    /** If true, an ec-output will be rendered inside each form which prevents editing the field. */
    readOnly?: boolean;
    /** if false, the field will not be filterable in a list */
    filterable?: boolean;
    /** The operator to use for filtering: exact, search, any etc.. see ec.sdk doc */
    filterOperator?: string;
    /** Defines the class for the filter pop, e.g. in list header. */
    filterPopClass?: string;
    /** Transforms a string value from the url query to a value that is used for filtering.
     * e.g. transforms "A,B,C" to ['A','B','C'] */
    queryFilter?: (value: string) => any;
    /** if false, the field will not be sortable in a list */
    sortable?: boolean;
    /** if false, the field will not be visible in a list */
    list?: boolean;
    /** if false, the field will not be visible in a form */
    form?: boolean;
    /** If a prefill value is set, it will be used at creation in a form. */
    prefill?: any;
}
