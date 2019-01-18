/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** A Field acts as a property of an Item. It holds a single Property config. */
var Field = /** @class */ (function () {
    /** A Field is constructed by assigning the given config and the property to itself*/
    function Field(property, config) {
        /**
         * Possible Values e.g. in a select
         */
        this.values = [];
        /**
         * Class string
         */
        this.class = '';
        if (config) {
            Object.assign(this, config);
        }
        Object.assign(this, { property: property });
        this.id = this.property + "_" + Date.now();
    }
    /** Returns placeholder if any */
    /**
     * Returns placeholder if any
     * @return {?}
     */
    Field.prototype.getPlaceholder = /**
     * Returns placeholder if any
     * @return {?}
     */
    function () {
        return this.placeholder || this.label || this.property;
    };
    /** Returns the column class for data-col, based on configured columns */
    /**
     * Returns the column class for data-col, based on configured columns
     * @return {?}
     */
    Field.prototype.getColumns = /**
     * Returns the column class for data-col, based on configured columns
     * @return {?}
     */
    function () {
        return (this.columns || 12) + '-sm';
    };
    return Field;
}());
export { Field };
if (false) {
    /**
     * Tells if the field is required in forms
     * @type {?}
     */
    Field.prototype.required;
    /**
     * The name of the field's property
     * @type {?}
     */
    Field.prototype.property;
    /**
     * If true, the field will not be visible anywhere
     * @type {?}
     */
    Field.prototype.hidden;
    /**
     * The field's type
     * @type {?}
     */
    Field.prototype.type;
    /**
     * The field's view
     * @type {?}
     */
    Field.prototype.view;
    /**
     * Custom Validation function
     * @type {?}
     */
    Field.prototype.validate;
    /**
     * Custom Component to display form input *
     * @type {?}
     */
    Field.prototype.input;
    /**
     * Custom Component to display value *
     * @type {?}
     */
    Field.prototype.output;
    /**
     * Placeholder in inputs
     * @type {?}
     */
    Field.prototype.placeholder;
    /**
     * Label for Inputs. Defaults to property name. If false, the label is empty.
     * @type {?}
     */
    Field.prototype.label;
    /**
     * The operator to use for filtering: exact, search, any etc.. see ec.sdk doc
     * @type {?}
     */
    Field.prototype.filterOperator;
    /**
     * Defines the class for the filter pop, e.g. in list header.
     * @type {?}
     */
    Field.prototype.filterPopClass;
    /**
     * Wether or not the field should appear in default forms
     * @type {?}
     */
    Field.prototype.form;
    /**
     * Possible Values e.g. in a select
     * @type {?}
     */
    Field.prototype.values;
    /**
     * Class string
     * @type {?}
     */
    Field.prototype.class;
    /**
     * id for form labels
     * @type {?}
     */
    Field.prototype.id;
    /**
     * if false, the field will not be sortable in a list
     * @type {?}
     */
    Field.prototype.sortable;
    /**
     * if false, the field will not be filterable in a list
     * @type {?}
     */
    Field.prototype.filterable;
    /**
     * Defines the maximum of visible item (for tags view or similar). Defaults to 10
     * @type {?}
     */
    Field.prototype.maxItems;
    /**
     * Icon name that should be associated with the field
     * @type {?}
     */
    Field.prototype.icon;
    /* Skipping unhandled member: [key: string]: any;*/
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmllbGQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZWMuY29tcG9uZW50cy9jb3JlLyIsInNvdXJjZXMiOlsibGliL2ZpZWxkL2ZpZWxkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBSUE7SUE0Q0UscUZBQXFGO0lBQ3JGLGVBQVksUUFBZ0IsRUFBRSxNQUEyQjs7OztRQWpCekQsV0FBTSxHQUFVLEVBQUUsQ0FBQzs7OztRQUVuQixVQUFLLEdBQUcsRUFBRSxDQUFDO1FBZ0JULElBQUksTUFBTSxFQUFFO1lBQ1YsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7U0FDN0I7UUFDRCxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFDO1FBQzVDLElBQUksQ0FBQyxFQUFFLEdBQU0sSUFBSSxDQUFDLFFBQVEsU0FBSSxJQUFJLENBQUMsR0FBRyxFQUFJLENBQUM7SUFDN0MsQ0FBQztJQUVELGlDQUFpQzs7Ozs7SUFDakMsOEJBQWM7Ozs7SUFBZDtRQUNFLE9BQU8sSUFBSSxDQUFDLFdBQVcsSUFBSSxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDekQsQ0FBQztJQUNELHlFQUF5RTs7Ozs7SUFDekUsMEJBQVU7Ozs7SUFBVjtRQUNFLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxJQUFJLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQztJQUN0QyxDQUFDO0lBQ0gsWUFBQztBQUFELENBQUMsQUE3REQsSUE2REM7Ozs7Ozs7SUEzREMseUJBQW1COzs7OztJQUVuQix5QkFBa0I7Ozs7O0lBRWxCLHVCQUFpQjs7Ozs7SUFFakIscUJBQWM7Ozs7O0lBRWQscUJBQWM7Ozs7O0lBRWQseUJBQWlDOzs7OztJQUVqQyxzQkFBWTs7Ozs7SUFFWix1QkFBYTs7Ozs7SUFFYiw0QkFBcUI7Ozs7O0lBRXJCLHNCQUF5Qjs7Ozs7SUFFekIsK0JBQXdCOzs7OztJQUV4QiwrQkFBd0I7Ozs7O0lBRXhCLHFCQUFlOzs7OztJQUVmLHVCQUFtQjs7Ozs7SUFFbkIsc0JBQVc7Ozs7O0lBRVgsbUJBQVc7Ozs7O0lBRVgseUJBQW1COzs7OztJQUVuQiwyQkFBcUI7Ozs7O0lBRXJCLHlCQUFrQjs7Ozs7SUFFbEIscUJBQWMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiogQSBGaWVsZCBhY3RzIGFzIGEgcHJvcGVydHkgb2YgYW4gSXRlbS4gSXQgaG9sZHMgYSBzaW5nbGUgUHJvcGVydHkgY29uZmlnLiAqL1xuXG5pbXBvcnQgeyBGaWVsZENvbmZpZ1Byb3BlcnR5IH0gZnJvbSAnLi4vY29uZmlnL2ZpZWxkLWNvbmZpZy1wcm9wZXJ0eS5pbnRlcmZhY2UnO1xuXG5leHBvcnQgY2xhc3MgRmllbGQgaW1wbGVtZW50cyBGaWVsZENvbmZpZ1Byb3BlcnR5IHtcbiAgLyoqIFRlbGxzIGlmIHRoZSBmaWVsZCBpcyByZXF1aXJlZCBpbiBmb3JtcyAqL1xuICByZXF1aXJlZD86IGJvb2xlYW47XG4gIC8qKiBUaGUgbmFtZSBvZiB0aGUgZmllbGQncyBwcm9wZXJ0eSAqL1xuICBwcm9wZXJ0eT86IHN0cmluZztcbiAgLyoqIElmIHRydWUsIHRoZSBmaWVsZCB3aWxsIG5vdCBiZSB2aXNpYmxlIGFueXdoZXJlICovXG4gIGhpZGRlbj86IGJvb2xlYW47XG4gIC8qKiBUaGUgZmllbGQncyB0eXBlICovXG4gIHR5cGU/OiBzdHJpbmc7XG4gIC8qKiBUaGUgZmllbGQncyB2aWV3ICovXG4gIHZpZXc/OiBzdHJpbmc7XG4gIC8qKiBDdXN0b20gVmFsaWRhdGlvbiBmdW5jdGlvbiAqL1xuICB2YWxpZGF0ZT86ICh2YWx1ZSwgZmllbGQpID0+IGFueTtcbiAgLyoqIEN1c3RvbSBDb21wb25lbnQgdG8gZGlzcGxheSBmb3JtIGlucHV0ICoqL1xuICBpbnB1dD86IGFueTtcbiAgLyoqIEN1c3RvbSBDb21wb25lbnQgdG8gZGlzcGxheSB2YWx1ZSAqKi9cbiAgb3V0cHV0PzogYW55O1xuICAvKiogUGxhY2Vob2xkZXIgaW4gaW5wdXRzICovXG4gIHBsYWNlaG9sZGVyPzogc3RyaW5nO1xuICAvKiogTGFiZWwgZm9yIElucHV0cy4gRGVmYXVsdHMgdG8gcHJvcGVydHkgbmFtZS4gSWYgZmFsc2UsIHRoZSBsYWJlbCBpcyBlbXB0eS4gKi9cbiAgbGFiZWw/OiBzdHJpbmcgfCBib29sZWFuO1xuICAvKiogVGhlIG9wZXJhdG9yIHRvIHVzZSBmb3IgZmlsdGVyaW5nOiBleGFjdCwgc2VhcmNoLCBhbnkgZXRjLi4gc2VlIGVjLnNkayBkb2MgKi9cbiAgZmlsdGVyT3BlcmF0b3I/OiBzdHJpbmc7XG4gIC8qKiBEZWZpbmVzIHRoZSBjbGFzcyBmb3IgdGhlIGZpbHRlciBwb3AsIGUuZy4gaW4gbGlzdCBoZWFkZXIuICovXG4gIGZpbHRlclBvcENsYXNzPzogc3RyaW5nO1xuICAvKiogV2V0aGVyIG9yIG5vdCB0aGUgZmllbGQgc2hvdWxkIGFwcGVhciBpbiBkZWZhdWx0IGZvcm1zICovXG4gIGZvcm0/OiBib29sZWFuO1xuICAvKiogUG9zc2libGUgVmFsdWVzIGUuZy4gaW4gYSBzZWxlY3QgKi9cbiAgdmFsdWVzOiBhbnlbXSA9IFtdO1xuICAvKiogQ2xhc3Mgc3RyaW5nICovXG4gIGNsYXNzID0gJyc7XG4gIC8qKiBpZCBmb3IgZm9ybSBsYWJlbHMgKi9cbiAgaWQ6IHN0cmluZztcbiAgLyoqIGlmIGZhbHNlLCB0aGUgZmllbGQgd2lsbCBub3QgYmUgc29ydGFibGUgaW4gYSBsaXN0ICovXG4gIHNvcnRhYmxlPzogYm9vbGVhbjtcbiAgLyoqIGlmIGZhbHNlLCB0aGUgZmllbGQgd2lsbCBub3QgYmUgZmlsdGVyYWJsZSBpbiBhIGxpc3QgKi9cbiAgZmlsdGVyYWJsZT86IGJvb2xlYW47XG4gIC8qKiBEZWZpbmVzIHRoZSBtYXhpbXVtIG9mIHZpc2libGUgaXRlbSAoZm9yIHRhZ3MgdmlldyBvciBzaW1pbGFyKS4gRGVmYXVsdHMgdG8gMTAgKi9cbiAgbWF4SXRlbXM/OiBudW1iZXI7XG4gIC8qKiBJY29uIG5hbWUgdGhhdCBzaG91bGQgYmUgYXNzb2NpYXRlZCB3aXRoIHRoZSBmaWVsZCAqL1xuICBpY29uPzogc3RyaW5nO1xuICAvKiogd2lsZGNhcmQgZm9yIGN1c3RvbSBjb25maWcgdmFsdWVzICovXG4gIFtrZXk6IHN0cmluZ106IGFueTtcblxuICAvKiogQSBGaWVsZCBpcyBjb25zdHJ1Y3RlZCBieSBhc3NpZ25pbmcgdGhlIGdpdmVuIGNvbmZpZyBhbmQgdGhlIHByb3BlcnR5IHRvIGl0c2VsZiovXG4gIGNvbnN0cnVjdG9yKHByb3BlcnR5OiBzdHJpbmcsIGNvbmZpZzogRmllbGRDb25maWdQcm9wZXJ0eSkge1xuICAgIGlmIChjb25maWcpIHtcbiAgICAgIE9iamVjdC5hc3NpZ24odGhpcywgY29uZmlnKTtcbiAgICB9XG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCB7IHByb3BlcnR5OiBwcm9wZXJ0eSB9KTtcbiAgICB0aGlzLmlkID0gYCR7dGhpcy5wcm9wZXJ0eX1fJHtEYXRlLm5vdygpfWA7XG4gIH1cblxuICAvKiogUmV0dXJucyBwbGFjZWhvbGRlciBpZiBhbnkgKi9cbiAgZ2V0UGxhY2Vob2xkZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMucGxhY2Vob2xkZXIgfHwgdGhpcy5sYWJlbCB8fCB0aGlzLnByb3BlcnR5O1xuICB9XG4gIC8qKiBSZXR1cm5zIHRoZSBjb2x1bW4gY2xhc3MgZm9yIGRhdGEtY29sLCBiYXNlZCBvbiBjb25maWd1cmVkIGNvbHVtbnMgKi9cbiAgZ2V0Q29sdW1ucygpIHtcbiAgICByZXR1cm4gKHRoaXMuY29sdW1ucyB8fCAxMikgKyAnLXNtJztcbiAgfVxufVxuIl19