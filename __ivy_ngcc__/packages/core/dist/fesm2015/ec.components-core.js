import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * A Collection is a more sophisticated Array. It is fundamental for other classes like List.
 * @template T
 */
class Collection {
    /**
     * Constructs the collection with the given item Array (optional).
     * \@example
     * ```typescript
     *  const numbers = new Collection([1, 2, 3]);
     * ```
     * @param {?=} items
     */
    constructor(items = []) {
        /**
         * Subject that is nexted when the items update
         */
        this.update = new Subject();
        /**
         * Subject that is nexted when the items change
         */
        this.update$ = this.update.asObservable();
        this.items = [];
        items.forEach((/**
         * @param {?} item
         * @return {?}
         */
        (item) => {
            this.items.push(item);
        }));
    }
    /**
     * Returns the index of the given item
     * @param {?} item
     * @return {?}
     */
    index(item) {
        return this.items.indexOf(item);
    }
    /**
     * Checks if the Collection contains the given item.
     * \@example
     * ```typescript
     * numbers.has(2); //true
     * ```
     * @param {?} item
     * @return {?}
     */
    has(item) {
        return this.index(item) !== -1;
    }
    /**
     * Checks if the Collection contains all given items.
     * \@example
     * ```typescript
     * numbers.has([1,2]); //true
     * ```
     * @param {?=} items
     * @return {?}
     */
    hasAll(items = []) {
        if (items === null) {
            // console.warn('has all fail', this, items);
            return false;
        }
        return items.reduce((/**
         * @param {?} has
         * @param {?} item
         * @return {?}
         */
        (has, item) => {
            return has && this.has(item);
        }), true);
    }
    /**
     * Adds the given item to the Collection. If the unique flag is set, the item will only be added
     * if it is not contained.
     * \@example
     * ```typescript
     * numbers.add(4);
     * ```
     * @param {?} item
     * @param {?=} unique
     * @param {?=} event
     * @return {?}
     */
    add(item, unique, event = true) {
        if (unique && this.has(item)) {
            return false;
        }
        this.items.push(item);
        if (event) {
            this.update.next(this);
        }
    }
    /**
     * Adds the given items to the Collection. If the unique flag is set, only items that are not
     * contained will be added.
     * \@example
     * ```typescript
     * numbers.addAll([5, 6, 7]);
     * ```
     * @param {?=} items
     * @param {?=} unique
     * @param {?=} event
     * @return {?}
     */
    addAll(items = [], unique = false, event = true) {
        /** @type {?} */
        const length = this.items.length;
        items.forEach((/**
         * @param {?} item
         * @return {?}
         */
        (item) => {
            this.add(item, unique, false);
        }));
        if (this.items.length > length && event) {
            this.update.next(this);
        }
    }
    /**
     * Removes the given item from the Collection.
     * \@example
     * ```typescript
     * numbers.remove(4);
     * ```
     * @param {?} item
     * @param {?=} event
     * @return {?}
     */
    remove(item, event = true) {
        if (!this.has(item)) {
            return false;
        }
        this.items.splice(this.index(item), 1);
        if (event) {
            this.update.next(this);
        }
    }
    /**
     * Removes all items from the Collection.
     * \@example
     * ```typescript
     * numbers.removeAll();
     * ```
     * @param {?=} items
     * @param {?=} event
     * @return {?}
     */
    removeAll(items, event = true) {
        /** @type {?} */
        const length = this.items.length;
        if (items) {
            items.forEach((/**
             * @param {?} item
             * @return {?}
             */
            (item) => {
                this.remove(item, false);
            }));
        }
        else {
            this.items.length = 0;
        }
        if (this.items.length < length && event) {
            this.update.next(this);
        }
    }
    /**
     * Toggles the item in and out of collection
     * @param {?} item
     * @param {?=} event
     * @return {?}
     */
    toggle(item, event = true) {
        if (this.has(item)) {
            this.remove(item, event);
        }
        else {
            this.add(item, event);
        }
    }
    /**
     * Replaces all current items with the given items.
     * @param {?} items
     * @param {?=} event
     * @return {?}
     */
    replaceWith(items, event = true) {
        if (this.items && this.items.length) {
            this.removeAll(undefined, false);
        }
        if (items.length) {
            this.addAll(items, false, false);
        }
        if (event) {
            this.update.next(this);
        }
    }
    /**
     * Returns true if the collection is empty
     * @return {?}
     */
    isEmpty() {
        return this.items.length === 0;
    }
    /**
     * Moves the given item to the given array index.
     * @param {?} item
     * @param {?} index
     * @param {?=} event
     * @return {?}
     */
    move(item, index, event = true) {
        if (!this.has(item) || this.items.indexOf(item) === index) {
            return;
        }
        this.items.splice(index, 0, this.items.splice(this.items.indexOf(item), 1)[0]);
        if (event) {
            this.update.next(this);
        }
    }
}
if (false) {
    /**
     * The items must all have the same type T.
     * @type {?}
     */
    Collection.prototype.items;
    /**
     * Subject that is nexted when the items update
     * @type {?}
     * @protected
     */
    Collection.prototype.update;
    /**
     * Subject that is nexted when the items change
     * @type {?}
     */
    Collection.prototype.update$;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** A Field acts as a property of an Item. It holds a single Property config. */
class Field {
    /**
     * A Field is constructed by assigning the given config and the property to itself
     * @param {?} property
     * @param {?} config
     */
    constructor(property, config) {
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
        this.id = `${this.property}_${Date.now()}`;
    }
    /**
     * Returns placeholder if any
     * @return {?}
     */
    getPlaceholder() {
        return this.placeholder || this.label || this.property;
    }
    /**
     * Returns the fields label
     * @return {?}
     */
    getLabel() {
        if (this.label === false) {
            return '';
        }
        return this.label || this.property;
    }
    /**
     * Returns the view for the given occasion
     * @param {?=} occasion
     * @return {?}
     */
    getView(occasion) {
        return this[occasion + 'View'] || this.view;
    }
    /**
     * Returns the component for the given occasion
     * @param {?=} occasion
     * @return {?}
     */
    getComponent(occasion) {
        return this[occasion + 'Component'];
    }
}
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
     * If true, the field will autofocus after view init
     * @type {?}
     */
    Field.prototype.autofocus;
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
     * Custom clean function to prepare for save
     * @type {?}
     */
    Field.prototype.beforeSave;
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
     * Defines the class for the filter pop, e.g. in list header. DEPRECATED
     * @type {?}
     */
    Field.prototype.filterPopClass;
    /**
     * If true, the form input label will always be hidden
     * @type {?}
     */
    Field.prototype.hideFormLabel;
    /**
     * If true, the form input label will be hidden if no value is set
     * @type {?}
     */
    Field.prototype.hideFormLabelIfEmpty;
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * The Root class for all Configurations.
 * @abstract
 */
class Config {
    constructor() {
        // TODO use Map !!!! (like simi did in EventEmitter.ts)
        /**
         * The config object.
         */
        this.config = {};
    }
    /**
     * This method is a getter and setter for configurations. The key stands for the config (e.g. model).
     * The property is a sub property if the config (e.g. fields => model.fields).
     * If no config is given, the method just returns the configuration for the given property.
     * If a config is given, the property config is merged via Object.assign.
     * @param {?} key
     * @param {?} property
     * @param {?=} config
     * @return {?}
     */
    configure(key, property, config) {
        if (!this.config[key]) {
            this.config[key] = {};
        }
        if (!config) {
            return this.config[key][property];
        }
        if (!this.config[key][property]) {
            this.config[key][property] = {};
        }
        Object.assign(this.config[key][property], config);
        return this;
    }
}
if (false) {
    /**
     * The config object.
     * @type {?}
     * @private
     */
    Config.prototype.config;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Configuration for list fields.
 * @record
 */
function FieldConfig() { }

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Configuration for a FieldConfig property.
 * @record
 */
function FieldConfigProperty() { }
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
     * Custom copy transformation function.
     * \@param value The current property value
     * \@param field The field property name
     * @type {?|undefined}
     */
    FieldConfigProperty.prototype.copy;
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
     * If true, the form input will be disabled when editing
     * @type {?|undefined}
     */
    FieldConfigProperty.prototype.readOnly;
    /**
     * If true, the property will always be disabled (like readOnly but also on create)
     * @type {?|undefined}
     */
    FieldConfigProperty.prototype.disabled;
    /**
     * If true, the property will be ignored when saving (filtered out from object of emitted object)
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
     * Defines the class for the filter pop, e.g. in list header. DEPRECATED
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
    /**
     * if true, the field will auto focus after view init
     * @type {?|undefined}
     */
    FieldConfigProperty.prototype.autofocus;
    /* Skipping unhandled member: [key: string]: any;*/
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * An Item basically wraps an Object and provides a config with metadata and helper methods to access the object.
 * @template T
 */
class Item {
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
        this.getProperties().forEach((/**
         * @param {?} property
         * @return {?}
         */
        (property) => {
            config.fields[property] = {
                view: typeof this.body[property],
                type: typeof this.body[property],
            };
            if (config.fields[property].view === 'object' && Array.isArray(this.body[property])) {
                config.fields[property].view = 'array';
                config.fields[property].values = this.body[property];
                // config.fields[property].solo = true;
            }
        }));
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
                return this.config.resolve(this.body, this);
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
        const v = this.config.resolve(this.body, this);
        return v ? v[property] : null;
    }
    /**
     * Resolves the given path on the item object. e.g. "value.config.usePassword" will resolve that object path, if existing.
     * @param {?} path
     * @return {?}
     */
    resolvePath(path) {
        return getPath(this.body, path);
    }
    /**
     * The main method for transformation functions like resolve, display and group.
     * If you dont set the third parameter, the current item value will be used.
     * The third parameter can be used to transform a value that is not yet possesed (e.g. to
     * serialize)
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
            .map((/**
         * @param {?} property
         * @return {?}
         */
        (property) => {
            if (this.config.fields[property].readOnly) {
                return;
            }
            return { [property]: value[property] };
        }))
            .filter((/**
         * @param {?} v
         * @return {?}
         */
        (v) => !!v)));
    }
    /**
     * @param {?} property
     * @return {?}
     */
    isImmutableProperty(property) {
        if (this.config &&
            this.config.fields &&
            this.config.fields[property] &&
            typeof this.config.fields[property].immutable === 'function') {
            return this.config.fields[property].immutable(this);
        }
        return this.config.fields[property].immutable;
    }
    /**
     * @param {?=} value
     * @return {?}
     */
    deleteImmutableProperties(value = this.body) {
        Object.keys(this.config.fields).forEach((/**
         * @param {?} property
         * @return {?}
         */
        (property) => {
            if (value.hasOwnProperty(property) && this.isImmutableProperty(property)) {
                delete value[property];
            }
        }));
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
        Object.keys(value).map((/**
         * @param {?} property
         * @return {?}
         */
        (property) => {
            ((/** @type {?} */ (Object))).assign(value, {
                [property]: this.transform('serialize', property, value[property]),
            });
        }));
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
            return new Promise((/**
             * @param {?} resolve
             * @param {?} reject
             * @return {?}
             */
            (resolve, reject) => {
                try {
                    Promise.resolve(this.config.onSave(this, value)).then((/**
                     * @param {?} _value
                     * @return {?}
                     */
                    (_value) => {
                        this.body = _value;
                        resolve(this);
                    })).catch((/**
                     * @param {?} error
                     * @return {?}
                     */
                    error => reject(error)));
                }
                catch (error) {
                    reject(error);
                }
            }));
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
/**
 * @param {?} o
 * @param {?} path
 * @return {?}
 */
function getPath(o, path) {
    /** @type {?} */
    const p = path.split('.');
    return p.length === 1 ? (o || {})[p[0]] : getPath((o || {})[p[0]], p.slice(1).join('.'));
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * The Form class is an Item with additional info about its properties (Fields).
 * @template T
 */
class Form extends Item {
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
        Object.keys(this.config.fields).forEach((/**
         * @param {?} property
         * @return {?}
         */
        (property) => {
            this.fields.push(new Field(property, this.config.fields[property]));
        }));
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
        return this.fields.find((/**
         * @param {?} field
         * @return {?}
         */
        (field) => field.property === property));
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * FormConfig is an extension of ItemConfig.
 * @record
 * @template T
 */
function FormConfig() { }
if (false) {
    /**
     * If true, no submit button will be rendered.
     * @type {?|undefined}
     */
    FormConfig.prototype.hideSubmitButton;
    /**
     * The label of the submit button
     * @type {?|undefined}
     */
    FormConfig.prototype.submitButtonLabel;
    /**
     * If true, the column visibility filter will not be visible
     * @type {?|undefined}
     */
    FormConfig.prototype.disableColumnFilter;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * An ItemConfig describes an abstract entity with certain properties.
 * @record
 * @template T
 */
function ItemConfig() { }
if (false) {
    /**
     * For primitive values only: the title for the item
     * @type {?|undefined}
     */
    ItemConfig.prototype.title;
    /**
     * The Property that is used to identify items from another (e.g. in a selection).
     * @type {?|undefined}
     */
    ItemConfig.prototype.identifier;
    /**
     * Pattern of the identifier field. Is used e.g. in the searchbar
     * @type {?|undefined}
     */
    ItemConfig.prototype.identifierPattern;
    /**
     * The Property that is used to display the item for humans
     * @type {?|undefined}
     */
    ItemConfig.prototype.label;
    /**
     * The Items field Config
     * @type {?|undefined}
     */
    ItemConfig.prototype.fields;
    /**
     * The type of the Item. It determines how it will be displayed in different contexts
     * @type {?|undefined}
     */
    ItemConfig.prototype.type;
    /**
     * Custom resolve path function. It can be used e.g. to access subbranches of an Object.
     * @type {?|undefined}
     */
    ItemConfig.prototype.resolve;
    /**
     * Contains the parent Instance which inhabits the item. This property is set programmatically and therefore meant to be readonly.
     * @type {?|undefined}
     */
    ItemConfig.prototype.parent;
    /**
     * Callback that is invoked when the item is saved
     * @type {?|undefined}
     */
    ItemConfig.prototype.onSave;
    /**
     * Callback that is invoked before the item is edited
     * @type {?|undefined}
     */
    ItemConfig.prototype.onEdit;
    /**
     * This method can be used to set custom classes based on item contents. Used e.g. in list-items for row class
     * @type {?|undefined}
     */
    ItemConfig.prototype.classes;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * This class can be used to control the loading behaviour of external data.
 * @template T
 */
class Pagination {
    /**
     * You can init each Pagination instance with an optional config.
     * If no config is provided, it will default to ```{page: 1, size: 25}```.
     * @param {?=} config
     * @param {?=} total
     */
    constructor(config, total) {
        /**
         * Subject for tracking changes.
         */
        this.change = new Subject();
        /**
         * Observable that is nexted when the pagination has changed.
         */
        this.change$ = this.change.asObservable();
        this.config = { page: 1, size: 25 };
        Object.assign(this.config, config);
        Object.assign(this.config, {
            availableSizes: Array.from(new Set([this.config.size]
                .concat(this.config.availableSizes || [10, 25, 50, 100], [this.config.size])
                .sort((/**
             * @param {?} a
             * @param {?} b
             * @return {?}
             */
            (a, b) => a - b)))),
        });
        if (total) {
            this.setTotal(total);
        }
    }
    /**
     * Retrieves the current page
     * @return {?}
     */
    getPage() {
        return this.config.page;
    }
    /**
     * Retrieves the number of pages
     * @return {?}
     */
    getPages() {
        return this.pages ? this.pages.length : 0;
    }
    /**
     * Loads the next page. Throws error if already on last page.
     * @return {?}
     */
    next() {
        if (this.isLast()) {
            return; // already last page
        }
        this.config.page += 1;
        this.load();
    }
    /**
     * Loads the previous page. Throws error if already on first page.
     * @return {?}
     */
    prev() {
        if (this.isFirst()) {
            return; // already first page
        }
        this.config.page -= 1;
        this.load();
    }
    /**
     * Sets the total number of items and calculcates the page count.
     *
     * @param {?} total
     * @return {?}
     */
    setTotal(total) {
        /* if (this.total !== total) {
          this.change.next(this.config);
        } */
        this.total = total;
        this.pages = new Array(Math.ceil(this.total / this.config.size));
        if (this.config.page !== 1 && this.config.page > this.pages.length) {
            this.config.page = this.pages.length || 1;
            this.load();
        }
    }
    /**
     * Merges config and fires next on change
     * @protected
     * @param {?=} config
     * @return {?}
     */
    load(config) {
        if (config) {
            Object.assign(this.config, config);
        }
        this.change.next(this.config);
    }
    /**
     * Selects the given page number
     * @param {?} page
     * @param {?=} silent
     * @return {?}
     */
    select(page, silent = false) {
        if (page === this.config.page || silent) {
            this.config.page = page;
            return;
        }
        this.load({ page: page });
    }
    /**
     * Loads the first Page
     * @return {?}
     */
    first() {
        this.load({ page: 1 });
    }
    /**
     * Loads the last page
     * @return {?}
     */
    last() {
        if (!this.pages) {
            throw new Error(`Cannot load last page without knowing the item count.
        Call setTotal(itemCount) before loading.`);
        }
        this.load({ page: this.pages.length });
    }
    /**
     * Returns true if the given page number is currently active.
     * @param {?} page
     * @return {?}
     */
    isActive(page) {
        return this.config.page === page;
    }
    /**
     * Returns true if the current page is the first one
     * @return {?}
     */
    isFirst() {
        return this.config.page === 1;
    }
    /**
     * Returns true if the current page is the last one
     * @return {?}
     */
    isLast() {
        if (!this.pages) {
            return true;
        }
        return this.config.page === this.pages.length;
    }
    /**
     * slices a given array according to the current pagination state
     * @param {?} items
     * @return {?}
     */
    slice(items) {
        return items.slice((this.config.page - 1) * this.config.size, this.config.page * this.config.size);
    }
    /**
     * Returns an object with all relevant infos about the current state of pagination
     * @return {?}
     */
    params() {
        return {
            page: this.getPage(),
            pages: this.getPages(),
            total: this.total,
            from: (this.getPage() - 1) * this.config.size + 1,
            to: Math.min(this.getPage() * this.config.size, this.total),
            size: this.config.size,
            availableSizes: this.config.availableSizes,
        };
    }
    /**
     * updates the size of the pages.
     * @param {?} size
     * @return {?}
     */
    updateSize(size) {
        if (!size) {
            return;
        }
        this.load({ size, page: 1 });
    }
}
if (false) {
    /**
     * The total number of items that is being paginated. It can be changed via setTotal.
     * @type {?}
     * @protected
     */
    Pagination.prototype.total;
    /**
     * The pagination config
     * @type {?}
     * @protected
     */
    Pagination.prototype.config;
    /**
     * Array to iterate over the number of pages.
     * @type {?}
     */
    Pagination.prototype.pages;
    /**
     * Subject for tracking changes.
     * @type {?}
     * @private
     */
    Pagination.prototype.change;
    /**
     * Observable that is nexted when the pagination has changed.
     * @type {?}
     */
    Pagination.prototype.change$;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Used for natural sorting of strings
 * @type {?}
 */
const collator = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' });
/**
 * Sorts strings (naturally)
 * @param {?} a
 * @param {?} b
 * @return {?}
 */
function sortString(a, b) {
    return collator.compare(a, b);
}
/**
 * Sorts numbers
 * @param {?} a
 * @param {?} b
 * @return {?}
 */
function sortNumber(a, b) {
    return a - b;
}
/**
 * Sorts booleans
 * @param {?} a
 * @param {?} b
 * @return {?}
 */
function sortBoolean(a, b) {
    return a ? -1 : 1;
}
/**
 * The Sorter is a singleton that handles all kinds of sorting operations.
 * @abstract
 * @template T
 */
class Sorter {
    /**
     * Returns the sorting algorithm for the given item array.
     * @private
     * @param {?} items
     * @param {?=} property
     * @return {?}
     */
    static getAlgorithm(items, property) {
        if (!items.length) {
            return;
        }
        if (property && !items.reduce((/**
         * @param {?} has
         * @param {?} item
         * @return {?}
         */
        (has, item) => has && item.sort(property) !== undefined), true)) {
            console.warn('cannot sort property "' + property + '" because not all items have that property', items);
            return;
        }
        /** @type {?} */
        const types = items
            .map((/**
         * @param {?} item
         * @return {?}
         */
        (item) => typeof item.sort(property)))
            .filter((/**
         * @param {?} item
         * @param {?} index
         * @param {?} _items
         * @return {?}
         */
        (item, index, _items) => _items.indexOf(item) === index));
        if (types.length > 1) {
            console.warn('cannot sort items because they contain multiple types:', types);
            return;
        }
        if (!this.sortType[types[0]]) {
            console.warn('cannot sort items because no algorithm was found for type', types[0]);
            return;
        }
        return this.sortType[types[0]];
    }
    /**
     * Sorts a given Array of items after a given property.
     * @param {?} items Array of arbitrary content.
     * @param {?=} property Optional property to sort after (For Objects)
     * @param {?=} desc Optional Flag that will reverse sort the result (descending).
     * @return {?}
     */
    static sort(items, property, desc) {
        /** @type {?} */
        const algorithm = this.getAlgorithm(items, property);
        if (!algorithm) {
            return;
        }
        items.sort((/**
         * @param {?} a
         * @param {?} b
         * @return {?}
         */
        (a, b) => {
            if (!property) {
                return algorithm(a.resolve(), b.resolve());
            }
            return algorithm(a.sort(property), b.sort(property));
        }));
        if (desc) {
            items.reverse();
        }
    }
}
/**
 * Contains sorting methods for different value types.
 */
Sorter.sortType = {
    string: sortString,
    number: sortNumber,
    boolean: sortBoolean,
};
if (false) {
    /**
     * Contains sorting methods for different value types.
     * @type {?}
     */
    Sorter.sortType;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * A more sophisticated Collection of Objects with arbitrary content.
 * It comes with features like resolve functions, identifiers, display formatting and sorting.
 * @template T
 */
class List extends Collection {
    /**
     * Constructs the List. Populates the items and instantiates the fields.
     * @param {?=} values
     * @param {?=} config
     * @param {?=} pagination
     */
    constructor(values, config = {}, pagination) {
        super([]);
        /**
         * Current Value Groups (Different Unique Values).
         */
        this.groups = [];
        /**
         * The items of the current page
         */
        this.page = [];
        /**
         * Subject that should be nexted when loading is finished
         */
        this.change = new Subject();
        /**
         * Observable that is nexted when the list has changed.
         */
        this.change$ = this.change.asObservable();
        if (values) {
            super.addAll(values.map((/**
             * @param {?} value
             * @return {?}
             */
            (value) => new Item(value, Object.assign({}, config)))), false, false);
        }
        this.config = Object.assign({ page: 1, maxColumns: 8 }, config || {});
        this.fields = this.getFields();
        this.hideOverflowFields();
        this.pagination = pagination || new Pagination(this.config, this.items.length);
        this.change$.subscribe((/**
         * @return {?}
         */
        () => {
            this.pagination.select(this.config.page || 1, true);
        }));
        if (!pagination) {
            // load if no custom pagination was given
            this.pagination.change$.pipe(debounceTime(200)).subscribe((/**
             * @param {?} _config
             * @return {?}
             */
            (_config) => this.load(_config)));
            this.load();
        }
    }
    /**
     * Getter for items, calls transform
     * @return {?}
     */
    get display() {
        if (!this.config || !this.config.display) {
            return this.items;
        }
        return this.config.display(this.items);
    }
    /**
     * Loads the list page with the given config or, if none given, uses the current config.
     * Reapplies grouping (if any) and calls the change Subject.
     * @param {?=} config
     * @return {?}
     */
    load(config) {
        if (config) {
            Object.assign(this.config, config);
        }
        this.page = this.pagination.slice(this.items);
        this.groupBy(this.config.sortBy);
        this.change.next(this);
    }
    /**
     * Adds the given item to the list and assigns the list config to the item
     * @param {?} item
     * @param {?=} unique
     * @param {?=} event
     * @return {?}
     */
    add(item, unique, event = true) {
        item.useConfig(this.config);
        return super.add(item, unique, event);
    }
    /**
     * Distills Array of item properties. Either uses keys of config.fields or parses the item
     * properties directly.
     * @protected
     * @return {?}
     */
    getFields() {
        if (this.config && this.config.fields) {
            return Object.keys(this.config.fields)
                .filter((/**
             * @param {?} key
             * @return {?}
             */
            (key) => this.config.fields[key].list !== false))
                .map((/**
             * @param {?} field
             * @return {?}
             */
            (field) => new Field(field, this.config.fields[field])));
        }
        /** @type {?} */
        const fields = [];
        this.items.forEach((/**
         * @param {?} item
         * @return {?}
         */
        (item) => {
            item.getProperties().forEach((/**
             * @param {?} property
             * @return {?}
             */
            (property) => {
                if (!fields.find((/**
                 * @param {?} f
                 * @return {?}
                 */
                (f) => f.property === property))) {
                    fields.push(new Field(property, { type: typeof item.resolve(property) }));
                }
            }));
        }));
        return fields;
    }
    /**
     * @param {?} field
     * @return {?}
     */
    toggleVisibility(field) {
        field.hideInList = !field.hideInList;
        this.change.next(this);
    }
    /**
     * Sets all fields that exceed the maxColumns to hidden
     * @protected
     * @return {?}
     */
    hideOverflowFields() {
        if (this.config && this.config.maxColumns) {
            this.fields
                .filter((/**
             * @param {?} f
             * @return {?}
             */
            (f) => !f.hideInList))
                .forEach((/**
             * @param {?} field
             * @param {?} index
             * @return {?}
             */
            (field, index) => {
                if (index >= this.config.maxColumns && field.hideInList === undefined) {
                    field.hideInList = true;
                }
            }));
        }
    }
    /**
     * Resolves the item with the given Array index or identifier (if configured)
     * @param {?} identifier
     * @return {?}
     */
    id(identifier) {
        if (identifier === undefined) {
            throw new Error(`cannot get item with identifier "${identifier}"`);
        }
        return (this.items.find((/**
         * @param {?} item
         * @param {?} key
         * @return {?}
         */
        (item, key) => {
            if (!item.config.identifier) {
                return false;
            }
            return item.id() === identifier;
        })) || this.items[identifier]);
    }
    /**
     * Filters the list after the given property and value
     * @param {?} property
     * @param {?=} value
     * @param {?=} operator
     * @return {?}
     */
    filter(property, value = '', operator = 'exact') {
        this.config.filter = { [property]: value };
        if (value === null) {
            this.load();
            return;
            // this.page = [].concat(this.items);
        }
        // TODO find way to filter with pagination and without loosing filtered out items
        this.page = this.items
            .filter((/**
         * @param {?} item
         * @return {?}
         */
        (item) => {
            return item
                .resolve(property)
                .toLowerCase()
                .includes(value.toLowerCase()); // TODO: better filter
        }))
            .slice(0, this.config.size || 100);
    }
    /**
     * @param {?=} filterOptions
     * @return {?}
     */
    setFilter(filterOptions = {}) {
        if (!this.isFiltered(null, filterOptions) && !this.isFiltered()) {
            return;
        }
        if (this.isEmptyFilter(filterOptions)) {
            return this.clearFilter();
        }
        filterOptions = Object.keys(filterOptions).reduce((/**
         * @param {?} filtered
         * @param {?} key
         * @return {?}
         */
        (filtered, key) => {
            if (this.isEmptyFilter(filterOptions[key])) {
                delete filtered[key];
            }
            return filtered;
        }), filterOptions);
        this.load({
            page: 1,
            filter: filterOptions,
        });
    }
    /**
     * Clears the filter for given property or all properties if none given.
     * @param {?=} property
     * @return {?}
     */
    clearFilter(property) {
        if (property) {
            return this.filter(property, null);
        }
        this.load({
            page: 1,
            filter: {},
        });
    }
    /**
     * Helper function. Returns true if the given query value is empty (also recognizes empty array)
     * @param {?} query
     * @return {?}
     */
    isEmptyFilter(query) {
        return (query === '' ||
            query === null ||
            query === undefined ||
            (Array.isArray(query) && !query.length) ||
            (typeof query === 'object' && Object.keys(query).length === 0));
    }
    /**
     * Returns true if the given property has a filter set. If no property is given it returns true when no property has a filter.
     * @param {?=} property
     * @param {?=} filterOptions
     * @return {?}
     */
    isFiltered(property, filterOptions = this.config.filter) {
        if (!filterOptions) {
            return false;
        }
        if (!property) {
            return Object.keys(filterOptions).filter((/**
             * @param {?} key
             * @return {?}
             */
            (key) => !this.isEmptyFilter(filterOptions[key]))).length > 0;
        }
        return !this.isEmptyFilter(filterOptions[property]);
    }
    /**
     * Returns the filter
     * @param {?=} property
     * @param {?=} filterOptions
     * @return {?}
     */
    getFilterValue(property, filterOptions = this.config.filter) {
        if (!property) {
            property = this.config.label;
        }
        if (!filterOptions || !property) {
            return undefined;
        }
        return filterOptions[property];
    }
    /**
     * Changes the config's sort variables to reflect the given sorting
     * @protected
     * @param {?} property
     * @param {?=} desc
     * @return {?}
     */
    sortProperty(property, desc) {
        if (desc !== undefined) {
            if (this.config.desc === desc) {
                delete this.config.sortBy;
                delete this.config.desc;
            }
            else {
                this.config.desc = desc;
                this.config.sortBy = property;
            }
            return;
        }
        else if (property !== this.config.sortBy) {
            delete this.config.desc;
            this.config.sortBy = property;
        }
        else if (this.config.desc) {
            delete this.config.sortBy;
        }
        this.config.desc = this.config.desc === undefined ? desc || false : !this.config.desc;
    }
    /**
     * Returns true if the given sort state is active. You can either just check for a property + desc flag
     * @param {?} property
     * @param {?=} desc
     * @return {?}
     */
    isSorted(property, desc) {
        if (typeof desc === 'undefined') {
            return this.config.sortBy === property;
        }
        return this.config.sortBy === property && this.config.desc === desc;
    }
    /**
     * Sorts with given sorting, using the Sorter
     * @param {?} property
     * @param {?=} desc
     * @return {?}
     */
    toggleSort(property, desc) {
        this.sortProperty(property, desc);
        Sorter.sort(this.items, property, this.config.desc);
        this.load(this.config);
    }
    /**
     * Toggles selectMode of list config
     * @return {?}
     */
    toggleSelectMode() {
        this.config = Object.assign({}, this.config, {
            selectMode: !this.config.selectMode,
        });
        this.change.next(this);
    }
    /**
     * Returns an Array of all unique values of the given property
     * @param {?} property
     * @return {?}
     */
    groupBy(property) {
        delete this.groups;
        /** @type {?} */
        const page = this.pagination ? this.pagination.getPage() : 0;
        if (!property || !this.config.fields || !this.config.fields[property] || !this.config.fields[property].group) {
            this.groups = [
                {
                    page,
                    sortBy: this.config.sortBy,
                    desc: this.config.desc,
                },
            ];
            return;
        }
        /** @type {?} */
        const groups = [];
        this.page.forEach((/**
         * @param {?} item
         * @return {?}
         */
        (item) => {
            /** @type {?} */
            const value = item.group(property);
            if (!groups.find((/**
             * @param {?} g
             * @return {?}
             */
            (g) => g.value === value))) {
                groups.push({
                    value,
                    page,
                    property: this.config.sortBy,
                    desc: this.config.desc,
                });
            }
        }));
        this.groups = groups;
    }
    /**
     * Item tracking for *ngFor.
     * @param {?} index
     * @param {?} item
     * @return {?}
     */
    trackItem(index, item) {
        return index;
    }
    /**
     * Returns an array of all sortable fields
     * @return {?}
     */
    sortableFields() {
        return this.fields.filter((/**
         * @param {?} field
         * @return {?}
         */
        (field) => field.sortable));
    }
    /**
     * Returns an array of all sortable fields
     * @return {?}
     */
    filterableFields() {
        return this.fields.filter((/**
         * @param {?} field
         * @return {?}
         */
        (field) => field.filterable));
    }
    /**
     * Returns true if the given field index in the visible fields is higher than maxColumns.
     * @param {?} field
     * @return {?}
     */
    isOverTheMax(field) {
        return this.fields.filter((/**
         * @param {?} f
         * @return {?}
         */
        (f) => !f.hideInList)).indexOf(field) >= this.config.maxColumns;
    }
}
if (false) {
    /**
     * Array of Properties that are relevant for each item. The fields are populated on construction
     * via getFields method.
     * @type {?}
     */
    List.prototype.fields;
    /**
     * The List Configuration, click on ListConfig for details. Can be given an optional ListConfig.
     * @type {?}
     */
    List.prototype.config;
    /**
     * Current Value Groups (Different Unique Values).
     * @type {?}
     */
    List.prototype.groups;
    /**
     * The list's pagination (Optional)
     * @type {?}
     */
    List.prototype.pagination;
    /**
     * The items of the current page
     * @type {?}
     */
    List.prototype.page;
    /**
     * Subject that should be nexted when loading is finished
     * @type {?}
     * @protected
     */
    List.prototype.change;
    /**
     * Observable that is nexted when the list has changed.
     * @type {?}
     */
    List.prototype.change$;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 *  Configuration for List Classes.
 *
 * @record
 * @template T
 */
function ListConfig() { }
if (false) {
    /**
     * For lists with primitive values only: the title of the list header
     * @type {?|undefined}
     */
    ListConfig.prototype.title;
    /**
     * The property name that is sorted after
     * @type {?|undefined}
     */
    ListConfig.prototype.sortBy;
    /**
     * Array of properties that is sorted after, experimental...
     * @type {?|undefined}
     */
    ListConfig.prototype.sort;
    /**
     * If set to true, the sorting will be descending
     * @type {?|undefined}
     */
    ListConfig.prototype.desc;
    /**
     * If true, the list will show its checkboxes and will select on column click.
     * The columnClicked output will be ignored as long selectMode is active
     * @type {?|undefined}
     */
    ListConfig.prototype.selectMode;
    /**
     * If true, no select dropdown will be shown on ec-select
     * @type {?|undefined}
     */
    ListConfig.prototype.disableSearchbar;
    /**
     * If true, the list will have no header.
     * @type {?|undefined}
     */
    ListConfig.prototype.disableHeader;
    /**
     * If true, the header will also be shown when the list is empty. Defaults to false
     * @type {?|undefined}
     */
    ListConfig.prototype.alwaysShowHeader;
    /**
     * If true, no dropdown will be shown for a select
     * @type {?|undefined}
     */
    ListConfig.prototype.disableDropdown;
    /**
     * If true, removal of items wont be possible (select)
     * @type {?|undefined}
     */
    ListConfig.prototype.disableRemove;
    /**
     * If true, no column filter will be shown in the list header
     * @type {?|undefined}
     */
    ListConfig.prototype.disableColumnFilter;
    /**
     * If true, select items cannot be dragged
     * @type {?|undefined}
     */
    ListConfig.prototype.disableDrag;
    /**
     * If true, the default pagination will not be visible.
     * @type {?|undefined}
     */
    ListConfig.prototype.hidePagination;
    /**
     * The current active page
     * @type {?|undefined}
     */
    ListConfig.prototype.page;
    /**
     * The number of items per page
     * @type {?|undefined}
     */
    ListConfig.prototype.size;
    /**
     * The available sizes. If not set, the size cannot be changed
     * @type {?|undefined}
     */
    ListConfig.prototype.availableSizes;
    /**
     * Should the selection be solo?
     * @type {?|undefined}
     */
    ListConfig.prototype.solo;
    /**
     * tells the list to show only items that match the filter
     * @type {?|undefined}
     */
    ListConfig.prototype.filter;
    /**
     * a query that will be turned in to a filter
     * @type {?|undefined}
     */
    ListConfig.prototype.query;
    /**
     * Maximal visible columns. Defaults to 8
     * @type {?|undefined}
     */
    ListConfig.prototype.maxColumns;
    /**
     * how many columns should the pop have?
     * @type {?|undefined}
     */
    ListConfig.prototype.popColumns;
    /**
     * If true, the list will automatically load on change
     * @type {?|undefined}
     */
    ListConfig.prototype.autoload;
    /**
     * The key that should store the lists config in the local storage.
     * If set, the key will be populated on config changes.
     * @type {?|undefined}
     */
    ListConfig.prototype.storageKey;
    /**
     * Transforms the Items before they are displayed, e.g. to apply a filter for the view *
     * @type {?|undefined}
     */
    ListConfig.prototype.display;
    /**
     * If set, a filter input for the given field property will be shown by default
     * @type {?|undefined}
     */
    ListConfig.prototype.defaultFilter;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Extension of List that keeps track of selected items. It can keep track of items via identifier
 * property even if the object references are being replaced, e.g. when reloading a set if items.
 * It supports solo and multiple selection.
 * @template T
 */
class Selection extends List {
    /**
     * Adds item to selection. If solo is true, all other items will be removed.
     * @param {?} item
     * @param {?=} solo
     * @return {?}
     */
    select(item, solo = this.config.solo) {
        if (solo) {
            this.removeAll();
            this.add(item);
        }
        else {
            this.add(item, true);
        }
    }
    /**
     * Returns the index of the given item or an item that has the same identifier or value.
     * @param {?} item
     * @return {?}
     */
    index(item) {
        if (this.config.identifier) {
            return this.items.indexOf(this.id(item.resolve(this.config.identifier)));
        }
        return this.items.indexOf(this.items.find((/**
         * @param {?} i
         * @return {?}
         */
        (i) => i.resolve() === item.resolve())));
    }
    /**
     * @param {?} item
     * @return {?}
     */
    has(item) {
        return super.has(item) || this.index(item) !== -1;
    }
    /**
     * Toggle item in and out of selection.
     * The solo property will change the behaviour like you would expect it to behave :)
     * @param {?} item
     * @param {?=} solo
     * @param {?=} event
     * @return {?}
     */
    toggle(item, solo = this.config.solo, event = true) {
        if (!item) {
            console.warn('toggle malicious item', item);
            return;
        }
        if (!this.has(item)) {
            if (solo) {
                return this.replaceWith([item], event);
            }
            this.add(item, event);
        }
        else if (solo) {
            if (this.items.length > 1) {
                // if multiple are selected => keep item
                return this.replaceWith([item], event);
            }
            this.removeAll();
        }
        else {
            this.remove(item, event);
        }
    }
    /**
     * Toggle multiple items. You can control if the items should be kept, flipped, or be kept unique
     * @template THIS
     * @this {THIS}
     * @param {?} items
     * @param {?=} flip
     * @param {?=} keep
     * @return {THIS}
     */
    toggleAll(items, flip, keep) {
        items = items || [];
        // items = Array.isArray(items) ? items : [items];
        if (!flip && !keep && (/** @type {?} */ (this)).hasAll(items)) {
            (/** @type {?} */ (this)).removeAll(items);
            return (/** @type {?} */ (this));
        }
        items.forEach((/**
         * @param {?} item
         * @return {?}
         */
        (item) => {
            if (flip) {
                (/** @type {?} */ (this)).toggle(item, (/** @type {?} */ (this)).config.solo, false);
            }
            else if (!(/** @type {?} */ (this)).hasAll(items)) {
                (/** @type {?} */ (this)).add(item, true, false);
            }
        }));
        (/** @type {?} */ (this)).update.next((/** @type {?} */ (this)));
        return (/** @type {?} */ (this));
    }
    /**
     * Flips all items.
     * @template THIS
     * @this {THIS}
     * @param {?} items
     * @return {THIS}
     */
    flipAll(items) {
        return (/** @type {?} */ (this)).toggleAll(items, true);
    }
    /**
     * Returns an Array containing the current value. If an identifier is set, the array will consist of the identifier values,
     * if not, it will resolve the item contents.
     * @param {?=} solo
     * @return {?}
     */
    getValue(solo = this.config.solo) {
        /** @type {?} */
        const value = this.items.map((/**
         * @param {?} item
         * @return {?}
         */
        (item) => (this.config.identifier ? item.id() : item.resolve())));
        if (solo) {
            return value.length ? value[0] : null;
        }
        return value;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { Collection, Config, Field, Form, Item, List, Pagination, Selection, Sorter, sortBoolean, sortNumber, sortString };

//# sourceMappingURL=ec.components-core.js.map