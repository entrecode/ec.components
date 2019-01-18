import { debounceTime } from 'rxjs/operators';
import { Subject } from 'rxjs';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
        items.forEach((item) => {
            this.items.push(item);
        });
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
        return items.reduce((has, item) => {
            return has && this.has(item);
        }, true);
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
        items.forEach((item) => {
            this.add(item, unique, false);
        });
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
            items.forEach((item) => {
                this.remove(item, false);
            });
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
     * Returns the column class for data-col, based on configured columns
     * @return {?}
     */
    getColumns() {
        return (this.columns || 12) + '-sm';
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
                .sort(((a, b) => a - b))))
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
        return items.slice((this.config.page - 1) * this.config.size, (this.config.page) * this.config.size);
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
        if (property && !items
            .reduce((has, item) => has && item.sort(property) !== undefined, true)) {
            console.warn('cannot sort property "' + property + '" because not all items have that property', items);
            return;
        }
        /** @type {?} */
        const types = items
            .map(item => typeof item.sort(property))
            .filter((item, index, _items) => _items.indexOf(item) === index);
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
        items.sort((a, b) => {
            if (!property) {
                return algorithm(a.resolve(), b.resolve());
            }
            return algorithm(a.sort(property), b.sort(property));
        });
        if (desc) {
            items.reverse();
        }
    }
}
/**
 * Contains sorting methods for different value types.
 */
Sorter.sortType = {
    'string': sortString,
    'number': sortNumber,
    'boolean': sortBoolean
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
            super.addAll(values.map(value => new Item(value, Object.assign({}, config))), false, false);
        }
        this.config = Object.assign({ page: 1, maxColumns: 8 }, config || {});
        this.fields = this.getFields();
        this.hideOverflowFields();
        this.pagination = pagination || new Pagination(this.config, this.items.length);
        this.change$.subscribe(() => {
            this.pagination.select(this.config.page || 1, true);
        });
        if (!pagination) { // load if no custom pagination was given
            this.pagination.change$.pipe(debounceTime(200))
                .subscribe(_config => this.load(_config));
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
                .filter((key) => this.config.fields[key].list !== false)
                .map((field) => new Field(field, this.config.fields[field]));
        }
        /** @type {?} */
        const fields = [];
        this.items.forEach((item) => {
            item.getProperties().forEach(property => {
                if (!fields.find((f) => f.property === property)) {
                    fields.push(new Field(property, { type: typeof item.resolve(property) }));
                }
            });
        });
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
            this.fields.filter(f => !f.hideInList).forEach((field, index) => {
                if (index >= this.config.maxColumns && field.hideInList === undefined) {
                    field.hideInList = true;
                }
            });
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
        return this.items.find((item, key) => {
            if (!item.config.identifier) {
                return false;
            }
            return item.id() === identifier;
        }) || this.items[identifier];
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
        this.page = this.items.filter((item) => {
            return item.resolve(property).toLowerCase().includes(value.toLowerCase()); // TODO: better filter
        }).slice(0, this.config.size || 100);
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
            filter: {}
        });
    }
    /**
     * Helper function. Returns true if the given query value is empty (also recognizes empty array)
     * @param {?} query
     * @return {?}
     */
    isEmptyFilter(query) {
        return query === '' ||
            query === null ||
            query === undefined ||
            (Array.isArray(query) && !query.length);
    }
    /**
     * Returns true if the given property has a filter set. If no property is given it returns true when no property has a filter.
     * @param {?=} property
     * @return {?}
     */
    isFiltered(property) {
        if (!this.config.filter) {
            return false;
        }
        if (!property) {
            return Object.keys(this.config.filter)
                .filter(key => !this.isEmptyFilter(this.config.filter[key]))
                .length > 0;
        }
        return !this.isEmptyFilter(this.config.filter[property]);
    }
    /**
     * Returns the filter
     * @param {?=} property
     * @return {?}
     */
    getFilterValue(property) {
        if (!property) {
            property = this.config.label;
        }
        if (!this.config.filter || !property) {
            return undefined;
        }
        return this.config.filter[property];
    }
    /**
     * Changes the config's sort variables to reflect the given sorting
     * @protected
     * @param {?} property
     * @param {?=} desc
     * @return {?}
     */
    sortProperty(property, desc) {
        if (property !== this.config.sortBy) {
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
            selectMode: !this.config.selectMode
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
            this.groups = [{
                    page,
                    sortBy: this.config.sortBy,
                    desc: this.config.desc
                }];
            return;
        }
        /** @type {?} */
        const groups = [];
        this.page.forEach(item => {
            /** @type {?} */
            const value = item.group(property);
            if (!groups.find((g) => g.value === value)) {
                groups.push({
                    value,
                    page,
                    property: this.config.sortBy,
                    desc: this.config.desc
                });
            }
        });
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
        return this.fields.filter(field => field.sortable);
    }
    /**
     * Returns true if the given field index in the visible fields is higher than maxColumns.
     * @param {?} field
     * @return {?}
     */
    isOverTheMax(field) {
        return this.fields.filter(f => !f.hideInList).indexOf(field) >= this.config.maxColumns;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
        return this.items.indexOf(this.items.find(i => i.resolve() === item.resolve()));
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
        items.forEach((item) => {
            if (flip) {
                (/** @type {?} */ (this)).toggle(item, (/** @type {?} */ (this)).config.solo, false);
            }
            else if (!(/** @type {?} */ (this)).hasAll(items)) {
                (/** @type {?} */ (this)).add(item, true, false);
            }
        });
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
        const value = this.items.map((item) => this.config.identifier ? item.id() : item.resolve());
        if (solo) {
            return value.length ? value[0] : null;
        }
        return value;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { Collection, Field, Config, Form, Item, List, Pagination, Selection, sortString, sortNumber, sortBoolean, Sorter };

//# sourceMappingURL=ec.components-core.js.map