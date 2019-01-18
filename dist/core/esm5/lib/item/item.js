/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
/**
 * An Item basically wraps an Object and provides a config with metadata and helper methods to access the object.
 * @template T
 */
var /**
 * An Item basically wraps an Object and provides a config with metadata and helper methods to access the object.
 * @template T
 */
Item = /** @class */ (function () {
    /** Each item is constructed with its body and an optional config. */
    function Item(body, config) {
        if (config === void 0) { config = {}; }
        this.body = body;
        this.config = config || this.generateConfig();
    }
    /** Generates a config from the body by setting view to the properties type. */
    /**
     * Generates a config from the body by setting view to the properties type.
     * @protected
     * @return {?}
     */
    Item.prototype.generateConfig = /**
     * Generates a config from the body by setting view to the properties type.
     * @protected
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var config = { fields: {} };
        if (this.body === undefined) {
            return config;
        }
        this.getProperties().forEach(function (property) {
            config.fields[property] = {
                view: typeof _this.body[property],
                type: typeof _this.body[property],
            };
            if (config.fields[property].view === 'object' && Array.isArray(_this.body[property])) {
                config.fields[property].view = 'array';
                config.fields[property].values = _this.body[property];
                // config.fields[property].solo = true;
            }
        });
        return config;
    };
    /** Returns the item's body */
    /**
     * Returns the item's body
     * @return {?}
     */
    Item.prototype.getBody = /**
     * Returns the item's body
     * @return {?}
     */
    function () {
        return this.body;
    };
    /** Returns true if the body is defined and not null*/
    /**
     * Returns true if the body is defined and not null
     * @return {?}
     */
    Item.prototype.hasBody = /**
     * Returns true if the body is defined and not null
     * @return {?}
     */
    function () {
        return this.body !== undefined && this.body !== null;
    };
    /** deletes the item body */
    /**
     * deletes the item body
     * @return {?}
     */
    Item.prototype.clear = /**
     * deletes the item body
     * @return {?}
     */
    function () {
        delete this.body;
    };
    /** Assigns the given config to the existing via Object.assign */
    /**
     * Assigns the given config to the existing via Object.assign
     * @param {?} config
     * @return {?}
     */
    Item.prototype.useConfig = /**
     * Assigns the given config to the existing via Object.assign
     * @param {?} config
     * @return {?}
     */
    function (config) {
        this.config = ((/** @type {?} */ (Object))).assign(this.config, config);
    };
    /** Returns the item's config */
    /**
     * Returns the item's config
     * @return {?}
     */
    Item.prototype.getConfig = /**
     * Returns the item's config
     * @return {?}
     */
    function () {
        return this.config;
    };
    /** Returns an Array of properties possessed by the body. */
    /**
     * Returns an Array of properties possessed by the body.
     * @return {?}
     */
    Item.prototype.getProperties = /**
     * Returns an Array of properties possessed by the body.
     * @return {?}
     */
    function () {
        if (!this.body || typeof this.body !== 'object') {
            if (typeof this.body !== 'object') {
                return [this.config && this.config.title ? this.config.title : 'body'];
            }
            return [];
        }
        return Object.keys(this.body);
    };
    /** Returns the value of the the Item's identifier property. */
    /**
     * Returns the value of the the Item's identifier property.
     * @return {?}
     */
    Item.prototype.id = /**
     * Returns the value of the the Item's identifier property.
     * @return {?}
     */
    function () {
        if (!this.config.identifier) {
            throw new Error('cannot get id of item without identifier!');
        }
        return this.resolve(this.config.identifier);
    };
    /** Returns either the whole body (if no property is given) or the value of the given property.
     * This method will traverse the body via the config.resolve function (if given). */
    /**
     * Returns either the whole body (if no property is given) or the value of the given property.
     * This method will traverse the body via the config.resolve function (if given).
     * @param {?=} property
     * @return {?}
     */
    Item.prototype.resolve = /**
     * Returns either the whole body (if no property is given) or the value of the given property.
     * This method will traverse the body via the config.resolve function (if given).
     * @param {?=} property
     * @return {?}
     */
    function (property) {
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
        var v = this.config.resolve(this.body);
        return v ? v[property] : null;
    };
    /** The main method for transformation functions like resolve, display and group.
     * If you dont set the third parameter, the current item value will be used.
     * The third parameter can be used to transform a value that is not yet possesed (e.g. to
     * serialize) */
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
    Item.prototype.transform = /**
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
    function (action, property, value, defaultValue) {
        if (value === void 0) { value = this.resolve(property); }
        if (defaultValue === void 0) { defaultValue = this.resolve(property); }
        if (!this.hasBody()) {
            return;
        }
        if (this.config.fields && this.config.fields[property] && this.config.fields[property][action]) {
            return this.config.fields[property][action](value, this.body, property);
        }
        return defaultValue;
    };
    /** Returns the output of the config.group transformation function with the given property value.
     * If no group function is set, it will just return the property value.*/
    /**
     * Returns the output of the config.group transformation function with the given property value.
     * If no group function is set, it will just return the property value.
     * @param {?} property
     * @return {?}
     */
    Item.prototype.group = /**
     * Returns the output of the config.group transformation function with the given property value.
     * If no group function is set, it will just return the property value.
     * @param {?} property
     * @return {?}
     */
    function (property) {
        return this.transform('group', property);
    };
    /** If no property given: Returns the output of the config.classes method or ''.
     * If property given: Returns the output of the config.fields[property].classes method or '' */
    /**
     * If no property given: Returns the output of the config.classes method or ''.
     * If property given: Returns the output of the config.fields[property].classes method or ''
     * @param {?=} property
     * @return {?}
     */
    Item.prototype.classes = /**
     * If no property given: Returns the output of the config.classes method or ''.
     * If property given: Returns the output of the config.fields[property].classes method or ''
     * @param {?=} property
     * @return {?}
     */
    function (property) {
        if (property) {
            return this.transform('classes', property, this.resolve(property), '') || '';
        }
        if (!this.config || !this.config.classes) {
            return '';
        }
        return this.config.classes(this);
    };
    /** Returns the output of the config.display transformation function with the given property value.
     * If no display function is set, it will just return the property value.*/
    /**
     * Returns the output of the config.display transformation function with the given property value.
     * If no display function is set, it will just return the property value.
     * @param {?=} property
     * @return {?}
     */
    Item.prototype.display = /**
     * Returns the output of the config.display transformation function with the given property value.
     * If no display function is set, it will just return the property value.
     * @param {?=} property
     * @return {?}
     */
    function (property) {
        if (!property) {
            return this.transform('display', this.config.label || this.getProperties()[0]); // Object.keys(this.resolve())[0]
        }
        return this.transform('display', property);
    };
    /** Transforms the given field's value for sorting */
    /**
     * Transforms the given field's value for sorting
     * @param {?} property
     * @return {?}
     */
    Item.prototype.sort = /**
     * Transforms the given field's value for sorting
     * @param {?} property
     * @return {?}
     */
    function (property) {
        return this.transform('sort', property);
    };
    /** Returns value with all readOnly properties removed */
    /**
     * Returns value with all readOnly properties removed
     * @param {?=} value
     * @return {?}
     */
    Item.prototype.pickWriteOnly = /**
     * Returns value with all readOnly properties removed
     * @param {?=} value
     * @return {?}
     */
    function (value) {
        var _this = this;
        if (value === void 0) { value = this.body; }
        return ((/** @type {?} */ (Object))).assign.apply(((/** @type {?} */ (Object))), tslib_1.__spread([{}], Object.keys(value)
            .map(function (property) {
            var _a;
            if (_this.config.fields[property].readOnly) {
                return;
            }
            return _a = {}, _a[property] = value[property], _a;
        }).filter(function (v) { return !!v; })));
    };
    /**
     * @param {?} property
     * @return {?}
     */
    Item.prototype.isImmutableProperty = /**
     * @param {?} property
     * @return {?}
     */
    function (property) {
        if (this.config && this.config.fields && this.config.fields[property] && typeof this.config.fields[property].immutable === 'function') {
            return this.config.fields[property].immutable(this);
        }
        return this.config.fields[property].immutable;
    };
    /**
     * @param {?=} value
     * @return {?}
     */
    Item.prototype.deleteImmutableProperties = /**
     * @param {?=} value
     * @return {?}
     */
    function (value) {
        var _this = this;
        if (value === void 0) { value = this.body; }
        Object.keys(this.config.fields).forEach(function (property) {
            if (value.hasOwnProperty(property) && _this.isImmutableProperty(property)) {
                delete value[property];
            }
        });
    };
    /** Transforms the given field's value for serialization when saving. */
    /**
     * Transforms the given field's value for serialization when saving.
     * @param {?} value
     * @param {?=} put
     * @return {?}
     */
    Item.prototype.serialize = /**
     * Transforms the given field's value for serialization when saving.
     * @param {?} value
     * @param {?=} put
     * @return {?}
     */
    function (value, put) {
        var _this = this;
        if (put === void 0) { put = false; }
        if (put) {
            value = this.pickWriteOnly(value);
        }
        this.deleteImmutableProperties(value);
        /** Run the remaining properties through serializers */
        Object.keys(value).map(function (property) {
            var _a;
            ((/** @type {?} */ (Object))).assign(value, (_a = {},
                _a[property] = _this.transform('serialize', property, value[property]) // TODO: fix
            ,
                _a));
        });
        return value;
        /** Run the remaining properties through serializers */
        /*return Object.keys(value).reduce((serialized, property) => {
          return Object.assign(serialized, {
            [property]: this.transform('serialize', property, value[property])
          });
        }, {});*/
    };
    /** Saves the given value. Run serializers before assigning the new value. */
    /**
     * Saves the given value. Run serializers before assigning the new value.
     * @param {?=} value
     * @return {?}
     */
    Item.prototype.save = /**
     * Saves the given value. Run serializers before assigning the new value.
     * @param {?=} value
     * @return {?}
     */
    function (value) {
        var _this = this;
        if (value === void 0) { value = this.body; }
        if (this.config.onSave) {
            return Promise.resolve(this.config.onSave(this, value))
                .then(function (_value) {
                _this.body = _value;
                return _this;
            });
        }
        this.body = ((/** @type {?} */ (Object))).assign(this.resolve() || {}, value);
        return Promise.resolve(this);
    };
    /** Action method that is meant to be called on a button click or similar.
     * Calls the config#action method with the item and the property name */
    /**
     * Action method that is meant to be called on a button click or similar.
     * Calls the config#action method with the item and the property name
     * @param {?} property
     * @param {?} e
     * @return {?}
     */
    Item.prototype.action = /**
     * Action method that is meant to be called on a button click or similar.
     * Calls the config#action method with the item and the property name
     * @param {?} property
     * @param {?} e
     * @return {?}
     */
    function (property, e) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        if (this.config.fields[property].action) {
            this.config.fields[property].action(this, property);
        }
    };
    return Item;
}());
/**
 * An Item basically wraps an Object and provides a config with metadata and helper methods to access the object.
 * @template T
 */
export { Item };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlbS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BlYy5jb21wb25lbnRzL2NvcmUvIiwic291cmNlcyI6WyJsaWIvaXRlbS9pdGVtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUdBOzs7OztJQU1FLHFFQUFxRTtJQUNyRSxjQUFZLElBQU8sRUFBRSxNQUEwQjtRQUExQix1QkFBQSxFQUFBLFdBQTBCO1FBQzdDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxJQUFJLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUNoRCxDQUFDO0lBRUQsK0VBQStFOzs7Ozs7SUFDckUsNkJBQWM7Ozs7O0lBQXhCO1FBQUEsaUJBaUJDOztZQWhCTyxNQUFNLEdBQUcsRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFO1FBQzdCLElBQUksSUFBSSxDQUFDLElBQUksS0FBSyxTQUFTLEVBQUU7WUFDM0IsT0FBTyxNQUFNLENBQUM7U0FDZjtRQUNELElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQyxPQUFPLENBQUMsVUFBQyxRQUFRO1lBQ3BDLE1BQU0sQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEdBQUc7Z0JBQ3hCLElBQUksRUFBRSxPQUFPLEtBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO2dCQUNoQyxJQUFJLEVBQUUsT0FBTyxLQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQzthQUNqQyxDQUFDO1lBQ0YsSUFBSSxNQUFNLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksS0FBSyxRQUFRLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUU7Z0JBQ25GLE1BQU0sQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQztnQkFDdkMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENB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ZnJvbSAnLi9pdGVtLWNvbmZpZy5pbnRlcmZhY2UnO1xuXG4vKiogQW4gSXRlbSBiYXNpY2FsbHkgd3JhcHMgYW4gT2JqZWN0IGFuZCBwcm92aWRlcyBhIGNvbmZpZyB3aXRoIG1ldGFkYXRhIGFuZCBoZWxwZXIgbWV0aG9kcyB0byBhY2Nlc3MgdGhlIG9iamVjdC4gKi9cbmV4cG9ydCBjbGFzcyBJdGVtPFQ+IHtcbiAgLyoqIFRoZSB2YWx1ZSBib2R5IG9mIHRoZSBpdGVtLiBUaGlzIGNhbiBiZSBlaXRoZXIgYSBwcmltaXRpdmUgdmFsdWUgb3IgYW4gT2JqZWN0LiAqL1xuICBwdWJsaWMgYm9keTogVDtcbiAgLyoqIFRoZSBjb25maWcgb2YgdGhlIGl0ZW0uICovXG4gIHB1YmxpYyBjb25maWc6IEl0ZW1Db25maWc8VD47XG5cbiAgLyoqIEVhY2ggaXRlbSBpcyBjb25zdHJ1Y3RlZCB3aXRoIGl0cyBib2R5IGFuZCBhbiBvcHRpb25hbCBjb25maWcuICovXG4gIGNvbnN0cnVjdG9yKGJvZHk6IFQsIGNvbmZpZzogSXRlbUNvbmZpZzxUPiA9IHt9KSB7XG4gICAgdGhpcy5ib2R5ID0gYm9keTtcbiAgICB0aGlzLmNvbmZpZyA9IGNvbmZpZyB8fCB0aGlzLmdlbmVyYXRlQ29uZmlnKCk7XG4gIH1cblxuICAvKiogR2VuZXJhdGVzIGEgY29uZmlnIGZyb20gdGhlIGJvZHkgYnkgc2V0dGluZyB2aWV3IHRvIHRoZSBwcm9wZXJ0aWVzIHR5cGUuICovXG4gIHByb3RlY3RlZCBnZW5lcmF0ZUNvbmZpZygpOiBJdGVtQ29uZmlnPFQ+IHtcbiAgICBjb25zdCBjb25maWcgPSB7IGZpZWxkczoge30gfTtcbiAgICBpZiAodGhpcy5ib2R5ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiBjb25maWc7XG4gICAgfVxuICAgIHRoaXMuZ2V0UHJvcGVydGllcygpLmZvckVhY2goKHByb3BlcnR5KSA9PiB7XG4gICAgICBjb25maWcuZmllbGRzW3Byb3BlcnR5XSA9IHtcbiAgICAgICAgdmlldzogdHlwZW9mIHRoaXMuYm9keVtwcm9wZXJ0eV0sXG4gICAgICAgIHR5cGU6IHR5cGVvZiB0aGlzLmJvZHlbcHJvcGVydHldLFxuICAgICAgfTtcbiAgICAgIGlmIChjb25maWcuZmllbGRzW3Byb3BlcnR5XS52aWV3ID09PSAnb2JqZWN0JyAmJiBBcnJheS5pc0FycmF5KHRoaXMuYm9keVtwcm9wZXJ0eV0pKSB7XG4gICAgICAgIGNvbmZpZy5maWVsZHNbcHJvcGVydHldLnZpZXcgPSAnYXJyYXknO1xuICAgICAgICBjb25maWcuZmllbGRzW3Byb3BlcnR5XS52YWx1ZXMgPSB0aGlzLmJvZHlbcHJvcGVydHldO1xuICAgICAgICAvLyBjb25maWcuZmllbGRzW3Byb3BlcnR5XS5zb2xvID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gY29uZmlnO1xuICB9XG5cbiAgLyoqIFJldHVybnMgdGhlIGl0ZW0ncyBib2R5ICovXG4gIGdldEJvZHkoKSB7XG4gICAgcmV0dXJuIHRoaXMuYm9keTtcbiAgfVxuXG4gIC8qKiBSZXR1cm5zIHRydWUgaWYgdGhlIGJvZHkgaXMgZGVmaW5lZCBhbmQgbm90IG51bGwqL1xuICBoYXNCb2R5KCkge1xuICAgIHJldHVybiB0aGlzLmJvZHkgIT09IHVuZGVmaW5lZCAmJiB0aGlzLmJvZHkgIT09IG51bGw7XG4gIH1cblxuICAvKiogZGVsZXRlcyB0aGUgaXRlbSBib2R5ICovXG4gIGNsZWFyKCkge1xuICAgIGRlbGV0ZSB0aGlzLmJvZHk7XG4gIH1cblxuICAvKiogQXNzaWducyB0aGUgZ2l2ZW4gY29uZmlnIHRvIHRoZSBleGlzdGluZyB2aWEgT2JqZWN0LmFzc2lnbiAqL1xuICB1c2VDb25maWcoY29uZmlnOiBJdGVtQ29uZmlnPFQ+KSB7XG4gICAgdGhpcy5jb25maWcgPSAoPGFueT5PYmplY3QpLmFzc2lnbih0aGlzLmNvbmZpZywgY29uZmlnKTtcbiAgfVxuXG4gIC8qKiBSZXR1cm5zIHRoZSBpdGVtJ3MgY29uZmlnICovXG4gIGdldENvbmZpZygpIHtcbiAgICByZXR1cm4gdGhpcy5jb25maWc7XG4gIH1cblxuICAvKiogUmV0dXJucyBhbiBBcnJheSBvZiBwcm9wZXJ0aWVzIHBvc3Nlc3NlZCBieSB0aGUgYm9keS4gKi9cbiAgZ2V0UHJvcGVydGllcygpOiBBcnJheTxzdHJpbmc+IHtcbiAgICBpZiAoIXRoaXMuYm9keSB8fCB0eXBlb2YgdGhpcy5ib2R5ICE9PSAnb2JqZWN0Jykge1xuICAgICAgaWYgKHR5cGVvZiB0aGlzLmJvZHkgIT09ICdvYmplY3QnKSB7XG4gICAgICAgIHJldHVybiBbdGhpcy5jb25maWcgJiYgdGhpcy5jb25maWcudGl0bGUgPyB0aGlzLmNvbmZpZy50aXRsZSA6ICdib2R5J107XG4gICAgICB9XG4gICAgICByZXR1cm4gW107XG4gICAgfVxuICAgIHJldHVybiBPYmplY3Qua2V5cyh0aGlzLmJvZHkpO1xuICB9XG5cbiAgLyoqIFJldHVybnMgdGhlIHZhbHVlIG9mIHRoZSB0aGUgSXRlbSdzIGlkZW50aWZpZXIgcHJvcGVydHkuICovXG4gIGlkKCk6IGFueSB7XG4gICAgaWYgKCF0aGlzLmNvbmZpZy5pZGVudGlmaWVyKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2Nhbm5vdCBnZXQgaWQgb2YgaXRlbSB3aXRob3V0IGlkZW50aWZpZXIhJyk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLnJlc29sdmUodGhpcy5jb25maWcuaWRlbnRpZmllcik7XG4gIH1cblxuICAvKiogUmV0dXJucyBlaXRoZXIgdGhlIHdob2xlIGJvZHkgKGlmIG5vIHByb3BlcnR5IGlzIGdpdmVuKSBvciB0aGUgdmFsdWUgb2YgdGhlIGdpdmVuIHByb3BlcnR5LlxuICAgKiBUaGlzIG1ldGhvZCB3aWxsIHRyYXZlcnNlIHRoZSBib2R5IHZpYSB0aGUgY29uZmlnLnJlc29sdmUgZnVuY3Rpb24gKGlmIGdpdmVuKS4gKi9cbiAgcmVzb2x2ZShwcm9wZXJ0eT86IHN0cmluZyk6IGFueSB7XG4gICAgaWYgKCF0aGlzLmhhc0JvZHkoKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIHRoaXMuYm9keSAhPT0gJ29iamVjdCcpIHtcbiAgICAgIHJldHVybiB0aGlzLmJvZHk7XG4gICAgfVxuICAgIGlmICghdGhpcy5jb25maWcpIHtcbiAgICAgIHJldHVybiBwcm9wZXJ0eSA/IHRoaXMuYm9keVtwcm9wZXJ0eV0gOiB0aGlzLmJvZHk7XG4gICAgfVxuICAgIGlmICghcHJvcGVydHkpIHtcbiAgICAgIGlmICh0aGlzLmNvbmZpZy5yZXNvbHZlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbmZpZy5yZXNvbHZlKHRoaXMuYm9keSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcy5ib2R5O1xuICAgIH1cbiAgICBpZiAodGhpcy5jb25maWcuZmllbGRzICYmIHRoaXMuY29uZmlnLmZpZWxkc1twcm9wZXJ0eV0gJiYgdGhpcy5jb25maWcuZmllbGRzW3Byb3BlcnR5XS5yZXNvbHZlKSB7XG4gICAgICByZXR1cm4gdGhpcy5jb25maWcuZmllbGRzW3Byb3BlcnR5XS5yZXNvbHZlKHRoaXMuYm9keSwgdGhpcywgcHJvcGVydHkpO1xuICAgIH1cbiAgICBpZiAoIXRoaXMuY29uZmlnLnJlc29sdmUpIHtcbiAgICAgIHJldHVybiB0aGlzLmJvZHlbcHJvcGVydHldO1xuICAgIH1cbiAgICBjb25zdCB2ID0gdGhpcy5jb25maWcucmVzb2x2ZSh0aGlzLmJvZHkpO1xuICAgIHJldHVybiB2ID8gdltwcm9wZXJ0eV0gOiBudWxsO1xuICB9XG5cbiAgLyoqIFRoZSBtYWluIG1ldGhvZCBmb3IgdHJhbnNmb3JtYXRpb24gZnVuY3Rpb25zIGxpa2UgcmVzb2x2ZSwgZGlzcGxheSBhbmQgZ3JvdXAuXG4gICAqIElmIHlvdSBkb250IHNldCB0aGUgdGhpcmQgcGFyYW1ldGVyLCB0aGUgY3VycmVudCBpdGVtIHZhbHVlIHdpbGwgYmUgdXNlZC5cbiAgICogVGhlIHRoaXJkIHBhcmFtZXRlciBjYW4gYmUgdXNlZCB0byB0cmFuc2Zvcm0gYSB2YWx1ZSB0aGF0IGlzIG5vdCB5ZXQgcG9zc2VzZWQgKGUuZy4gdG9cbiAgICogc2VyaWFsaXplKSAqL1xuICBwcml2YXRlIHRyYW5zZm9ybShhY3Rpb246IHN0cmluZywgcHJvcGVydHk6IHN0cmluZywgdmFsdWU6IGFueSA9IHRoaXMucmVzb2x2ZShwcm9wZXJ0eSksIGRlZmF1bHRWYWx1ZTogYW55ID0gdGhpcy5yZXNvbHZlKHByb3BlcnR5KSkge1xuICAgIGlmICghdGhpcy5oYXNCb2R5KCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHRoaXMuY29uZmlnLmZpZWxkcyAmJiB0aGlzLmNvbmZpZy5maWVsZHNbcHJvcGVydHldICYmIHRoaXMuY29uZmlnLmZpZWxkc1twcm9wZXJ0eV1bYWN0aW9uXSkge1xuICAgICAgcmV0dXJuIHRoaXMuY29uZmlnLmZpZWxkc1twcm9wZXJ0eV1bYWN0aW9uXSh2YWx1ZSwgdGhpcy5ib2R5LCBwcm9wZXJ0eSk7XG4gICAgfVxuICAgIHJldHVybiBkZWZhdWx0VmFsdWU7XG4gIH1cblxuICAvKiogUmV0dXJucyB0aGUgb3V0cHV0IG9mIHRoZSBjb25maWcuZ3JvdXAgdHJhbnNmb3JtYXRpb24gZnVuY3Rpb24gd2l0aCB0aGUgZ2l2ZW4gcHJvcGVydHkgdmFsdWUuXG4gICAqIElmIG5vIGdyb3VwIGZ1bmN0aW9uIGlzIHNldCwgaXQgd2lsbCBqdXN0IHJldHVybiB0aGUgcHJvcGVydHkgdmFsdWUuKi9cbiAgZ3JvdXAocHJvcGVydHk6IHN0cmluZyk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMudHJhbnNmb3JtKCdncm91cCcsIHByb3BlcnR5KTtcbiAgfVxuXG4gIC8qKiBJZiBubyBwcm9wZXJ0eSBnaXZlbjogUmV0dXJucyB0aGUgb3V0cHV0IG9mIHRoZSBjb25maWcuY2xhc3NlcyBtZXRob2Qgb3IgJycuXG4gICAqIElmIHByb3BlcnR5IGdpdmVuOiBSZXR1cm5zIHRoZSBvdXRwdXQgb2YgdGhlIGNvbmZpZy5maWVsZHNbcHJvcGVydHldLmNsYXNzZXMgbWV0aG9kIG9yICcnICovXG4gIGNsYXNzZXMocHJvcGVydHk/OiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIGlmIChwcm9wZXJ0eSkge1xuICAgICAgcmV0dXJuIHRoaXMudHJhbnNmb3JtKCdjbGFzc2VzJywgcHJvcGVydHksIHRoaXMucmVzb2x2ZShwcm9wZXJ0eSksICcnKSB8fCAnJztcbiAgICB9XG4gICAgaWYgKCF0aGlzLmNvbmZpZyB8fCAhdGhpcy5jb25maWcuY2xhc3Nlcykge1xuICAgICAgcmV0dXJuICcnO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5jb25maWcuY2xhc3Nlcyh0aGlzKTtcbiAgfVxuXG4gIC8qKiBSZXR1cm5zIHRoZSBvdXRwdXQgb2YgdGhlIGNvbmZpZy5kaXNwbGF5IHRyYW5zZm9ybWF0aW9uIGZ1bmN0aW9uIHdpdGggdGhlIGdpdmVuIHByb3BlcnR5IHZhbHVlLlxuICAgKiBJZiBubyBkaXNwbGF5IGZ1bmN0aW9uIGlzIHNldCwgaXQgd2lsbCBqdXN0IHJldHVybiB0aGUgcHJvcGVydHkgdmFsdWUuKi9cbiAgZGlzcGxheShwcm9wZXJ0eT86IHN0cmluZyk6IGFueSB7XG4gICAgaWYgKCFwcm9wZXJ0eSkge1xuICAgICAgcmV0dXJuIHRoaXMudHJhbnNmb3JtKCdkaXNwbGF5JywgdGhpcy5jb25maWcubGFiZWwgfHwgdGhpcy5nZXRQcm9wZXJ0aWVzKClbMF0pOyAvLyBPYmplY3Qua2V5cyh0aGlzLnJlc29sdmUoKSlbMF1cbiAgICB9XG4gICAgcmV0dXJuIHRoaXMudHJhbnNmb3JtKCdkaXNwbGF5JywgcHJvcGVydHkpO1xuICB9XG5cbiAgLyoqIFRyYW5zZm9ybXMgdGhlIGdpdmVuIGZpZWxkJ3MgdmFsdWUgZm9yIHNvcnRpbmcgKi9cbiAgc29ydChwcm9wZXJ0eTogc3RyaW5nKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy50cmFuc2Zvcm0oJ3NvcnQnLCBwcm9wZXJ0eSk7XG4gIH1cblxuICAvKiogUmV0dXJucyB2YWx1ZSB3aXRoIGFsbCByZWFkT25seSBwcm9wZXJ0aWVzIHJlbW92ZWQgKi9cbiAgcGlja1dyaXRlT25seSh2YWx1ZSA9IHRoaXMuYm9keSkge1xuICAgIHJldHVybiAoPGFueT5PYmplY3QpLmFzc2lnbih7fSwgLi4uT2JqZWN0LmtleXModmFsdWUpXG4gICAgICAubWFwKHByb3BlcnR5ID0+IHtcbiAgICAgICAgaWYgKHRoaXMuY29uZmlnLmZpZWxkc1twcm9wZXJ0eV0ucmVhZE9ubHkpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHsgW3Byb3BlcnR5XTogdmFsdWVbcHJvcGVydHldIH07XG4gICAgICB9KS5maWx0ZXIodiA9PiAhIXYpKTtcblxuICB9XG5cbiAgaXNJbW11dGFibGVQcm9wZXJ0eShwcm9wZXJ0eTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgaWYgKHRoaXMuY29uZmlnICYmIHRoaXMuY29uZmlnLmZpZWxkcyAmJiB0aGlzLmNvbmZpZy5maWVsZHNbcHJvcGVydHldICYmIHR5cGVvZiB0aGlzLmNvbmZpZy5maWVsZHNbcHJvcGVydHldLmltbXV0YWJsZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgcmV0dXJuIHRoaXMuY29uZmlnLmZpZWxkc1twcm9wZXJ0eV0uaW1tdXRhYmxlKHRoaXMpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5jb25maWcuZmllbGRzW3Byb3BlcnR5XS5pbW11dGFibGU7XG4gIH1cblxuICBkZWxldGVJbW11dGFibGVQcm9wZXJ0aWVzKHZhbHVlOiBPYmplY3QgPSB0aGlzLmJvZHkpIHtcbiAgICBPYmplY3Qua2V5cyh0aGlzLmNvbmZpZy5maWVsZHMpLmZvckVhY2gocHJvcGVydHkgPT4ge1xuICAgICAgaWYgKHZhbHVlLmhhc093blByb3BlcnR5KHByb3BlcnR5KSAmJiB0aGlzLmlzSW1tdXRhYmxlUHJvcGVydHkocHJvcGVydHkpKSB7XG4gICAgICAgIGRlbGV0ZSB2YWx1ZVtwcm9wZXJ0eV07XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKiogVHJhbnNmb3JtcyB0aGUgZ2l2ZW4gZmllbGQncyB2YWx1ZSBmb3Igc2VyaWFsaXphdGlvbiB3aGVuIHNhdmluZy4gKi9cbiAgc2VyaWFsaXplKHZhbHVlLCBwdXQ6IGJvb2xlYW4gPSBmYWxzZSk6IGFueSB7XG4gICAgaWYgKHB1dCkge1xuICAgICAgdmFsdWUgPSB0aGlzLnBpY2tXcml0ZU9ubHkodmFsdWUpO1xuICAgIH1cbiAgICB0aGlzLmRlbGV0ZUltbXV0YWJsZVByb3BlcnRpZXModmFsdWUpO1xuICAgIC8qKiBSdW4gdGhlIHJlbWFpbmluZyBwcm9wZXJ0aWVzIHRocm91Z2ggc2VyaWFsaXplcnMgKi9cbiAgICBPYmplY3Qua2V5cyh2YWx1ZSkubWFwKChwcm9wZXJ0eSkgPT4ge1xuICAgICAgKDxhbnk+T2JqZWN0KS5hc3NpZ24odmFsdWUsIHtcbiAgICAgICAgW3Byb3BlcnR5XTogdGhpcy50cmFuc2Zvcm0oJ3NlcmlhbGl6ZScsIHByb3BlcnR5LCB2YWx1ZVtwcm9wZXJ0eV0pIC8vIFRPRE86IGZpeFxuICAgICAgfSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIHZhbHVlO1xuXG4gICAgLyoqIFJ1biB0aGUgcmVtYWluaW5nIHByb3BlcnRpZXMgdGhyb3VnaCBzZXJpYWxpemVycyAqL1xuICAgIC8qcmV0dXJuIE9iamVjdC5rZXlzKHZhbHVlKS5yZWR1Y2UoKHNlcmlhbGl6ZWQsIHByb3BlcnR5KSA9PiB7XG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbihzZXJpYWxpemVkLCB7XG4gICAgICAgIFtwcm9wZXJ0eV06IHRoaXMudHJhbnNmb3JtKCdzZXJpYWxpemUnLCBwcm9wZXJ0eSwgdmFsdWVbcHJvcGVydHldKVxuICAgICAgfSk7XG4gICAgfSwge30pOyovXG4gIH1cblxuICAvKiogU2F2ZXMgdGhlIGdpdmVuIHZhbHVlLiBSdW4gc2VyaWFsaXplcnMgYmVmb3JlIGFzc2lnbmluZyB0aGUgbmV3IHZhbHVlLiAqL1xuICBzYXZlKHZhbHVlOiBUID0gdGhpcy5ib2R5KTogUHJvbWlzZTxJdGVtPFQ+PiB7XG4gICAgaWYgKHRoaXMuY29uZmlnLm9uU2F2ZSkge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh0aGlzLmNvbmZpZy5vblNhdmUodGhpcywgdmFsdWUpKVxuICAgICAgICAudGhlbigoX3ZhbHVlOiBUKSA9PiB7XG4gICAgICAgICAgdGhpcy5ib2R5ID0gX3ZhbHVlO1xuICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgdGhpcy5ib2R5ID0gKDxhbnk+T2JqZWN0KS5hc3NpZ24odGhpcy5yZXNvbHZlKCkgfHwge30sIHZhbHVlKTtcbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHRoaXMpO1xuICB9XG4gIC8qKiBBY3Rpb24gbWV0aG9kIHRoYXQgaXMgbWVhbnQgdG8gYmUgY2FsbGVkIG9uIGEgYnV0dG9uIGNsaWNrIG9yIHNpbWlsYXIuXG4gICAqIENhbGxzIHRoZSBjb25maWcjYWN0aW9uIG1ldGhvZCB3aXRoIHRoZSBpdGVtIGFuZCB0aGUgcHJvcGVydHkgbmFtZSAqL1xuICBhY3Rpb24ocHJvcGVydHksIGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xuICAgIGlmICh0aGlzLmNvbmZpZy5maWVsZHNbcHJvcGVydHldLmFjdGlvbikge1xuICAgICAgdGhpcy5jb25maWcuZmllbGRzW3Byb3BlcnR5XS5hY3Rpb24odGhpcywgcHJvcGVydHkpO1xuICAgIH1cbiAgfVxufVxuIl19