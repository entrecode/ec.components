/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Configuration for a FieldConfig property.
 * @record
 */
export function FieldConfigProperty() { }
if (false) {
    /**
     * Property name
     * @type {?|undefined}
     */
    FieldConfigProperty.prototype.property;
    /**
     * Human readable field label. Defaults to property name. If false, the label is empty.
     * @type {?|undefined}
     */
    FieldConfigProperty.prototype.label;
    /**
     * Placeholder in inputs
     * @type {?|undefined}
     */
    FieldConfigProperty.prototype.placeholder;
    /**
     * Custom resolve transformation function.
     * \@param body The item body
     * @type {?|undefined}
     */
    FieldConfigProperty.prototype.resolve;
    /**
     * Custom resolve method to get the title, has priority over label property.
     * @type {?|undefined}
     */
    FieldConfigProperty.prototype.title;
    /**
     * Custom display transformation function.
     * \@param value The current property value
     * \@param field The field property name
     * @type {?|undefined}
     */
    FieldConfigProperty.prototype.display;
    /**
     * Custom group transformation function. Its return value will be used for grouping.
     * \@param value The current property value
     * \@param field The field property name
     * @type {?|undefined}
     */
    FieldConfigProperty.prototype.group;
    /**
     * Custom sort transformation function. Its return value will be used for sorting.
     * \@param value The current property value
     * \@param field The field property name
     * @type {?|undefined}
     */
    FieldConfigProperty.prototype.sort;
    /**
     * Custom validation function. Its return value will be used for validation in a form.
     * \@param value The current property value
     * \@param field The field property name
     * @type {?|undefined}
     */
    FieldConfigProperty.prototype.validate;
    /**
     * Custom validation function. Its return value will be used for validation in a form.
     * \@param value The current property value
     * \@param field The field property name
     * @type {?|undefined}
     */
    FieldConfigProperty.prototype.filter;
    /**
     * The field's type (use FieldType.*)
     * @type {?|undefined}
     */
    FieldConfigProperty.prototype.type;
    /**
     * The model title of the entries/entry field
     * @type {?|undefined}
     */
    FieldConfigProperty.prototype.model;
    /**
     * The type of cell view. (e.g. tags, email etc..)
     * @type {?|undefined}
     */
    FieldConfigProperty.prototype.view;
    /**
     * The type of form input view. Defaults to type if not specified.
     * @type {?|undefined}
     */
    FieldConfigProperty.prototype.inputView;
    /**
     * Tells if the field should be hidden
     * @type {?|undefined}
     */
    FieldConfigProperty.prototype.hidden;
    /**
     * Tells if the field is required in forms
     * @type {?|undefined}
     */
    FieldConfigProperty.prototype.required;
    /**
     * The field's JSON schema.
     * @type {?|undefined}
     */
    FieldConfigProperty.prototype.schema;
    /**
     * Custom Component for input (forms)
     * @type {?|undefined}
     */
    FieldConfigProperty.prototype.input;
    /**
     * Custom Component for output (e.g. list cell)
     * @type {?|undefined}
     */
    FieldConfigProperty.prototype.output;
    /**
     * If true, an ec-output will be rendered inside each form which prevents editing the field.
     * @type {?|undefined}
     */
    FieldConfigProperty.prototype.readOnly;
    /**
     * If true, the property will be omitted when saving (edit and create)
     * @type {?|undefined}
     */
    FieldConfigProperty.prototype.immutable;
    /**
     * if false, the field will not be filterable in a list
     * @type {?|undefined}
     */
    FieldConfigProperty.prototype.filterable;
    /**
     * The operator to use for filtering: exact, search, any etc.. see ec.sdk doc
     * @type {?|undefined}
     */
    FieldConfigProperty.prototype.filterOperator;
    /**
     * Defines the class for the filter pop, e.g. in list header.
     * @type {?|undefined}
     */
    FieldConfigProperty.prototype.filterPopClass;
    /**
     * Transforms a string value from the url query to a value that is used for filtering.
     * e.g. transforms "A,B,C" to ['A','B','C']
     * @type {?|undefined}
     */
    FieldConfigProperty.prototype.queryFilter;
    /**
     * if false, the field will not be sortable in a list
     * @type {?|undefined}
     */
    FieldConfigProperty.prototype.sortable;
    /**
     * if false, the field will not be visible in a list
     * @type {?|undefined}
     */
    FieldConfigProperty.prototype.list;
    /**
     * if false, the field will not be visible in a form
     * @type {?|undefined}
     */
    FieldConfigProperty.prototype.form;
    /**
     * If a prefill value is set, it will be used at creation in a form.
     * @type {?|undefined}
     */
    FieldConfigProperty.prototype.prefill;
    /**
     * Possible Values e.g. for a select
     * @type {?|undefined}
     */
    FieldConfigProperty.prototype.values;
    /**
     * Defines the maximum of visible item (for tags view or similar). Defaults to 10
     * @type {?|undefined}
     */
    FieldConfigProperty.prototype.maxItems;
    /**
     * Any other configuration properties
     * @type {?|undefined}
     */
    FieldConfigProperty.prototype.action;
    /**
     * Class string
     * @type {?|undefined}
     */
    FieldConfigProperty.prototype.class;
    /**
     * Icon name that should be associated with the field
     * @type {?|undefined}
     */
    FieldConfigProperty.prototype.icon;
    /**
     * Related identifier e.g. model name or assetGroupID
     * @type {?|undefined}
     */
    FieldConfigProperty.prototype.relation;
    /**
     * If true, the field will be filtered raw (no filterOperator magic)
     * @type {?|undefined}
     */
    FieldConfigProperty.prototype.rawFilter;
    /**
     * Columns that the field should inhabit in the form grid.
     * @type {?|undefined}
     */
    FieldConfigProperty.prototype.columns;
    /**
     * If true, the field wont be shown in the list column filter.
     * @type {?|undefined}
     */
    FieldConfigProperty.prototype.hideInColumnFilter;
    /**
     * If true, the field wont be shown in the form
     * @type {?|undefined}
     */
    FieldConfigProperty.prototype.hideInForm;
    /**
     * is fired when the value changes in a form
     * @type {?|undefined}
     */
    FieldConfigProperty.prototype.changed;
    /* Skipping unhandled member: [key: string]: any;*/
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmllbGQtY29uZmlnLXByb3BlcnR5LmludGVyZmFjZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BlYy5jb21wb25lbnRzL2NvcmUvIiwic291cmNlcyI6WyJsaWIvY29uZmlnL2ZpZWxkLWNvbmZpZy1wcm9wZXJ0eS5pbnRlcmZhY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFJQSx5Q0EwR0M7Ozs7OztJQXhHQyx1Q0FBa0I7Ozs7O0lBRWxCLG9DQUF5Qjs7Ozs7SUFFekIsMENBQXFCOzs7Ozs7SUFHckIsc0NBQTBEOzs7OztJQUUxRCxvQ0FBd0Q7Ozs7Ozs7SUFVeEQsc0NBQWtEOzs7Ozs7O0lBSWxELG9DQUE4Qjs7Ozs7OztJQUk5QixtQ0FBNkI7Ozs7Ozs7SUFJN0IsdUNBQWlDOzs7Ozs7O0lBSWpDLHFDQUErQjs7Ozs7SUFFL0IsbUNBQWM7Ozs7O0lBRWQsb0NBQWU7Ozs7O0lBRWYsbUNBQWM7Ozs7O0lBRWQsd0NBQW1COzs7OztJQUVuQixxQ0FBaUI7Ozs7O0lBRWpCLHVDQUFtQjs7Ozs7SUFFbkIscUNBR0U7Ozs7O0lBRUYsb0NBQWtCOzs7OztJQUVsQixxQ0FBbUI7Ozs7O0lBRW5CLHVDQUFtQjs7Ozs7SUFFbkIsd0NBQTBCOzs7OztJQUUxQix5Q0FBcUI7Ozs7O0lBRXJCLDZDQUF3Qjs7Ozs7SUFFeEIsNkNBQXdCOzs7Ozs7SUFHeEIsMENBQXFDOzs7OztJQUVyQyx1Q0FBbUI7Ozs7O0lBRW5CLG1DQUFlOzs7OztJQUVmLG1DQUFlOzs7OztJQUVmLHNDQUFjOzs7OztJQUVkLHFDQUFlOzs7OztJQUVmLHVDQUFrQjs7Ozs7SUFFbEIscUNBQThDOzs7OztJQUU5QyxvQ0FBZTs7Ozs7SUFFZixtQ0FBYzs7Ozs7SUFFZCx1Q0FBa0I7Ozs7O0lBRWxCLHdDQUFvQjs7Ozs7SUFFcEIsc0NBQWlCOzs7OztJQUVqQixpREFBNkI7Ozs7O0lBRTdCLHlDQUFxQjs7Ozs7SUFJckIsc0NBQTBDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVHlwZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG4vKiogQ29uZmlndXJhdGlvbiBmb3IgYSBGaWVsZENvbmZpZyBwcm9wZXJ0eS4gKi9cblxuZXhwb3J0IGludGVyZmFjZSBGaWVsZENvbmZpZ1Byb3BlcnR5IHtcbiAgLyoqIFByb3BlcnR5IG5hbWUgKi9cbiAgcHJvcGVydHk/OiBzdHJpbmc7XG4gIC8qKiBIdW1hbiByZWFkYWJsZSBmaWVsZCBsYWJlbC4gRGVmYXVsdHMgdG8gcHJvcGVydHkgbmFtZS4gSWYgZmFsc2UsIHRoZSBsYWJlbCBpcyBlbXB0eS4gKi9cbiAgbGFiZWw/OiBzdHJpbmcgfCBib29sZWFuO1xuICAvKiogUGxhY2Vob2xkZXIgaW4gaW5wdXRzICovXG4gIHBsYWNlaG9sZGVyPzogc3RyaW5nO1xuICAvKiogQ3VzdG9tIHJlc29sdmUgdHJhbnNmb3JtYXRpb24gZnVuY3Rpb24uXG4gICAqIEBwYXJhbSBib2R5IFRoZSBpdGVtIGJvZHkgKi9cbiAgcmVzb2x2ZT86IChib2R5OiBhbnksIGl0ZW06IGFueSwgcHJvcGVydHk6IHN0cmluZykgPT4gYW55O1xuICAvKiogQ3VzdG9tIHJlc29sdmUgbWV0aG9kIHRvIGdldCB0aGUgdGl0bGUsIGhhcyBwcmlvcml0eSBvdmVyIGxhYmVsIHByb3BlcnR5LiAqL1xuICB0aXRsZT86IChib2R5OiBhbnksIGl0ZW06IGFueSwgcHJvcGVydHk6IHN0cmluZykgPT4gYW55O1xuICAvKiogQ3VzdG9tIGVkaXQgdHJhbnNmb3JtYXRpb24gZnVuY3Rpb24uIEl0IGlzIHVzZWQgYmVmb3JlIGVkaXRpbmcgdGhlIHZhbHVlLCBlLmcuIGluIGEgZm9ybS5cbiAgICogQHBhcmFtIGJvZHkgVGhlIGl0ZW0gYm9keSAqL1xuICAvLyBlZGl0PzogKHZhbHVlLCBmaWVsZCwgcHJvcGVydHk6IHN0cmluZykgPT4gYW55O1xuICAvKiogQ3VzdG9tIHNlcmlhbGl6ZSB0cmFuc2Zvcm1hdGlvbiBmdW5jdGlvbi4gSXQgaXMgdXNlZCBiZWZvcmUgc2F2aW5nIGl0LCBlLmcuIGluIGEgZm9ybS5cbiAgICogQHBhcmFtIGJvZHkgVGhlIGl0ZW0gYm9keSAqL1xuICAvLyBzZXJpYWxpemU/OiAodmFsdWUsIGZpZWxkLCBwcm9wZXJ0eTogc3RyaW5nKSA9PiBhbnk7XG4gIC8qKiBDdXN0b20gZGlzcGxheSB0cmFuc2Zvcm1hdGlvbiBmdW5jdGlvbi5cbiAgICogQHBhcmFtIHZhbHVlIFRoZSBjdXJyZW50IHByb3BlcnR5IHZhbHVlXG4gICAqIEBwYXJhbSBmaWVsZCBUaGUgZmllbGQgcHJvcGVydHkgbmFtZSAqL1xuICBkaXNwbGF5PzogKHZhbHVlLCBmaWVsZCwgcHJvcGVydHk6IHN0cmluZykgPT4gYW55O1xuICAvKiogQ3VzdG9tIGdyb3VwIHRyYW5zZm9ybWF0aW9uIGZ1bmN0aW9uLiBJdHMgcmV0dXJuIHZhbHVlIHdpbGwgYmUgdXNlZCBmb3IgZ3JvdXBpbmcuXG4gICAqIEBwYXJhbSB2YWx1ZSBUaGUgY3VycmVudCBwcm9wZXJ0eSB2YWx1ZVxuICAgKiBAcGFyYW0gZmllbGQgVGhlIGZpZWxkIHByb3BlcnR5IG5hbWUgKi9cbiAgZ3JvdXA/OiAodmFsdWUsIGZpZWxkKSA9PiBhbnk7XG4gIC8qKiBDdXN0b20gc29ydCB0cmFuc2Zvcm1hdGlvbiBmdW5jdGlvbi4gSXRzIHJldHVybiB2YWx1ZSB3aWxsIGJlIHVzZWQgZm9yIHNvcnRpbmcuXG4gICAqIEBwYXJhbSB2YWx1ZSBUaGUgY3VycmVudCBwcm9wZXJ0eSB2YWx1ZVxuICAgKiBAcGFyYW0gZmllbGQgVGhlIGZpZWxkIHByb3BlcnR5IG5hbWUgKi9cbiAgc29ydD86ICh2YWx1ZSwgZmllbGQpID0+IGFueTtcbiAgLyoqIEN1c3RvbSB2YWxpZGF0aW9uIGZ1bmN0aW9uLiBJdHMgcmV0dXJuIHZhbHVlIHdpbGwgYmUgdXNlZCBmb3IgdmFsaWRhdGlvbiBpbiBhIGZvcm0uXG4gICAqIEBwYXJhbSB2YWx1ZSBUaGUgY3VycmVudCBwcm9wZXJ0eSB2YWx1ZVxuICAgKiBAcGFyYW0gZmllbGQgVGhlIGZpZWxkIHByb3BlcnR5IG5hbWUgKi9cbiAgdmFsaWRhdGU/OiAodmFsdWUsIGZpZWxkKSA9PiBhbnk7XG4gIC8qKiBDdXN0b20gdmFsaWRhdGlvbiBmdW5jdGlvbi4gSXRzIHJldHVybiB2YWx1ZSB3aWxsIGJlIHVzZWQgZm9yIHZhbGlkYXRpb24gaW4gYSBmb3JtLlxuICAgKiBAcGFyYW0gdmFsdWUgVGhlIGN1cnJlbnQgcHJvcGVydHkgdmFsdWVcbiAgICogQHBhcmFtIGZpZWxkIFRoZSBmaWVsZCBwcm9wZXJ0eSBuYW1lICovXG4gIGZpbHRlcj86ICh2YWx1ZSwgaXRlbXMpID0+IGFueTtcbiAgLyoqIFRoZSBmaWVsZCdzIHR5cGUgKHVzZSBGaWVsZFR5cGUuKikgKi9cbiAgdHlwZT86IHN0cmluZztcbiAgLyoqIFRoZSBtb2RlbCB0aXRsZSBvZiB0aGUgZW50cmllcy9lbnRyeSBmaWVsZCAqL1xuICBtb2RlbD86IHN0cmluZztcbiAgLyoqIFRoZSB0eXBlIG9mIGNlbGwgdmlldy4gKGUuZy4gdGFncywgZW1haWwgZXRjLi4pICovXG4gIHZpZXc/OiBzdHJpbmc7XG4gIC8qKiBUaGUgdHlwZSBvZiBmb3JtIGlucHV0IHZpZXcuIERlZmF1bHRzIHRvIHR5cGUgaWYgbm90IHNwZWNpZmllZC4gKi9cbiAgaW5wdXRWaWV3Pzogc3RyaW5nO1xuICAvKiogVGVsbHMgaWYgdGhlIGZpZWxkIHNob3VsZCBiZSBoaWRkZW4gKi9cbiAgaGlkZGVuPzogYm9vbGVhbjtcbiAgLyoqIFRlbGxzIGlmIHRoZSBmaWVsZCBpcyByZXF1aXJlZCBpbiBmb3JtcyAqL1xuICByZXF1aXJlZD86IGJvb2xlYW47XG4gIC8qKiBUaGUgZmllbGQncyBKU09OIHNjaGVtYS4gKi9cbiAgc2NoZW1hPzoge1xuICAgIHR5cGU6IHN0cmluZztcbiAgICB0aXRsZTogc3RyaW5nXG4gIH07XG4gIC8qKiBDdXN0b20gQ29tcG9uZW50IGZvciBpbnB1dCAoZm9ybXMpICovXG4gIGlucHV0PzogVHlwZTxhbnk+O1xuICAvKiogQ3VzdG9tIENvbXBvbmVudCBmb3Igb3V0cHV0IChlLmcuIGxpc3QgY2VsbCkgKi9cbiAgb3V0cHV0PzogVHlwZTxhbnk+O1xuICAvKiogSWYgdHJ1ZSwgYW4gZWMtb3V0cHV0IHdpbGwgYmUgcmVuZGVyZWQgaW5zaWRlIGVhY2ggZm9ybSB3aGljaCBwcmV2ZW50cyBlZGl0aW5nIHRoZSBmaWVsZC4gKi9cbiAgcmVhZE9ubHk/OiBib29sZWFuO1xuICAvKiogSWYgdHJ1ZSwgdGhlIHByb3BlcnR5IHdpbGwgYmUgb21pdHRlZCB3aGVuIHNhdmluZyAoZWRpdCBhbmQgY3JlYXRlKSAqL1xuICBpbW11dGFibGU/OiBib29sZWFuIHwgYW55O1xuICAvKiogaWYgZmFsc2UsIHRoZSBmaWVsZCB3aWxsIG5vdCBiZSBmaWx0ZXJhYmxlIGluIGEgbGlzdCAqL1xuICBmaWx0ZXJhYmxlPzogYm9vbGVhbjtcbiAgLyoqIFRoZSBvcGVyYXRvciB0byB1c2UgZm9yIGZpbHRlcmluZzogZXhhY3QsIHNlYXJjaCwgYW55IGV0Yy4uIHNlZSBlYy5zZGsgZG9jICovXG4gIGZpbHRlck9wZXJhdG9yPzogc3RyaW5nO1xuICAvKiogRGVmaW5lcyB0aGUgY2xhc3MgZm9yIHRoZSBmaWx0ZXIgcG9wLCBlLmcuIGluIGxpc3QgaGVhZGVyLiAqL1xuICBmaWx0ZXJQb3BDbGFzcz86IHN0cmluZztcbiAgLyoqIFRyYW5zZm9ybXMgYSBzdHJpbmcgdmFsdWUgZnJvbSB0aGUgdXJsIHF1ZXJ5IHRvIGEgdmFsdWUgdGhhdCBpcyB1c2VkIGZvciBmaWx0ZXJpbmcuXG4gICAqIGUuZy4gdHJhbnNmb3JtcyBcIkEsQixDXCIgdG8gWydBJywnQicsJ0MnXSAqL1xuICBxdWVyeUZpbHRlcj86ICh2YWx1ZTogc3RyaW5nKSA9PiBhbnk7XG4gIC8qKiBpZiBmYWxzZSwgdGhlIGZpZWxkIHdpbGwgbm90IGJlIHNvcnRhYmxlIGluIGEgbGlzdCAqL1xuICBzb3J0YWJsZT86IGJvb2xlYW47XG4gIC8qKiBpZiBmYWxzZSwgdGhlIGZpZWxkIHdpbGwgbm90IGJlIHZpc2libGUgaW4gYSBsaXN0ICovXG4gIGxpc3Q/OiBib29sZWFuO1xuICAvKiogaWYgZmFsc2UsIHRoZSBmaWVsZCB3aWxsIG5vdCBiZSB2aXNpYmxlIGluIGEgZm9ybSAqL1xuICBmb3JtPzogYm9vbGVhbjtcbiAgLyoqIElmIGEgcHJlZmlsbCB2YWx1ZSBpcyBzZXQsIGl0IHdpbGwgYmUgdXNlZCBhdCBjcmVhdGlvbiBpbiBhIGZvcm0uICovXG4gIHByZWZpbGw/OiBhbnk7XG4gIC8qKiBQb3NzaWJsZSBWYWx1ZXMgZS5nLiBmb3IgYSBzZWxlY3QgKi9cbiAgdmFsdWVzPzogYW55W107XG4gIC8qKiBEZWZpbmVzIHRoZSBtYXhpbXVtIG9mIHZpc2libGUgaXRlbSAoZm9yIHRhZ3MgdmlldyBvciBzaW1pbGFyKS4gRGVmYXVsdHMgdG8gMTAgKi9cbiAgbWF4SXRlbXM/OiBudW1iZXI7XG4gIC8qKiBBbnkgb3RoZXIgY29uZmlndXJhdGlvbiBwcm9wZXJ0aWVzKi9cbiAgYWN0aW9uPzogKGl0ZW06IGFueSwgcHJvcGVydHk6IHN0cmluZykgPT4gYW55O1xuICAvKiogQ2xhc3Mgc3RyaW5nICovXG4gIGNsYXNzPzogc3RyaW5nO1xuICAvKiogSWNvbiBuYW1lIHRoYXQgc2hvdWxkIGJlIGFzc29jaWF0ZWQgd2l0aCB0aGUgZmllbGQgKi9cbiAgaWNvbj86IHN0cmluZztcbiAgLyoqIFJlbGF0ZWQgaWRlbnRpZmllciBlLmcuIG1vZGVsIG5hbWUgb3IgYXNzZXRHcm91cElEICovXG4gIHJlbGF0aW9uPzogc3RyaW5nO1xuICAvKiogSWYgdHJ1ZSwgdGhlIGZpZWxkIHdpbGwgYmUgZmlsdGVyZWQgcmF3IChubyBmaWx0ZXJPcGVyYXRvciBtYWdpYykgKi9cbiAgcmF3RmlsdGVyPzogYm9vbGVhbjtcbiAgLyoqIENvbHVtbnMgdGhhdCB0aGUgZmllbGQgc2hvdWxkIGluaGFiaXQgaW4gdGhlIGZvcm0gZ3JpZC4gKi9cbiAgY29sdW1ucz86IG51bWJlcjtcbiAgLyoqIElmIHRydWUsIHRoZSBmaWVsZCB3b250IGJlIHNob3duIGluIHRoZSBsaXN0IGNvbHVtbiBmaWx0ZXIuICovXG4gIGhpZGVJbkNvbHVtbkZpbHRlcj86IGJvb2xlYW47XG4gIC8qKiBJZiB0cnVlLCB0aGUgZmllbGQgd29udCBiZSBzaG93biBpbiB0aGUgZm9ybSAqL1xuICBoaWRlSW5Gb3JtPzogYm9vbGVhbjtcbiAgLyoqIElmIHRydWUsIHRoZSBmaWVsZCB3aWxsIGJlIGhpZGRlbiBpbiB0aGUgbGlzdCAoYnV0IHN0aWxsIGJlIGxvYWRlZCkgKi9cbiAgLyogaGlkZUluTGlzdD86IGJvb2xlYW47ICovXG4gIC8qKiBpcyBmaXJlZCB3aGVuIHRoZSB2YWx1ZSBjaGFuZ2VzIGluIGEgZm9ybSAqL1xuICBjaGFuZ2VkPzogKHZhbHVlOiBhbnksIGZvcm06IGFueSkgPT4gdm9pZDtcbiAgLyoqIHdpbGRjYXJkIGZvciBjdXN0b20gY29uZmlnIHZhbHVlcyAqL1xuICBba2V5OiBzdHJpbmddOiBhbnk7XG59XG4iXX0=