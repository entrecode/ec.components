/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * An Item basically wraps an Object and provides a config with metadata and helper methods to access the object.
 * @template T
 */
export class Item {
    /**
     * Each item is constructed with its body and an optional config.
     * @param {?} body
     * @param {?=} config
     */
    constructor(body, config = {}) {
        this.body = body;
        this.config = config || this.generateConfig();
    }
    /**
     * Generates a config from the body by setting view to the properties type.
     * @protected
     * @return {?}
     */
    generateConfig() {
        /** @type {?} */
        const config = { fields: {} };
        if (this.body === undefined) {
            return config;
        }
        this.getProperties().forEach((property) => {
            config.fields[property] = {
                view: typeof this.body[property],
                type: typeof this.body[property],
            };
            if (config.fields[property].view === 'object' && Array.isArray(this.body[property])) {
                config.fields[property].view = 'array';
                config.fields[property].values = this.body[property];
                // config.fields[property].solo = true;
            }
        });
        return config;
    }
    /**
     * Returns the item's body
     * @return {?}
     */
    getBody() {
        return this.body;
    }
    /**
     * Returns true if the body is defined and not null
     * @return {?}
     */
    hasBody() {
        return this.body !== undefined && this.body !== null;
    }
    /**
     * deletes the item body
     * @return {?}
     */
    clear() {
        delete this.body;
    }
    /**
     * Assigns the given config to the existing via Object.assign
     * @param {?} config
     * @return {?}
     */
    useConfig(config) {
        this.config = ((/** @type {?} */ (Object))).assign(this.config, config);
    }
    /**
     * Returns the item's config
     * @return {?}
     */
    getConfig() {
        return this.config;
    }
    /**
     * Returns an Array of properties possessed by the body.
     * @return {?}
     */
    getProperties() {
        if (!this.body || typeof this.body !== 'object') {
            if (typeof this.body !== 'object') {
                return [this.config && this.config.title ? this.config.title : 'body'];
            }
            return [];
        }
        return Object.keys(this.body);
    }
    /**
     * Returns the value of the the Item's identifier property.
     * @return {?}
     */
    id() {
        if (!this.config.identifier) {
            throw new Error('cannot get id of item without identifier!');
        }
        return this.resolve(this.config.identifier);
    }
    /**
     * Returns either the whole body (if no property is given) or the value of the given property.
     * This method will traverse the body via the config.resolve function (if given).
     * @param {?=} property
     * @return {?}
     */
    resolve(property) {
        if (!this.hasBody()) {
            return;
        }
        if (typeof this.body !== 'object') {
            return this.body;
        }
        if (!this.config) {
            return property ? this.body[property] : this.body;
        }
        if (!property) {
            if (this.config.resolve) {
                return this.config.resolve(this.body);
            }
            return this.body;
        }
        if (this.config.fields && this.config.fields[property] && this.config.fields[property].resolve) {
            return this.config.fields[property].resolve(this.body, this, property);
        }
        if (!this.config.resolve) {
            return this.body[property];
        }
        /** @type {?} */
        const v = this.config.resolve(this.body);
        return v ? v[property] : null;
    }
    /**
     * The main method for transformation functions like resolve, display and group.
     * If you dont set the third parameter, the current item value will be used.
     * The third parameter can be used to transform a value that is not yet possesed (e.g. to
     * serialize)
     * @private
     * @param {?} action
     * @param {?} property
     * @param {?=} value
     * @param {?=} defaultValue
     * @return {?}
     */
    transform(action, property, value = this.resolve(property), defaultValue = this.resolve(property)) {
        if (!this.hasBody()) {
            return;
        }
        if (this.config.fields && this.config.fields[property] && this.config.fields[property][action]) {
            return this.config.fields[property][action](value, this.body, property);
        }
        return defaultValue;
    }
    /**
     * Returns the output of the config.group transformation function with the given property value.
     * If no group function is set, it will just return the property value.
     * @param {?} property
     * @return {?}
     */
    group(property) {
        return this.transform('group', property);
    }
    /**
     * If no property given: Returns the output of the config.classes method or ''.
     * If property given: Returns the output of the config.fields[property].classes method or ''
     * @param {?=} property
     * @return {?}
     */
    classes(property) {
        if (property) {
            return this.transform('classes', property, this.resolve(property), '') || '';
        }
        if (!this.config || !this.config.classes) {
            return '';
        }
        return this.config.classes(this);
    }
    /**
     * Returns the output of the config.display transformation function with the given property value.
     * If no display function is set, it will just return the property value.
     * @param {?=} property
     * @return {?}
     */
    display(property) {
        if (!property) {
            return this.transform('display', this.config.label || this.getProperties()[0]); // Object.keys(this.resolve())[0]
        }
        return this.transform('display', property);
    }
    /**
     * Transforms the given field's value for sorting
     * @param {?} property
     * @return {?}
     */
    sort(property) {
        return this.transform('sort', property);
    }
    /**
     * Returns value with all readOnly properties removed
     * @param {?=} value
     * @return {?}
     */
    pickWriteOnly(value = this.body) {
        return ((/** @type {?} */ (Object))).assign({}, ...Object.keys(value)
            .map(property => {
            if (this.config.fields[property].readOnly) {
                return;
            }
            return { [property]: value[property] };
        }).filter(v => !!v));
    }
    /**
     * @param {?} property
     * @return {?}
     */
    isImmutableProperty(property) {
        if (this.config && this.config.fields && this.config.fields[property] && typeof this.config.fields[property].immutable === 'function') {
            return this.config.fields[property].immutable(this);
        }
        return this.config.fields[property].immutable;
    }
    /**
     * @param {?=} value
     * @return {?}
     */
    deleteImmutableProperties(value = this.body) {
        Object.keys(this.config.fields).forEach(property => {
            if (value.hasOwnProperty(property) && this.isImmutableProperty(property)) {
                delete value[property];
            }
        });
    }
    /**
     * Transforms the given field's value for serialization when saving.
     * @param {?} value
     * @param {?=} put
     * @return {?}
     */
    serialize(value, put = false) {
        if (put) {
            value = this.pickWriteOnly(value);
        }
        this.deleteImmutableProperties(value);
        /** Run the remaining properties through serializers */
        Object.keys(value).map((property) => {
            ((/** @type {?} */ (Object))).assign(value, {
                [property]: this.transform('serialize', property, value[property]) // TODO: fix
            });
        });
        return value;
        /** Run the remaining properties through serializers */
        /*return Object.keys(value).reduce((serialized, property) => {
          return Object.assign(serialized, {
            [property]: this.transform('serialize', property, value[property])
          });
        }, {});*/
    }
    /**
     * Saves the given value. Run serializers before assigning the new value.
     * @param {?=} value
     * @return {?}
     */
    save(value = this.body) {
        if (this.config.onSave) {
            return Promise.resolve(this.config.onSave(this, value))
                .then((_value) => {
                this.body = _value;
                return this;
            });
        }
        this.body = ((/** @type {?} */ (Object))).assign(this.resolve() || {}, value);
        return Promise.resolve(this);
    }
    /**
     * Action method that is meant to be called on a button click or similar.
     * Calls the config#action method with the item and the property name
     * @param {?} property
     * @param {?} e
     * @return {?}
     */
    action(property, e) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        if (this.config.fields[property].action) {
            this.config.fields[property].action(this, property);
        }
    }
}
if (false) {
    /**
     * The value body of the item. This can be either a primitive value or an Object.
     * @type {?}
     */
    Item.prototype.body;
    /**
     * The config of the item.
     * @type {?}
     */
    Item.prototype.config;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlbS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BlYy5jb21wb25lbnRzL2NvcmUvIiwic291cmNlcyI6WyJsaWIvaXRlbS9pdGVtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBR0EsTUFBTSxPQUFPLElBQUk7Ozs7OztJQU9mLFlBQVksSUFBTyxFQUFFLFNBQXdCLEVBQUU7UUFDN0MsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDakIsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLElBQUksSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQ2hELENBQUM7Ozs7OztJQUdTLGNBQWM7O2NBQ2hCLE1BQU0sR0FBRyxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUU7UUFDN0IsSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLFNBQVMsRUFBRTtZQUMzQixPQUFPLE1BQU0sQ0FBQztTQUNmO1FBQ0QsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUFFO1lBQ3hDLE1BQU0sQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEdBQUc7Z0JBQ3hCLElBQUksRUFBRSxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO2dCQUNoQyxJQUFJLEVBQUUsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQzthQUNqQyxDQUFDO1lBQ0YsSUFBSSxNQUFNLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksS0FBSyxRQUFRLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUU7Z0JBQ25GLE1BQU0sQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQztnQkFDdkMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFR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QUM7UUFDN0IsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLEVBQUU7WUFDdkMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQztTQUNyRDtJQUNILENBQUM7Q0FDRjs7Ozs7O0lBM05DLG9CQUFlOzs7OztJQUVmLHNCQUE2QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEl0ZW1Db25maWcgfSBmcm9tICcuL2l0ZW0tY29uZmlnLmludGVyZmFjZSc7XG5cbi8qKiBBbiBJdGVtIGJhc2ljYWxseSB3cmFwcyBhbiBPYmplY3QgYW5kIHByb3ZpZGVzIGEgY29uZmlnIHdpdGggbWV0YWRhdGEgYW5kIGhlbHBlciBtZXRob2RzIHRvIGFjY2VzcyB0aGUgb2JqZWN0LiAqL1xuZXhwb3J0IGNsYXNzIEl0ZW08VD4ge1xuICAvKiogVGhlIHZhbHVlIGJvZHkgb2YgdGhlIGl0ZW0uIFRoaXMgY2FuIGJlIGVpdGhlciBhIHByaW1pdGl2ZSB2YWx1ZSBvciBhbiBPYmplY3QuICovXG4gIHB1YmxpYyBib2R5OiBUO1xuICAvKiogVGhlIGNvbmZpZyBvZiB0aGUgaXRlbS4gKi9cbiAgcHVibGljIGNvbmZpZzogSXRlbUNvbmZpZzxUPjtcblxuICAvKiogRWFjaCBpdGVtIGlzIGNvbnN0cnVjdGVkIHdpdGggaXRzIGJvZHkgYW5kIGFuIG9wdGlvbmFsIGNvbmZpZy4gKi9cbiAgY29uc3RydWN0b3IoYm9keTogVCwgY29uZmlnOiBJdGVtQ29uZmlnPFQ+ID0ge30pIHtcbiAgICB0aGlzLmJvZHkgPSBib2R5O1xuICAgIHRoaXMuY29uZmlnID0gY29uZmlnIHx8IHRoaXMuZ2VuZXJhdGVDb25maWcoKTtcbiAgfVxuXG4gIC8qKiBHZW5lcmF0ZXMgYSBjb25maWcgZnJvbSB0aGUgYm9keSBieSBzZXR0aW5nIHZpZXcgdG8gdGhlIHByb3BlcnRpZXMgdHlwZS4gKi9cbiAgcHJvdGVjdGVkIGdlbmVyYXRlQ29uZmlnKCk6IEl0ZW1Db25maWc8VD4ge1xuICAgIGNvbnN0IGNvbmZpZyA9IHsgZmllbGRzOiB7fSB9O1xuICAgIGlmICh0aGlzLmJvZHkgPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIGNvbmZpZztcbiAgICB9XG4gICAgdGhpcy5nZXRQcm9wZXJ0aWVzKCkuZm9yRWFjaCgocHJvcGVydHkpID0+IHtcbiAgICAgIGNvbmZpZy5maWVsZHNbcHJvcGVydHldID0ge1xuICAgICAgICB2aWV3OiB0eXBlb2YgdGhpcy5ib2R5W3Byb3BlcnR5XSxcbiAgICAgICAgdHlwZTogdHlwZW9mIHRoaXMuYm9keVtwcm9wZXJ0eV0sXG4gICAgICB9O1xuICAgICAgaWYgKGNvbmZpZy5maWVsZHNbcHJvcGVydHldLnZpZXcgPT09ICdvYmplY3QnICYmIEFycmF5LmlzQXJyYXkodGhpcy5ib2R5W3Byb3BlcnR5XSkpIHtcbiAgICAgICAgY29uZmlnLmZpZWxkc1twcm9wZXJ0eV0udmlldyA9ICdhcnJheSc7XG4gICAgICAgIGNvbmZpZy5maWVsZHNbcHJvcGVydHldLnZhbHVlcyA9IHRoaXMuYm9keVtwcm9wZXJ0eV07XG4gICAgICAgIC8vIGNvbmZpZy5maWVsZHNbcHJvcGVydHldLnNvbG8gPSB0cnVlO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBjb25maWc7XG4gIH1cblxuICAvKiogUmV0dXJucyB0aGUgaXRlbSdzIGJvZHkgKi9cbiAgZ2V0Qm9keSgpIHtcbiAgICByZXR1cm4gdGhpcy5ib2R5O1xuICB9XG5cbiAgLyoqIFJldHVybnMgdHJ1ZSBpZiB0aGUgYm9keSBpcyBkZWZpbmVkIGFuZCBub3QgbnVsbCovXG4gIGhhc0JvZHkoKSB7XG4gICAgcmV0dXJuIHRoaXMuYm9keSAhPT0gdW5kZWZpbmVkICYmIHRoaXMuYm9keSAhPT0gbnVsbDtcbiAgfVxuXG4gIC8qKiBkZWxldGVzIHRoZSBpdGVtIGJvZHkgKi9cbiAgY2xlYXIoKSB7XG4gICAgZGVsZXRlIHRoaXMuYm9keTtcbiAgfVxuXG4gIC8qKiBBc3NpZ25zIHRoZSBnaXZlbiBjb25maWcgdG8gdGhlIGV4aXN0aW5nIHZpYSBPYmplY3QuYXNzaWduICovXG4gIHVzZUNvbmZpZyhjb25maWc6IEl0ZW1Db25maWc8VD4pIHtcbiAgICB0aGlzLmNvbmZpZyA9ICg8YW55Pk9iamVjdCkuYXNzaWduKHRoaXMuY29uZmlnLCBjb25maWcpO1xuICB9XG5cbiAgLyoqIFJldHVybnMgdGhlIGl0ZW0ncyBjb25maWcgKi9cbiAgZ2V0Q29uZmlnKCkge1xuICAgIHJldHVybiB0aGlzLmNvbmZpZztcbiAgfVxuXG4gIC8qKiBSZXR1cm5zIGFuIEFycmF5IG9mIHByb3BlcnRpZXMgcG9zc2Vzc2VkIGJ5IHRoZSBib2R5LiAqL1xuICBnZXRQcm9wZXJ0aWVzKCk6IEFycmF5PHN0cmluZz4ge1xuICAgIGlmICghdGhpcy5ib2R5IHx8IHR5cGVvZiB0aGlzLmJvZHkgIT09ICdvYmplY3QnKSB7XG4gICAgICBpZiAodHlwZW9mIHRoaXMuYm9keSAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgcmV0dXJuIFt0aGlzLmNvbmZpZyAmJiB0aGlzLmNvbmZpZy50aXRsZSA/IHRoaXMuY29uZmlnLnRpdGxlIDogJ2JvZHknXTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBbXTtcbiAgICB9XG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKHRoaXMuYm9keSk7XG4gIH1cblxuICAvKiogUmV0dXJucyB0aGUgdmFsdWUgb2YgdGhlIHRoZSBJdGVtJ3MgaWRlbnRpZmllciBwcm9wZXJ0eS4gKi9cbiAgaWQoKTogYW55IHtcbiAgICBpZiAoIXRoaXMuY29uZmlnLmlkZW50aWZpZXIpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignY2Fubm90IGdldCBpZCBvZiBpdGVtIHdpdGhvdXQgaWRlbnRpZmllciEnKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMucmVzb2x2ZSh0aGlzLmNvbmZpZy5pZGVudGlmaWVyKTtcbiAgfVxuXG4gIC8qKiBSZXR1cm5zIGVpdGhlciB0aGUgd2hvbGUgYm9keSAoaWYgbm8gcHJvcGVydHkgaXMgZ2l2ZW4pIG9yIHRoZSB2YWx1ZSBvZiB0aGUgZ2l2ZW4gcHJvcGVydHkuXG4gICAqIFRoaXMgbWV0aG9kIHdpbGwgdHJhdmVyc2UgdGhlIGJvZHkgdmlhIHRoZSBjb25maWcucmVzb2x2ZSBmdW5jdGlvbiAoaWYgZ2l2ZW4pLiAqL1xuICByZXNvbHZlKHByb3BlcnR5Pzogc3RyaW5nKTogYW55IHtcbiAgICBpZiAoIXRoaXMuaGFzQm9keSgpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICh0eXBlb2YgdGhpcy5ib2R5ICE9PSAnb2JqZWN0Jykge1xuICAgICAgcmV0dXJuIHRoaXMuYm9keTtcbiAgICB9XG4gICAgaWYgKCF0aGlzLmNvbmZpZykge1xuICAgICAgcmV0dXJuIHByb3BlcnR5ID8gdGhpcy5ib2R5W3Byb3BlcnR5XSA6IHRoaXMuYm9keTtcbiAgICB9XG4gICAgaWYgKCFwcm9wZXJ0eSkge1xuICAgICAgaWYgKHRoaXMuY29uZmlnLnJlc29sdmUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29uZmlnLnJlc29sdmUodGhpcy5ib2R5KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzLmJvZHk7XG4gICAgfVxuICAgIGlmICh0aGlzLmNvbmZpZy5maWVsZHMgJiYgdGhpcy5jb25maWcuZmllbGRzW3Byb3BlcnR5XSAmJiB0aGlzLmNvbmZpZy5maWVsZHNbcHJvcGVydHldLnJlc29sdmUpIHtcbiAgICAgIHJldHVybiB0aGlzLmNvbmZpZy5maWVsZHNbcHJvcGVydHldLnJlc29sdmUodGhpcy5ib2R5LCB0aGlzLCBwcm9wZXJ0eSk7XG4gICAgfVxuICAgIGlmICghdGhpcy5jb25maWcucmVzb2x2ZSkge1xuICAgICAgcmV0dXJuIHRoaXMuYm9keVtwcm9wZXJ0eV07XG4gICAgfVxuICAgIGNvbnN0IHYgPSB0aGlzLmNvbmZpZy5yZXNvbHZlKHRoaXMuYm9keSk7XG4gICAgcmV0dXJuIHYgPyB2W3Byb3BlcnR5XSA6IG51bGw7XG4gIH1cblxuICAvKiogVGhlIG1haW4gbWV0aG9kIGZvciB0cmFuc2Zvcm1hdGlvbiBmdW5jdGlvbnMgbGlrZSByZXNvbHZlLCBkaXNwbGF5IGFuZCBncm91cC5cbiAgICogSWYgeW91IGRvbnQgc2V0IHRoZSB0aGlyZCBwYXJhbWV0ZXIsIHRoZSBjdXJyZW50IGl0ZW0gdmFsdWUgd2lsbCBiZSB1c2VkLlxuICAgKiBUaGUgdGhpcmQgcGFyYW1ldGVyIGNhbiBiZSB1c2VkIHRvIHRyYW5zZm9ybSBhIHZhbHVlIHRoYXQgaXMgbm90IHlldCBwb3NzZXNlZCAoZS5nLiB0b1xuICAgKiBzZXJpYWxpemUpICovXG4gIHByaXZhdGUgdHJhbnNmb3JtKGFjdGlvbjogc3RyaW5nLCBwcm9wZXJ0eTogc3RyaW5nLCB2YWx1ZTogYW55ID0gdGhpcy5yZXNvbHZlKHByb3BlcnR5KSwgZGVmYXVsdFZhbHVlOiBhbnkgPSB0aGlzLnJlc29sdmUocHJvcGVydHkpKSB7XG4gICAgaWYgKCF0aGlzLmhhc0JvZHkoKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAodGhpcy5jb25maWcuZmllbGRzICYmIHRoaXMuY29uZmlnLmZpZWxkc1twcm9wZXJ0eV0gJiYgdGhpcy5jb25maWcuZmllbGRzW3Byb3BlcnR5XVthY3Rpb25dKSB7XG4gICAgICByZXR1cm4gdGhpcy5jb25maWcuZmllbGRzW3Byb3BlcnR5XVthY3Rpb25dKHZhbHVlLCB0aGlzLmJvZHksIHByb3BlcnR5KTtcbiAgICB9XG4gICAgcmV0dXJuIGRlZmF1bHRWYWx1ZTtcbiAgfVxuXG4gIC8qKiBSZXR1cm5zIHRoZSBvdXRwdXQgb2YgdGhlIGNvbmZpZy5ncm91cCB0cmFuc2Zvcm1hdGlvbiBmdW5jdGlvbiB3aXRoIHRoZSBnaXZlbiBwcm9wZXJ0eSB2YWx1ZS5cbiAgICogSWYgbm8gZ3JvdXAgZnVuY3Rpb24gaXMgc2V0LCBpdCB3aWxsIGp1c3QgcmV0dXJuIHRoZSBwcm9wZXJ0eSB2YWx1ZS4qL1xuICBncm91cChwcm9wZXJ0eTogc3RyaW5nKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy50cmFuc2Zvcm0oJ2dyb3VwJywgcHJvcGVydHkpO1xuICB9XG5cbiAgLyoqIElmIG5vIHByb3BlcnR5IGdpdmVuOiBSZXR1cm5zIHRoZSBvdXRwdXQgb2YgdGhlIGNvbmZpZy5jbGFzc2VzIG1ldGhvZCBvciAnJy5cbiAgICogSWYgcHJvcGVydHkgZ2l2ZW46IFJldHVybnMgdGhlIG91dHB1dCBvZiB0aGUgY29uZmlnLmZpZWxkc1twcm9wZXJ0eV0uY2xhc3NlcyBtZXRob2Qgb3IgJycgKi9cbiAgY2xhc3Nlcyhwcm9wZXJ0eT86IHN0cmluZyk6IHN0cmluZyB7XG4gICAgaWYgKHByb3BlcnR5KSB7XG4gICAgICByZXR1cm4gdGhpcy50cmFuc2Zvcm0oJ2NsYXNzZXMnLCBwcm9wZXJ0eSwgdGhpcy5yZXNvbHZlKHByb3BlcnR5KSwgJycpIHx8ICcnO1xuICAgIH1cbiAgICBpZiAoIXRoaXMuY29uZmlnIHx8ICF0aGlzLmNvbmZpZy5jbGFzc2VzKSB7XG4gICAgICByZXR1cm4gJyc7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmNvbmZpZy5jbGFzc2VzKHRoaXMpO1xuICB9XG5cbiAgLyoqIFJldHVybnMgdGhlIG91dHB1dCBvZiB0aGUgY29uZmlnLmRpc3BsYXkgdHJhbnNmb3JtYXRpb24gZnVuY3Rpb24gd2l0aCB0aGUgZ2l2ZW4gcHJvcGVydHkgdmFsdWUuXG4gICAqIElmIG5vIGRpc3BsYXkgZnVuY3Rpb24gaXMgc2V0LCBpdCB3aWxsIGp1c3QgcmV0dXJuIHRoZSBwcm9wZXJ0eSB2YWx1ZS4qL1xuICBkaXNwbGF5KHByb3BlcnR5Pzogc3RyaW5nKTogYW55IHtcbiAgICBpZiAoIXByb3BlcnR5KSB7XG4gICAgICByZXR1cm4gdGhpcy50cmFuc2Zvcm0oJ2Rpc3BsYXknLCB0aGlzLmNvbmZpZy5sYWJlbCB8fCB0aGlzLmdldFByb3BlcnRpZXMoKVswXSk7IC8vIE9iamVjdC5rZXlzKHRoaXMucmVzb2x2ZSgpKVswXVxuICAgIH1cbiAgICByZXR1cm4gdGhpcy50cmFuc2Zvcm0oJ2Rpc3BsYXknLCBwcm9wZXJ0eSk7XG4gIH1cblxuICAvKiogVHJhbnNmb3JtcyB0aGUgZ2l2ZW4gZmllbGQncyB2YWx1ZSBmb3Igc29ydGluZyAqL1xuICBzb3J0KHByb3BlcnR5OiBzdHJpbmcpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLnRyYW5zZm9ybSgnc29ydCcsIHByb3BlcnR5KTtcbiAgfVxuXG4gIC8qKiBSZXR1cm5zIHZhbHVlIHdpdGggYWxsIHJlYWRPbmx5IHByb3BlcnRpZXMgcmVtb3ZlZCAqL1xuICBwaWNrV3JpdGVPbmx5KHZhbHVlID0gdGhpcy5ib2R5KSB7XG4gICAgcmV0dXJuICg8YW55Pk9iamVjdCkuYXNzaWduKHt9LCAuLi5PYmplY3Qua2V5cyh2YWx1ZSlcbiAgICAgIC5tYXAocHJvcGVydHkgPT4ge1xuICAgICAgICBpZiAodGhpcy5jb25maWcuZmllbGRzW3Byb3BlcnR5XS5yZWFkT25seSkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4geyBbcHJvcGVydHldOiB2YWx1ZVtwcm9wZXJ0eV0gfTtcbiAgICAgIH0pLmZpbHRlcih2ID0+ICEhdikpO1xuXG4gIH1cblxuICBpc0ltbXV0YWJsZVByb3BlcnR5KHByb3BlcnR5OiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICBpZiAodGhpcy5jb25maWcgJiYgdGhpcy5jb25maWcuZmllbGRzICYmIHRoaXMuY29uZmlnLmZpZWxkc1twcm9wZXJ0eV0gJiYgdHlwZW9mIHRoaXMuY29uZmlnLmZpZWxkc1twcm9wZXJ0eV0uaW1tdXRhYmxlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICByZXR1cm4gdGhpcy5jb25maWcuZmllbGRzW3Byb3BlcnR5XS5pbW11dGFibGUodGhpcyk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmNvbmZpZy5maWVsZHNbcHJvcGVydHldLmltbXV0YWJsZTtcbiAgfVxuXG4gIGRlbGV0ZUltbXV0YWJsZVByb3BlcnRpZXModmFsdWU6IE9iamVjdCA9IHRoaXMuYm9keSkge1xuICAgIE9iamVjdC5rZXlzKHRoaXMuY29uZmlnLmZpZWxkcykuZm9yRWFjaChwcm9wZXJ0eSA9PiB7XG4gICAgICBpZiAodmFsdWUuaGFzT3duUHJvcGVydHkocHJvcGVydHkpICYmIHRoaXMuaXNJbW11dGFibGVQcm9wZXJ0eShwcm9wZXJ0eSkpIHtcbiAgICAgICAgZGVsZXRlIHZhbHVlW3Byb3BlcnR5XTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKiBUcmFuc2Zvcm1zIHRoZSBnaXZlbiBmaWVsZCdzIHZhbHVlIGZvciBzZXJpYWxpemF0aW9uIHdoZW4gc2F2aW5nLiAqL1xuICBzZXJpYWxpemUodmFsdWUsIHB1dDogYm9vbGVhbiA9IGZhbHNlKTogYW55IHtcbiAgICBpZiAocHV0KSB7XG4gICAgICB2YWx1ZSA9IHRoaXMucGlja1dyaXRlT25seSh2YWx1ZSk7XG4gICAgfVxuICAgIHRoaXMuZGVsZXRlSW1tdXRhYmxlUHJvcGVydGllcyh2YWx1ZSk7XG4gICAgLyoqIFJ1biB0aGUgcmVtYWluaW5nIHByb3BlcnRpZXMgdGhyb3VnaCBzZXJpYWxpemVycyAqL1xuICAgIE9iamVjdC5rZXlzKHZhbHVlKS5tYXAoKHByb3BlcnR5KSA9PiB7XG4gICAgICAoPGFueT5PYmplY3QpLmFzc2lnbih2YWx1ZSwge1xuICAgICAgICBbcHJvcGVydHldOiB0aGlzLnRyYW5zZm9ybSgnc2VyaWFsaXplJywgcHJvcGVydHksIHZhbHVlW3Byb3BlcnR5XSkgLy8gVE9ETzogZml4XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICByZXR1cm4gdmFsdWU7XG5cbiAgICAvKiogUnVuIHRoZSByZW1haW5pbmcgcHJvcGVydGllcyB0aHJvdWdoIHNlcmlhbGl6ZXJzICovXG4gICAgLypyZXR1cm4gT2JqZWN0LmtleXModmFsdWUpLnJlZHVjZSgoc2VyaWFsaXplZCwgcHJvcGVydHkpID0+IHtcbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHNlcmlhbGl6ZWQsIHtcbiAgICAgICAgW3Byb3BlcnR5XTogdGhpcy50cmFuc2Zvcm0oJ3NlcmlhbGl6ZScsIHByb3BlcnR5LCB2YWx1ZVtwcm9wZXJ0eV0pXG4gICAgICB9KTtcbiAgICB9LCB7fSk7Ki9cbiAgfVxuXG4gIC8qKiBTYXZlcyB0aGUgZ2l2ZW4gdmFsdWUuIFJ1biBzZXJpYWxpemVycyBiZWZvcmUgYXNzaWduaW5nIHRoZSBuZXcgdmFsdWUuICovXG4gIHNhdmUodmFsdWU6IFQgPSB0aGlzLmJvZHkpOiBQcm9taXNlPEl0ZW08VD4+IHtcbiAgICBpZiAodGhpcy5jb25maWcub25TYXZlKSB7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHRoaXMuY29uZmlnLm9uU2F2ZSh0aGlzLCB2YWx1ZSkpXG4gICAgICAgIC50aGVuKChfdmFsdWU6IFQpID0+IHtcbiAgICAgICAgICB0aGlzLmJvZHkgPSBfdmFsdWU7XG4gICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICB0aGlzLmJvZHkgPSAoPGFueT5PYmplY3QpLmFzc2lnbih0aGlzLnJlc29sdmUoKSB8fCB7fSwgdmFsdWUpO1xuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodGhpcyk7XG4gIH1cbiAgLyoqIEFjdGlvbiBtZXRob2QgdGhhdCBpcyBtZWFudCB0byBiZSBjYWxsZWQgb24gYSBidXR0b24gY2xpY2sgb3Igc2ltaWxhci5cbiAgICogQ2FsbHMgdGhlIGNvbmZpZyNhY3Rpb24gbWV0aG9kIHdpdGggdGhlIGl0ZW0gYW5kIHRoZSBwcm9wZXJ0eSBuYW1lICovXG4gIGFjdGlvbihwcm9wZXJ0eSwgZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XG4gICAgaWYgKHRoaXMuY29uZmlnLmZpZWxkc1twcm9wZXJ0eV0uYWN0aW9uKSB7XG4gICAgICB0aGlzLmNvbmZpZy5maWVsZHNbcHJvcGVydHldLmFjdGlvbih0aGlzLCBwcm9wZXJ0eSk7XG4gICAgfVxuICB9XG59XG4iXX0=