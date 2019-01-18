/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** A Form is an extension of an Item. In advance to an Item it will create an Array of fields that is either extracted
 * from config.fields or directly from the item body. */
import { Field } from '../field/field';
import { Item } from '../item/item';
/**
 * The Form class is an Item with additional info about its properties (Fields).
 * @template T
 */
export class Form extends Item {
    /**
     * The constructor will populate the fields array.
     * If config.fields is set only the configured fields will be created.
     * If not, all properties of the given body will be used as fields.
     * @param {?} body
     * @param {?=} config
     */
    constructor(body, config) {
        super(body, config);
        this.fields = [];
        if (!this.config || !this.config.fields) {
            return;
        }
        Object.keys(this.config.fields)
            .forEach((property) => {
            this.fields.push(new Field(property, this.config.fields[property]));
        });
    }
    /**
     * creates and adds a single field to the form
     * @param {?} property
     * @param {?} config
     * @return {?}
     */
    createField(property, config) {
        if (!config) {
            return;
        }
        if (!property) {
            return;
        }
        if (this.config.fields[property]) {
            console.error('cannot create field "', property, '". Property name already taken.');
            return;
        }
        this.config.fields[property] = config;
        /** @type {?} */
        const field = new Field(property, this.config.fields[property]);
        this.fields = this.fields.concat([field]);
        return field;
    }
    /**
     * returns the field instance of the given property
     * @param {?} property
     * @return {?}
     */
    getField(property) {
        return this.fields.find((field) => field.property === property);
    }
    /**
     * Returns the original value of the property, if any.
     * @param {?} property
     * @return {?}
     */
    getValue(property) {
        if (!this.body && this.config.fields && this.config.fields[property]) {
            // If the prefill is not a primitive, return a clone to stay pristine
            if (Array.isArray(this.config.fields[property].prefill)) {
                return this.config.fields[property].prefill.slice(0);
            }
            else if (typeof this.config.fields[property].prefill === 'object') {
                return Object.assign({}, this.config.fields[property].prefill);
            }
            // if no body is present, the prefills are used
            return this.config.fields[property].prefill;
        }
        else {
            return this.resolve(property);
        }
    }
    /**
     * Returns true if the form is currently in edit mode (has a body set)
     * @return {?}
     */
    isEditing() {
        return !!this.getBody();
    }
    /**
     * Returns true if the form is currently in create mode (has not a body set)
     * @return {?}
     */
    isCreating() {
        return !this.isEditing();
    }
}
if (false) {
    /**
     * Array of fields. It will be populated automatically when the form is constructed.
     * @type {?}
     */
    Form.prototype.fields;
    /**
     * The configuration of the form. It is an extension of ItemConfig.
     * @type {?}
     */
    Form.prototype.config;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BlYy5jb21wb25lbnRzL2NvcmUvIiwic291cmNlcyI6WyJsaWIvZm9ybS9mb3JtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUlBLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN2QyxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sY0FBYyxDQUFDOzs7OztBQUlwQyxNQUFNLE9BQU8sSUFBUSxTQUFRLElBQU87Ozs7Ozs7O0lBU2xDLFlBQVksSUFBTyxFQUFFLE1BQXNCO1FBQ3pDLEtBQUssQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDcEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUM7UUFDakIsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRTtZQUN2QyxPQUFPO1NBQ1I7UUFDRCxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDO2FBQzVCLE9BQU8sQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUFFO1lBQ3BCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksS0FBSyxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdEUsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDOzs7Ozs7O0lBR0QsV0FBVyxDQUFDLFFBQWdCLEVBQUUsTUFBMkI7UUFDdkQsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNYLE9BQU87U0FDUjtRQUNELElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDYixPQUFPO1NBQ1I7UUFDRCxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQ2hDLE9BQU8sQ0FBQyxLQUFLLENBQUMsdUJBQXVCLEVBQUUsUUFBUSxFQUFFLGlDQUFpQyxDQUFDLENBQUM7WUFDcEYsT0FBTztTQUNSO1FBQ0QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsTUFBTSxDQUFDOztjQUNoQyxLQUFLLEdBQUcsSUFBSSxLQUFLLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQy9ELElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBQzFDLE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQzs7Ozs7O0lBR0QsUUFBUSxDQUFDLFFBQWdCO1FBQ3ZCLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxRQUFRLEtBQUssUUFBUSxDQUFDLENBQUM7SUFDbEUsQ0FBQzs7Ozs7O0lBR0QsUUFBUSxDQUFDLFFBQWdCO1FBQ3ZCLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQ3BFLHFFQUFxRTtZQUNyRSxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsT0FBTyxDQUFDLEVBQUU7Z0JBQ3ZELE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUN0RDtpQkFBTSxJQUFJLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsT0FBTyxLQUFLLFFBQVEsRUFBRTtnQkFDbkUsT0FBTyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQzthQUNoRTtZQUNELCtDQUErQztZQUMvQyxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQztTQUM3QzthQUFNO1lBQ0wsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQy9CO0lBQ0gsQ0FBQzs7Ozs7SUFHRCxTQUFTO1FBQ1AsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQzFCLENBQUM7Ozs7O0lBR0QsVUFBVTtRQUNSLE9BQU8sQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDM0IsQ0FBQztDQUNGOzs7Ozs7SUFuRUMsc0JBQXVCOzs7OztJQUV2QixzQkFBNkIiLCJzb3VyY2VzQ29udGVudCI6WyIvKiogQSBGb3JtIGlzIGFuIGV4dGVuc2lvbiBvZiBhbiBJdGVtLiBJbiBhZHZhbmNlIHRvIGFuIEl0ZW0gaXQgd2lsbCBjcmVhdGUgYW4gQXJyYXkgb2YgZmllbGRzIHRoYXQgaXMgZWl0aGVyIGV4dHJhY3RlZFxuICogZnJvbSBjb25maWcuZmllbGRzIG9yIGRpcmVjdGx5IGZyb20gdGhlIGl0ZW0gYm9keS4gKi9cblxuaW1wb3J0IHsgRmllbGRDb25maWdQcm9wZXJ0eSB9IGZyb20gJy4uL2NvbmZpZy9maWVsZC1jb25maWctcHJvcGVydHkuaW50ZXJmYWNlJztcbmltcG9ydCB7IEZpZWxkIH0gZnJvbSAnLi4vZmllbGQvZmllbGQnO1xuaW1wb3J0IHsgSXRlbSB9IGZyb20gJy4uL2l0ZW0vaXRlbSc7XG5pbXBvcnQgeyBGb3JtQ29uZmlnIH0gZnJvbSAnLi9mb3JtLWNvbmZpZy5pbnRlcmZhY2UnO1xuXG4vKiogVGhlIEZvcm0gY2xhc3MgaXMgYW4gSXRlbSB3aXRoIGFkZGl0aW9uYWwgaW5mbyBhYm91dCBpdHMgcHJvcGVydGllcyAoRmllbGRzKS4gKi9cbmV4cG9ydCBjbGFzcyBGb3JtPFQ+IGV4dGVuZHMgSXRlbTxUPiB7XG4gIC8qKiBBcnJheSBvZiBmaWVsZHMuIEl0IHdpbGwgYmUgcG9wdWxhdGVkIGF1dG9tYXRpY2FsbHkgd2hlbiB0aGUgZm9ybSBpcyBjb25zdHJ1Y3RlZC4gKi9cbiAgcHVibGljIGZpZWxkczogRmllbGRbXTtcbiAgLyoqIFRoZSBjb25maWd1cmF0aW9uIG9mIHRoZSBmb3JtLiBJdCBpcyBhbiBleHRlbnNpb24gb2YgSXRlbUNvbmZpZy4gKi9cbiAgcHVibGljIGNvbmZpZzogRm9ybUNvbmZpZzxUPjtcblxuICAvKiogVGhlIGNvbnN0cnVjdG9yIHdpbGwgcG9wdWxhdGUgdGhlIGZpZWxkcyBhcnJheS5cbiAgICogSWYgY29uZmlnLmZpZWxkcyBpcyBzZXQgb25seSB0aGUgY29uZmlndXJlZCBmaWVsZHMgd2lsbCBiZSBjcmVhdGVkLlxuICAgKiBJZiBub3QsIGFsbCBwcm9wZXJ0aWVzIG9mIHRoZSBnaXZlbiBib2R5IHdpbGwgYmUgdXNlZCBhcyBmaWVsZHMuICovXG4gIGNvbnN0cnVjdG9yKGJvZHk6IFQsIGNvbmZpZz86IEZvcm1Db25maWc8VD4pIHtcbiAgICBzdXBlcihib2R5LCBjb25maWcpO1xuICAgIHRoaXMuZmllbGRzID0gW107XG4gICAgaWYgKCF0aGlzLmNvbmZpZyB8fCAhdGhpcy5jb25maWcuZmllbGRzKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIE9iamVjdC5rZXlzKHRoaXMuY29uZmlnLmZpZWxkcylcbiAgICAgIC5mb3JFYWNoKChwcm9wZXJ0eSkgPT4ge1xuICAgICAgICB0aGlzLmZpZWxkcy5wdXNoKG5ldyBGaWVsZChwcm9wZXJ0eSwgdGhpcy5jb25maWcuZmllbGRzW3Byb3BlcnR5XSkpO1xuICAgICAgfSk7XG4gIH1cblxuICAvKiogY3JlYXRlcyBhbmQgYWRkcyBhIHNpbmdsZSBmaWVsZCB0byB0aGUgZm9ybSAqL1xuICBjcmVhdGVGaWVsZChwcm9wZXJ0eTogc3RyaW5nLCBjb25maWc6IEZpZWxkQ29uZmlnUHJvcGVydHkpOiBGaWVsZCB8IHVuZGVmaW5lZCB7XG4gICAgaWYgKCFjb25maWcpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKCFwcm9wZXJ0eSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAodGhpcy5jb25maWcuZmllbGRzW3Byb3BlcnR5XSkge1xuICAgICAgY29uc29sZS5lcnJvcignY2Fubm90IGNyZWF0ZSBmaWVsZCBcIicsIHByb3BlcnR5LCAnXCIuIFByb3BlcnR5IG5hbWUgYWxyZWFkeSB0YWtlbi4nKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5jb25maWcuZmllbGRzW3Byb3BlcnR5XSA9IGNvbmZpZztcbiAgICBjb25zdCBmaWVsZCA9IG5ldyBGaWVsZChwcm9wZXJ0eSwgdGhpcy5jb25maWcuZmllbGRzW3Byb3BlcnR5XSk7XG4gICAgdGhpcy5maWVsZHMgPSB0aGlzLmZpZWxkcy5jb25jYXQoW2ZpZWxkXSk7XG4gICAgcmV0dXJuIGZpZWxkO1xuICB9XG5cbiAgLyoqIHJldHVybnMgdGhlIGZpZWxkIGluc3RhbmNlIG9mIHRoZSBnaXZlbiBwcm9wZXJ0eSAqL1xuICBnZXRGaWVsZChwcm9wZXJ0eTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMuZmllbGRzLmZpbmQoKGZpZWxkKSA9PiBmaWVsZC5wcm9wZXJ0eSA9PT0gcHJvcGVydHkpO1xuICB9XG5cbiAgLyoqIFJldHVybnMgdGhlIG9yaWdpbmFsIHZhbHVlIG9mIHRoZSBwcm9wZXJ0eSwgaWYgYW55LiAqL1xuICBnZXRWYWx1ZShwcm9wZXJ0eTogc3RyaW5nKSB7XG4gICAgaWYgKCF0aGlzLmJvZHkgJiYgdGhpcy5jb25maWcuZmllbGRzICYmIHRoaXMuY29uZmlnLmZpZWxkc1twcm9wZXJ0eV0pIHtcbiAgICAgIC8vIElmIHRoZSBwcmVmaWxsIGlzIG5vdCBhIHByaW1pdGl2ZSwgcmV0dXJuIGEgY2xvbmUgdG8gc3RheSBwcmlzdGluZVxuICAgICAgaWYgKEFycmF5LmlzQXJyYXkodGhpcy5jb25maWcuZmllbGRzW3Byb3BlcnR5XS5wcmVmaWxsKSkge1xuICAgICAgICByZXR1cm4gdGhpcy5jb25maWcuZmllbGRzW3Byb3BlcnR5XS5wcmVmaWxsLnNsaWNlKDApO1xuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgdGhpcy5jb25maWcuZmllbGRzW3Byb3BlcnR5XS5wcmVmaWxsID09PSAnb2JqZWN0Jykge1xuICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5jb25maWcuZmllbGRzW3Byb3BlcnR5XS5wcmVmaWxsKTtcbiAgICAgIH1cbiAgICAgIC8vIGlmIG5vIGJvZHkgaXMgcHJlc2VudCwgdGhlIHByZWZpbGxzIGFyZSB1c2VkXG4gICAgICByZXR1cm4gdGhpcy5jb25maWcuZmllbGRzW3Byb3BlcnR5XS5wcmVmaWxsO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5yZXNvbHZlKHByb3BlcnR5KTtcbiAgICB9XG4gIH1cblxuICAvKiogUmV0dXJucyB0cnVlIGlmIHRoZSBmb3JtIGlzIGN1cnJlbnRseSBpbiBlZGl0IG1vZGUgKGhhcyBhIGJvZHkgc2V0KSAqL1xuICBpc0VkaXRpbmcoKSB7XG4gICAgcmV0dXJuICEhdGhpcy5nZXRCb2R5KCk7XG4gIH1cblxuICAvKiogUmV0dXJucyB0cnVlIGlmIHRoZSBmb3JtIGlzIGN1cnJlbnRseSBpbiBjcmVhdGUgbW9kZSAoaGFzIG5vdCBhIGJvZHkgc2V0KSAqL1xuICBpc0NyZWF0aW5nKCkge1xuICAgIHJldHVybiAhdGhpcy5pc0VkaXRpbmcoKTtcbiAgfVxufVxuIl19