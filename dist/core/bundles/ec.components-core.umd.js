(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('rxjs/operators'), require('rxjs')) :
    typeof define === 'function' && define.amd ? define('@ec.components/core', ['exports', 'rxjs/operators', 'rxjs'], factory) :
    (factory((global.ec = global.ec || {}, global.ec.components = global.ec.components || {}, global.ec.components.core = {}),global.rxjs.operators,global.rxjs));
}(this, (function (exports,operators,rxjs) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * A Collection is a more sophisticated Array. It is fundamental for other classes like List.
     * @template T
     */
    var /**
     * A Collection is a more sophisticated Array. It is fundamental for other classes like List.
     * @template T
     */ Collection = /** @class */ (function () {
        /**
         * Constructs the collection with the given item Array (optional).
         * @example
         * ```typescript
         *  const numbers = new Collection([1, 2, 3]);
         * ```
         */
        function Collection(items) {
            if (items === void 0) {
                items = [];
            }
            var _this = this;
            /**
             * Subject that is nexted when the items update
             */
            this.update = new rxjs.Subject();
            /**
             * Subject that is nexted when the items change
             */
            this.update$ = this.update.asObservable();
            this.items = [];
            items.forEach(function (item) {
                _this.items.push(item);
            });
        }
        /** Returns the index of the given item */
        /**
         * Returns the index of the given item
         * @param {?} item
         * @return {?}
         */
        Collection.prototype.index = /**
         * Returns the index of the given item
         * @param {?} item
         * @return {?}
         */
            function (item) {
                return this.items.indexOf(item);
            };
        /**
         * Checks if the Collection contains the given item.
         * @example
         * ```typescript
         * numbers.has(2); //true
         * ```
         */
        /**
         * Checks if the Collection contains the given item.
         * \@example
         * ```typescript
         * numbers.has(2); //true
         * ```
         * @param {?} item
         * @return {?}
         */
        Collection.prototype.has = /**
         * Checks if the Collection contains the given item.
         * \@example
         * ```typescript
         * numbers.has(2); //true
         * ```
         * @param {?} item
         * @return {?}
         */
            function (item) {
                return this.index(item) !== -1;
            };
        /**
         * Checks if the Collection contains all given items.
         * @example
         * ```typescript
         * numbers.has([1,2]); //true
         * ```
         */
        /**
         * Checks if the Collection contains all given items.
         * \@example
         * ```typescript
         * numbers.has([1,2]); //true
         * ```
         * @param {?=} items
         * @return {?}
         */
        Collection.prototype.hasAll = /**
         * Checks if the Collection contains all given items.
         * \@example
         * ```typescript
         * numbers.has([1,2]); //true
         * ```
         * @param {?=} items
         * @return {?}
         */
            function (items) {
                var _this = this;
                if (items === void 0) {
                    items = [];
                }
                if (items === null) {
                    // console.warn('has all fail', this, items);
                    return false;
                }
                return items.reduce(function (has, item) {
                    return has && _this.has(item);
                }, true);
            };
        /**
         * Adds the given item to the Collection. If the unique flag is set, the item will only be added
         * if it is not contained.
         * @example
         * ```typescript
         * numbers.add(4);
         * ```
         */
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
        Collection.prototype.add = /**
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
            function (item, unique, event) {
                if (event === void 0) {
                    event = true;
                }
                if (unique && this.has(item)) {
                    return false;
                }
                this.items.push(item);
                if (event) {
                    this.update.next(this);
                }
            };
        /**
         * Adds the given items to the Collection. If the unique flag is set, only items that are not
         * contained will be added.
         * @example
         * ```typescript
         * numbers.addAll([5, 6, 7]);
         * ```
         */
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
        Collection.prototype.addAll = /**
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
            function (items, unique, event) {
                var _this = this;
                if (items === void 0) {
                    items = [];
                }
                if (unique === void 0) {
                    unique = false;
                }
                if (event === void 0) {
                    event = true;
                }
                /** @type {?} */
                var length = this.items.length;
                items.forEach(function (item) {
                    _this.add(item, unique, false);
                });
                if (this.items.length > length && event) {
                    this.update.next(this);
                }
            };
        /**
         * Removes the given item from the Collection.
         * @example
         * ```typescript
         * numbers.remove(4);
         * ```
         */
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
        Collection.prototype.remove = /**
         * Removes the given item from the Collection.
         * \@example
         * ```typescript
         * numbers.remove(4);
         * ```
         * @param {?} item
         * @param {?=} event
         * @return {?}
         */
            function (item, event) {
                if (event === void 0) {
                    event = true;
                }
                if (!this.has(item)) {
                    return false;
                }
                this.items.splice(this.index(item), 1);
                if (event) {
                    this.update.next(this);
                }
            };
        /**
         * Removes all items from the Collection.
         * @example
         * ```typescript
         * numbers.removeAll();
         * ```
         */
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
        Collection.prototype.removeAll = /**
         * Removes all items from the Collection.
         * \@example
         * ```typescript
         * numbers.removeAll();
         * ```
         * @param {?=} items
         * @param {?=} event
         * @return {?}
         */
            function (items, event) {
                var _this = this;
                if (event === void 0) {
                    event = true;
                }
                /** @type {?} */
                var length = this.items.length;
                if (items) {
                    items.forEach(function (item) {
                        _this.remove(item, false);
                    });
                }
                else {
                    this.items.length = 0;
                }
                if (this.items.length < length && event) {
                    this.update.next(this);
                }
            };
        /** Toggles the item in and out of collection */
        /**
         * Toggles the item in and out of collection
         * @param {?} item
         * @param {?=} event
         * @return {?}
         */
        Collection.prototype.toggle = /**
         * Toggles the item in and out of collection
         * @param {?} item
         * @param {?=} event
         * @return {?}
         */
            function (item, event) {
                if (event === void 0) {
                    event = true;
                }
                if (this.has(item)) {
                    this.remove(item, event);
                }
                else {
                    this.add(item, event);
                }
            };
        /** Replaces all current items with the given items. */
        /**
         * Replaces all current items with the given items.
         * @param {?} items
         * @param {?=} event
         * @return {?}
         */
        Collection.prototype.replaceWith = /**
         * Replaces all current items with the given items.
         * @param {?} items
         * @param {?=} event
         * @return {?}
         */
            function (items, event) {
                if (event === void 0) {
                    event = true;
                }
                if (this.items && this.items.length) {
                    this.removeAll(undefined, false);
                }
                if (items.length) {
                    this.addAll(items, false, false);
                }
                if (event) {
                    this.update.next(this);
                }
            };
        /** Returns true if the collection is empty */
        /**
         * Returns true if the collection is empty
         * @return {?}
         */
        Collection.prototype.isEmpty = /**
         * Returns true if the collection is empty
         * @return {?}
         */
            function () {
                return this.items.length === 0;
            };
        /** Moves the given item to the given array index. */
        /**
         * Moves the given item to the given array index.
         * @param {?} item
         * @param {?} index
         * @param {?=} event
         * @return {?}
         */
        Collection.prototype.move = /**
         * Moves the given item to the given array index.
         * @param {?} item
         * @param {?} index
         * @param {?=} event
         * @return {?}
         */
            function (item, index, event) {
                if (event === void 0) {
                    event = true;
                }
                if (!this.has(item) || this.items.indexOf(item) === index) {
                    return;
                }
                this.items.splice(index, 0, this.items.splice(this.items.indexOf(item), 1)[0]);
                if (event) {
                    this.update.next(this);
                }
            };
        return Collection;
    }());

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

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * The Root class for all Configurations.
     * @abstract
     */
    var /**
     * The Root class for all Configurations.
     * @abstract
     */ Config = /** @class */ (function () {
        function Config() {
            // TODO use Map !!!! (like simi did in EventEmitter.ts)
            /**
             * The config object.
             */
            this.config = {};
        }
        /** This method is a getter and setter for configurations. The key stands for the config (e.g. model).
         * The property is a sub property if the config (e.g. fields => model.fields).
         * If no config is given, the method just returns the configuration for the given property.
         * If a config is given, the property config is merged via Object.assign. */
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
        Config.prototype.configure = /**
         * This method is a getter and setter for configurations. The key stands for the config (e.g. model).
         * The property is a sub property if the config (e.g. fields => model.fields).
         * If no config is given, the method just returns the configuration for the given property.
         * If a config is given, the property config is merged via Object.assign.
         * @param {?} key
         * @param {?} property
         * @param {?=} config
         * @return {?}
         */
            function (key, property, config) {
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
            };
        return Config;
    }());

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b)
                if (b.hasOwnProperty(p))
                    d[p] = b[p]; };
        return extendStatics(d, b);
    };
    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }
    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
            return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
                ar.push(r.value);
        }
        catch (error) {
            e = { error: error };
        }
        finally {
            try {
                if (r && !r.done && (m = i["return"]))
                    m.call(i);
            }
            finally {
                if (e)
                    throw e.error;
            }
        }
        return ar;
    }
    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * An Item basically wraps an Object and provides a config with metadata and helper methods to access the object.
     * @template T
     */
    var /**
     * An Item basically wraps an Object and provides a config with metadata and helper methods to access the object.
     * @template T
     */ Item = /** @class */ (function () {
        /** Each item is constructed with its body and an optional config. */
        function Item(body, config) {
            if (config === void 0) {
                config = {};
            }
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
                this.config = (( /** @type {?} */(Object))).assign(this.config, config);
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
                if (value === void 0) {
                    value = this.resolve(property);
                }
                if (defaultValue === void 0) {
                    defaultValue = this.resolve(property);
                }
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
                if (value === void 0) {
                    value = this.body;
                }
                return (( /** @type {?} */(Object))).assign.apply((( /** @type {?} */(Object))), __spread([{}], Object.keys(value)
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
                if (value === void 0) {
                    value = this.body;
                }
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
                if (put === void 0) {
                    put = false;
                }
                if (put) {
                    value = this.pickWriteOnly(value);
                }
                this.deleteImmutableProperties(value);
                /** Run the remaining properties through serializers */
                Object.keys(value).map(function (property) {
                    var _a;
                    (( /** @type {?} */(Object))).assign(value, (_a = {},
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
                if (value === void 0) {
                    value = this.body;
                }
                if (this.config.onSave) {
                    return Promise.resolve(this.config.onSave(this, value))
                        .then(function (_value) {
                        _this.body = _value;
                        return _this;
                    });
                }
                this.body = (( /** @type {?} */(Object))).assign(this.resolve() || {}, value);
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
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * The Form class is an Item with additional info about its properties (Fields).
     * @template T
     */
    var /**
     * The Form class is an Item with additional info about its properties (Fields).
     * @template T
     */ Form = /** @class */ (function (_super) {
        __extends(Form, _super);
        /** The constructor will populate the fields array.
         * If config.fields is set only the configured fields will be created.
         * If not, all properties of the given body will be used as fields. */
        function Form(body, config) {
            var _this = _super.call(this, body, config) || this;
            _this.fields = [];
            if (!_this.config || !_this.config.fields) {
                return _this;
            }
            Object.keys(_this.config.fields)
                .forEach(function (property) {
                _this.fields.push(new Field(property, _this.config.fields[property]));
            });
            return _this;
        }
        /** creates and adds a single field to the form */
        /**
         * creates and adds a single field to the form
         * @param {?} property
         * @param {?} config
         * @return {?}
         */
        Form.prototype.createField = /**
         * creates and adds a single field to the form
         * @param {?} property
         * @param {?} config
         * @return {?}
         */
            function (property, config) {
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
                var field = new Field(property, this.config.fields[property]);
                this.fields = this.fields.concat([field]);
                return field;
            };
        /** returns the field instance of the given property */
        /**
         * returns the field instance of the given property
         * @param {?} property
         * @return {?}
         */
        Form.prototype.getField = /**
         * returns the field instance of the given property
         * @param {?} property
         * @return {?}
         */
            function (property) {
                return this.fields.find(function (field) { return field.property === property; });
            };
        /** Returns the original value of the property, if any. */
        /**
         * Returns the original value of the property, if any.
         * @param {?} property
         * @return {?}
         */
        Form.prototype.getValue = /**
         * Returns the original value of the property, if any.
         * @param {?} property
         * @return {?}
         */
            function (property) {
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
            };
        /** Returns true if the form is currently in edit mode (has a body set) */
        /**
         * Returns true if the form is currently in edit mode (has a body set)
         * @return {?}
         */
        Form.prototype.isEditing = /**
         * Returns true if the form is currently in edit mode (has a body set)
         * @return {?}
         */
            function () {
                return !!this.getBody();
            };
        /** Returns true if the form is currently in create mode (has not a body set) */
        /**
         * Returns true if the form is currently in create mode (has not a body set)
         * @return {?}
         */
        Form.prototype.isCreating = /**
         * Returns true if the form is currently in create mode (has not a body set)
         * @return {?}
         */
            function () {
                return !this.isEditing();
            };
        return Form;
    }(Item));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * This class can be used to control the loading behaviour of external data.
     * @template T
     */
    var /**
     * This class can be used to control the loading behaviour of external data.
     * @template T
     */ Pagination = /** @class */ (function () {
        /** You can init each Pagination instance with an optional config.
         * If no config is provided, it will default to ```{page: 1, size: 25}```. */
        function Pagination(config, total) {
            /**
             * Subject for tracking changes.
             */
            this.change = new rxjs.Subject();
            /**
             * Observable that is nexted when the pagination has changed.
             */
            this.change$ = this.change.asObservable();
            this.config = { page: 1, size: 25 };
            Object.assign(this.config, config);
            Object.assign(this.config, {
                availableSizes: Array.from(new Set([this.config.size]
                    .concat(this.config.availableSizes || [10, 25, 50, 100], [this.config.size])
                    .sort((function (a, b) { return a - b; }))))
            });
            if (total) {
                this.setTotal(total);
            }
        }
        /** Retrieves the current page */
        /**
         * Retrieves the current page
         * @return {?}
         */
        Pagination.prototype.getPage = /**
         * Retrieves the current page
         * @return {?}
         */
            function () {
                return this.config.page;
            };
        /** Retrieves the number of pages */
        /**
         * Retrieves the number of pages
         * @return {?}
         */
        Pagination.prototype.getPages = /**
         * Retrieves the number of pages
         * @return {?}
         */
            function () {
                return this.pages ? this.pages.length : 0;
            };
        /** Loads the next page. Throws error if already on last page. */
        /**
         * Loads the next page. Throws error if already on last page.
         * @return {?}
         */
        Pagination.prototype.next = /**
         * Loads the next page. Throws error if already on last page.
         * @return {?}
         */
            function () {
                if (this.isLast()) {
                    return; // already last page
                }
                this.config.page += 1;
                this.load();
            };
        /** Loads the previous page. Throws error if already on first page. */
        /**
         * Loads the previous page. Throws error if already on first page.
         * @return {?}
         */
        Pagination.prototype.prev = /**
         * Loads the previous page. Throws error if already on first page.
         * @return {?}
         */
            function () {
                if (this.isFirst()) {
                    return; // already first page
                }
                this.config.page -= 1;
                this.load();
            };
        /**
         * Sets the total number of items and calculcates the page count.
         * */
        /**
         * Sets the total number of items and calculcates the page count.
         *
         * @param {?} total
         * @return {?}
         */
        Pagination.prototype.setTotal = /**
         * Sets the total number of items and calculcates the page count.
         *
         * @param {?} total
         * @return {?}
         */
            function (total) {
                /* if (this.total !== total) {
                  this.change.next(this.config);
                } */
                this.total = total;
                this.pages = new Array(Math.ceil(this.total / this.config.size));
                if (this.config.page !== 1 && this.config.page > this.pages.length) {
                    this.config.page = this.pages.length || 1;
                    this.load();
                }
            };
        /** Merges config and fires next on change */
        /**
         * Merges config and fires next on change
         * @protected
         * @param {?=} config
         * @return {?}
         */
        Pagination.prototype.load = /**
         * Merges config and fires next on change
         * @protected
         * @param {?=} config
         * @return {?}
         */
            function (config) {
                if (config) {
                    Object.assign(this.config, config);
                }
                this.change.next(this.config);
            };
        /** Selects the given page number */
        /**
         * Selects the given page number
         * @param {?} page
         * @param {?=} silent
         * @return {?}
         */
        Pagination.prototype.select = /**
         * Selects the given page number
         * @param {?} page
         * @param {?=} silent
         * @return {?}
         */
            function (page, silent) {
                if (silent === void 0) {
                    silent = false;
                }
                if (page === this.config.page || silent) {
                    this.config.page = page;
                    return;
                }
                this.load({ page: page });
            };
        /** Loads the first Page */
        /**
         * Loads the first Page
         * @return {?}
         */
        Pagination.prototype.first = /**
         * Loads the first Page
         * @return {?}
         */
            function () {
                this.load({ page: 1 });
            };
        /** Loads the last page */
        /**
         * Loads the last page
         * @return {?}
         */
        Pagination.prototype.last = /**
         * Loads the last page
         * @return {?}
         */
            function () {
                if (!this.pages) {
                    throw new Error("Cannot load last page without knowing the item count.\n        Call setTotal(itemCount) before loading.");
                }
                this.load({ page: this.pages.length });
            };
        /** Returns true if the given page number is currently active.*/
        /**
         * Returns true if the given page number is currently active.
         * @param {?} page
         * @return {?}
         */
        Pagination.prototype.isActive = /**
         * Returns true if the given page number is currently active.
         * @param {?} page
         * @return {?}
         */
            function (page) {
                return this.config.page === page;
            };
        /** Returns true if the current page is the first one */
        /**
         * Returns true if the current page is the first one
         * @return {?}
         */
        Pagination.prototype.isFirst = /**
         * Returns true if the current page is the first one
         * @return {?}
         */
            function () {
                return this.config.page === 1;
            };
        /** Returns true if the current page is the last one */
        /**
         * Returns true if the current page is the last one
         * @return {?}
         */
        Pagination.prototype.isLast = /**
         * Returns true if the current page is the last one
         * @return {?}
         */
            function () {
                if (!this.pages) {
                    return true;
                }
                return this.config.page === this.pages.length;
            };
        /** slices a given array according to the current pagination state */
        /**
         * slices a given array according to the current pagination state
         * @param {?} items
         * @return {?}
         */
        Pagination.prototype.slice = /**
         * slices a given array according to the current pagination state
         * @param {?} items
         * @return {?}
         */
            function (items) {
                return items.slice((this.config.page - 1) * this.config.size, (this.config.page) * this.config.size);
            };
        /** Returns an object with all relevant infos about the current state of pagination */
        /**
         * Returns an object with all relevant infos about the current state of pagination
         * @return {?}
         */
        Pagination.prototype.params = /**
         * Returns an object with all relevant infos about the current state of pagination
         * @return {?}
         */
            function () {
                return {
                    page: this.getPage(),
                    pages: this.getPages(),
                    total: this.total,
                    from: (this.getPage() - 1) * this.config.size + 1,
                    to: Math.min(this.getPage() * this.config.size, this.total),
                    size: this.config.size,
                    availableSizes: this.config.availableSizes,
                };
            };
        /** updates the size of the pages.  */
        /**
         * updates the size of the pages.
         * @param {?} size
         * @return {?}
         */
        Pagination.prototype.updateSize = /**
         * updates the size of the pages.
         * @param {?} size
         * @return {?}
         */
            function (size) {
                if (!size) {
                    return;
                }
                this.load({ size: size, page: 1 });
            };
        return Pagination;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * Used for natural sorting of strings
     * @type {?}
     */
    var collator = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' });
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
    var Sorter = /** @class */ (function () {
        function Sorter() {
        }
        /** Returns the sorting algorithm for the given item array. */
        /**
         * Returns the sorting algorithm for the given item array.
         * @private
         * @param {?} items
         * @param {?=} property
         * @return {?}
         */
        Sorter.getAlgorithm = /**
         * Returns the sorting algorithm for the given item array.
         * @private
         * @param {?} items
         * @param {?=} property
         * @return {?}
         */
            function (items, property) {
                if (!items.length) {
                    return;
                }
                if (property && !items
                    .reduce(function (has, item) { return has && item.sort(property) !== undefined; }, true)) {
                    console.warn('cannot sort property "' + property + '" because not all items have that property', items);
                    return;
                }
                /** @type {?} */
                var types = items
                    .map(function (item) { return typeof item.sort(property); })
                    .filter(function (item, index, _items) { return _items.indexOf(item) === index; });
                if (types.length > 1) {
                    console.warn('cannot sort items because they contain multiple types:', types);
                    return;
                }
                if (!this.sortType[types[0]]) {
                    console.warn('cannot sort items because no algorithm was found for type', types[0]);
                    return;
                }
                return this.sortType[types[0]];
            };
        /** Sorts a given Array of items after a given property.
         * @param items Array of arbitrary content.
         * @param property Optional property to sort after (For Objects)
         * @param desc Optional Flag that will reverse sort the result (descending).
         * @param resolve Optional resolve function to expose relevant the part of object that contains
         *   the given property. */
        /**
         * Sorts a given Array of items after a given property.
         * @param {?} items Array of arbitrary content.
         * @param {?=} property Optional property to sort after (For Objects)
         * @param {?=} desc Optional Flag that will reverse sort the result (descending).
         * @return {?}
         */
        Sorter.sort = /**
         * Sorts a given Array of items after a given property.
         * @param {?} items Array of arbitrary content.
         * @param {?=} property Optional property to sort after (For Objects)
         * @param {?=} desc Optional Flag that will reverse sort the result (descending).
         * @return {?}
         */
            function (items, property, desc) {
                /** @type {?} */
                var algorithm = this.getAlgorithm(items, property);
                if (!algorithm) {
                    return;
                }
                items.sort(function (a, b) {
                    if (!property) {
                        return algorithm(a.resolve(), b.resolve());
                    }
                    return algorithm(a.sort(property), b.sort(property));
                });
                if (desc) {
                    items.reverse();
                }
            };
        /**
         * Contains sorting methods for different value types.
         */
        Sorter.sortType = {
            'string': sortString,
            'number': sortNumber,
            'boolean': sortBoolean
        };
        return Sorter;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * A more sophisticated Collection of Objects with arbitrary content.
     * It comes with features like resolve functions, identifiers, display formatting and sorting.
     * @template T
     */
    var /**
     * A more sophisticated Collection of Objects with arbitrary content.
     * It comes with features like resolve functions, identifiers, display formatting and sorting.
     * @template T
     */ List = /** @class */ (function (_super) {
        __extends(List, _super);
        /**
         * Constructs the List. Populates the items and instantiates the fields.
         */
        function List(values, config, pagination) {
            if (config === void 0) {
                config = {};
            }
            var _this = _super.call(this, []) || this;
            /**
             * Current Value Groups (Different Unique Values).
             */
            _this.groups = [];
            /**
             * The items of the current page
             */
            _this.page = [];
            /**
             * Subject that should be nexted when loading is finished
             */
            _this.change = new rxjs.Subject();
            /**
             * Observable that is nexted when the list has changed.
             */
            _this.change$ = _this.change.asObservable();
            if (values) {
                _super.prototype.addAll.call(_this, values.map(function (value) { return new Item(value, Object.assign({}, config)); }), false, false);
            }
            _this.config = Object.assign({ page: 1, maxColumns: 8 }, config || {});
            _this.fields = _this.getFields();
            _this.hideOverflowFields();
            _this.pagination = pagination || new Pagination(_this.config, _this.items.length);
            _this.change$.subscribe(function () {
                _this.pagination.select(_this.config.page || 1, true);
            });
            if (!pagination) { // load if no custom pagination was given
                _this.pagination.change$.pipe(operators.debounceTime(200))
                    .subscribe(function (_config) { return _this.load(_config); });
                _this.load();
            }
            return _this;
        }
        Object.defineProperty(List.prototype, "display", {
            /** Getter for items, calls transform */
            get: /**
             * Getter for items, calls transform
             * @return {?}
             */ function () {
                if (!this.config || !this.config.display) {
                    return this.items;
                }
                return this.config.display(this.items);
            },
            enumerable: true,
            configurable: true
        });
        /** Loads the list page with the given config or, if none given, uses the current config.
         * Reapplies grouping (if any) and calls the change Subject. */
        /**
         * Loads the list page with the given config or, if none given, uses the current config.
         * Reapplies grouping (if any) and calls the change Subject.
         * @param {?=} config
         * @return {?}
         */
        List.prototype.load = /**
         * Loads the list page with the given config or, if none given, uses the current config.
         * Reapplies grouping (if any) and calls the change Subject.
         * @param {?=} config
         * @return {?}
         */
            function (config) {
                if (config) {
                    Object.assign(this.config, config);
                }
                this.page = this.pagination.slice(this.items);
                this.groupBy(this.config.sortBy);
                this.change.next(this);
            };
        /** Adds the given item to the list and assigns the list config to the item*/
        /**
         * Adds the given item to the list and assigns the list config to the item
         * @param {?} item
         * @param {?=} unique
         * @param {?=} event
         * @return {?}
         */
        List.prototype.add = /**
         * Adds the given item to the list and assigns the list config to the item
         * @param {?} item
         * @param {?=} unique
         * @param {?=} event
         * @return {?}
         */
            function (item, unique, event) {
                if (event === void 0) {
                    event = true;
                }
                item.useConfig(this.config);
                return _super.prototype.add.call(this, item, unique, event);
            };
        /**
         * Distills Array of item properties. Either uses keys of config.fields or parses the item
         * properties directly.
         */
        /**
         * Distills Array of item properties. Either uses keys of config.fields or parses the item
         * properties directly.
         * @protected
         * @return {?}
         */
        List.prototype.getFields = /**
         * Distills Array of item properties. Either uses keys of config.fields or parses the item
         * properties directly.
         * @protected
         * @return {?}
         */
            function () {
                var _this = this;
                if (this.config && this.config.fields) {
                    return Object.keys(this.config.fields)
                        .filter(function (key) { return _this.config.fields[key].list !== false; })
                        .map(function (field) { return new Field(field, _this.config.fields[field]); });
                }
                /** @type {?} */
                var fields = [];
                this.items.forEach(function (item) {
                    item.getProperties().forEach(function (property) {
                        if (!fields.find(function (f) { return f.property === property; })) {
                            fields.push(new Field(property, { type: typeof item.resolve(property) }));
                        }
                    });
                });
                return fields;
            };
        /**
         * @param {?} field
         * @return {?}
         */
        List.prototype.toggleVisibility = /**
         * @param {?} field
         * @return {?}
         */
            function (field) {
                field.hideInList = !field.hideInList;
                this.change.next(this);
            };
        /** Sets all fields that exceed the maxColumns to hidden */
        /**
         * Sets all fields that exceed the maxColumns to hidden
         * @protected
         * @return {?}
         */
        List.prototype.hideOverflowFields = /**
         * Sets all fields that exceed the maxColumns to hidden
         * @protected
         * @return {?}
         */
            function () {
                var _this = this;
                if (this.config && this.config.maxColumns) {
                    this.fields.filter(function (f) { return !f.hideInList; }).forEach(function (field, index) {
                        if (index >= _this.config.maxColumns && field.hideInList === undefined) {
                            field.hideInList = true;
                        }
                    });
                }
            };
        /**
         * Resolves the item with the given Array index or identifier (if configured)
         */
        /**
         * Resolves the item with the given Array index or identifier (if configured)
         * @param {?} identifier
         * @return {?}
         */
        List.prototype.id = /**
         * Resolves the item with the given Array index or identifier (if configured)
         * @param {?} identifier
         * @return {?}
         */
            function (identifier) {
                if (identifier === undefined) {
                    throw new Error("cannot get item with identifier \"" + identifier + "\"");
                }
                return this.items.find(function (item, key) {
                    if (!item.config.identifier) {
                        return false;
                    }
                    return item.id() === identifier;
                }) || this.items[identifier];
            };
        /** Filters the list after the given property and value */
        /**
         * Filters the list after the given property and value
         * @param {?} property
         * @param {?=} value
         * @param {?=} operator
         * @return {?}
         */
        List.prototype.filter = /**
         * Filters the list after the given property and value
         * @param {?} property
         * @param {?=} value
         * @param {?=} operator
         * @return {?}
         */
            function (property, value, operator) {
                if (value === void 0) {
                    value = '';
                }
                if (operator === void 0) {
                    operator = 'exact';
                }
                var _a;
                this.config.filter = (_a = {}, _a[property] = value, _a);
                if (value === null) {
                    this.load();
                    return;
                    // this.page = [].concat(this.items);
                }
                // TODO find way to filter with pagination and without loosing filtered out items
                this.page = this.items.filter(function (item) {
                    return item.resolve(property).toLowerCase().includes(value.toLowerCase()); // TODO: better filter
                }).slice(0, this.config.size || 100);
            };
        /** Clears the filter for given property or all properties if none given. */
        /**
         * Clears the filter for given property or all properties if none given.
         * @param {?=} property
         * @return {?}
         */
        List.prototype.clearFilter = /**
         * Clears the filter for given property or all properties if none given.
         * @param {?=} property
         * @return {?}
         */
            function (property) {
                if (property) {
                    return this.filter(property, null);
                }
                this.load({
                    page: 1,
                    filter: {}
                });
            };
        /** Helper function. Returns true if the given query value is empty (also recognizes empty array) */
        /**
         * Helper function. Returns true if the given query value is empty (also recognizes empty array)
         * @param {?} query
         * @return {?}
         */
        List.prototype.isEmptyFilter = /**
         * Helper function. Returns true if the given query value is empty (also recognizes empty array)
         * @param {?} query
         * @return {?}
         */
            function (query) {
                return query === '' ||
                    query === null ||
                    query === undefined ||
                    (Array.isArray(query) && !query.length);
            };
        /** Returns true if the given property has a filter set. If no property is given it returns true when no property has a filter. */
        /**
         * Returns true if the given property has a filter set. If no property is given it returns true when no property has a filter.
         * @param {?=} property
         * @return {?}
         */
        List.prototype.isFiltered = /**
         * Returns true if the given property has a filter set. If no property is given it returns true when no property has a filter.
         * @param {?=} property
         * @return {?}
         */
            function (property) {
                var _this = this;
                if (!this.config.filter) {
                    return false;
                }
                if (!property) {
                    return Object.keys(this.config.filter)
                        .filter(function (key) { return !_this.isEmptyFilter(_this.config.filter[key]); })
                        .length > 0;
                }
                return !this.isEmptyFilter(this.config.filter[property]);
            };
        /** Returns the filter */
        /**
         * Returns the filter
         * @param {?=} property
         * @return {?}
         */
        List.prototype.getFilterValue = /**
         * Returns the filter
         * @param {?=} property
         * @return {?}
         */
            function (property) {
                if (!property) {
                    property = this.config.label;
                }
                if (!this.config.filter || !property) {
                    return undefined;
                }
                return this.config.filter[property];
            };
        /** Changes the config's sort variables to reflect the given sorting */
        /**
         * Changes the config's sort variables to reflect the given sorting
         * @protected
         * @param {?} property
         * @param {?=} desc
         * @return {?}
         */
        List.prototype.sortProperty = /**
         * Changes the config's sort variables to reflect the given sorting
         * @protected
         * @param {?} property
         * @param {?=} desc
         * @return {?}
         */
            function (property, desc) {
                if (property !== this.config.sortBy) {
                    delete this.config.desc;
                    this.config.sortBy = property;
                }
                else if (this.config.desc) {
                    delete this.config.sortBy;
                }
                this.config.desc = this.config.desc === undefined ? desc || false : !this.config.desc;
            };
        /** Returns true if the given sort state is active. You can either just check for a property + desc flag */
        /**
         * Returns true if the given sort state is active. You can either just check for a property + desc flag
         * @param {?} property
         * @param {?=} desc
         * @return {?}
         */
        List.prototype.isSorted = /**
         * Returns true if the given sort state is active. You can either just check for a property + desc flag
         * @param {?} property
         * @param {?=} desc
         * @return {?}
         */
            function (property, desc) {
                if (typeof desc === 'undefined') {
                    return this.config.sortBy === property;
                }
                return this.config.sortBy === property && this.config.desc === desc;
            };
        /** Sorts with given sorting, using the Sorter */
        /**
         * Sorts with given sorting, using the Sorter
         * @param {?} property
         * @param {?=} desc
         * @return {?}
         */
        List.prototype.toggleSort = /**
         * Sorts with given sorting, using the Sorter
         * @param {?} property
         * @param {?=} desc
         * @return {?}
         */
            function (property, desc) {
                this.sortProperty(property, desc);
                Sorter.sort(this.items, property, this.config.desc);
                this.load(this.config);
            };
        /** Toggles selectMode of list config */
        /**
         * Toggles selectMode of list config
         * @return {?}
         */
        List.prototype.toggleSelectMode = /**
         * Toggles selectMode of list config
         * @return {?}
         */
            function () {
                this.config = Object.assign({}, this.config, {
                    selectMode: !this.config.selectMode
                });
                this.change.next(this);
            };
        /** Returns an Array of all unique values of the given property */
        /**
         * Returns an Array of all unique values of the given property
         * @param {?} property
         * @return {?}
         */
        List.prototype.groupBy = /**
         * Returns an Array of all unique values of the given property
         * @param {?} property
         * @return {?}
         */
            function (property) {
                var _this = this;
                delete this.groups;
                /** @type {?} */
                var page = this.pagination ? this.pagination.getPage() : 0;
                if (!property || !this.config.fields || !this.config.fields[property] || !this.config.fields[property].group) {
                    this.groups = [{
                            page: page,
                            sortBy: this.config.sortBy,
                            desc: this.config.desc
                        }];
                    return;
                }
                /** @type {?} */
                var groups = [];
                this.page.forEach(function (item) {
                    /** @type {?} */
                    var value = item.group(property);
                    if (!groups.find(function (g) { return g.value === value; })) {
                        groups.push({
                            value: value,
                            page: page,
                            property: _this.config.sortBy,
                            desc: _this.config.desc
                        });
                    }
                });
                this.groups = groups;
            };
        /** Item tracking for *ngFor. */
        /**
         * Item tracking for *ngFor.
         * @param {?} index
         * @param {?} item
         * @return {?}
         */
        List.prototype.trackItem = /**
         * Item tracking for *ngFor.
         * @param {?} index
         * @param {?} item
         * @return {?}
         */
            function (index, item) {
                return index;
            };
        /** Returns an array of all sortable fields */
        /**
         * Returns an array of all sortable fields
         * @return {?}
         */
        List.prototype.sortableFields = /**
         * Returns an array of all sortable fields
         * @return {?}
         */
            function () {
                return this.fields.filter(function (field) { return field.sortable; });
            };
        /** Returns true if the given field index in the visible fields is higher than maxColumns.  */
        /**
         * Returns true if the given field index in the visible fields is higher than maxColumns.
         * @param {?} field
         * @return {?}
         */
        List.prototype.isOverTheMax = /**
         * Returns true if the given field index in the visible fields is higher than maxColumns.
         * @param {?} field
         * @return {?}
         */
            function (field) {
                return this.fields.filter(function (f) { return !f.hideInList; }).indexOf(field) >= this.config.maxColumns;
            };
        return List;
    }(Collection));

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
    var /**
     * Extension of List that keeps track of selected items. It can keep track of items via identifier
     * property even if the object references are being replaced, e.g. when reloading a set if items.
     * It supports solo and multiple selection.
     * @template T
     */ Selection = /** @class */ (function (_super) {
        __extends(Selection, _super);
        function Selection() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /** Adds item to selection. If solo is true, all other items will be removed. */
        /**
         * Adds item to selection. If solo is true, all other items will be removed.
         * @param {?} item
         * @param {?=} solo
         * @return {?}
         */
        Selection.prototype.select = /**
         * Adds item to selection. If solo is true, all other items will be removed.
         * @param {?} item
         * @param {?=} solo
         * @return {?}
         */
            function (item, solo) {
                if (solo === void 0) {
                    solo = this.config.solo;
                }
                if (solo) {
                    this.removeAll();
                    this.add(item);
                }
                else {
                    this.add(item, true);
                }
            };
        /** Returns the index of the given item or an item that has the same identifier or value. */
        /**
         * Returns the index of the given item or an item that has the same identifier or value.
         * @param {?} item
         * @return {?}
         */
        Selection.prototype.index = /**
         * Returns the index of the given item or an item that has the same identifier or value.
         * @param {?} item
         * @return {?}
         */
            function (item) {
                if (this.config.identifier) {
                    return this.items.indexOf(this.id(item.resolve(this.config.identifier)));
                }
                return this.items.indexOf(this.items.find(function (i) { return i.resolve() === item.resolve(); }));
            };
        /**
         * @param {?} item
         * @return {?}
         */
        Selection.prototype.has = /**
         * @param {?} item
         * @return {?}
         */
            function (item) {
                return _super.prototype.has.call(this, item) || this.index(item) !== -1;
            };
        /** Toggle item in and out of selection.
         * The solo property will change the behaviour like you would expect it to behave :) */
        /**
         * Toggle item in and out of selection.
         * The solo property will change the behaviour like you would expect it to behave :)
         * @param {?} item
         * @param {?=} solo
         * @param {?=} event
         * @return {?}
         */
        Selection.prototype.toggle = /**
         * Toggle item in and out of selection.
         * The solo property will change the behaviour like you would expect it to behave :)
         * @param {?} item
         * @param {?=} solo
         * @param {?=} event
         * @return {?}
         */
            function (item, solo, event) {
                if (solo === void 0) {
                    solo = this.config.solo;
                }
                if (event === void 0) {
                    event = true;
                }
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
            };
        /** Toggle multiple items. You can control if the items should be kept, flipped, or be kept unique*/
        /**
         * Toggle multiple items. You can control if the items should be kept, flipped, or be kept unique
         * @template THIS
         * @this {THIS}
         * @param {?} items
         * @param {?=} flip
         * @param {?=} keep
         * @return {THIS}
         */
        Selection.prototype.toggleAll = /**
         * Toggle multiple items. You can control if the items should be kept, flipped, or be kept unique
         * @template THIS
         * @this {THIS}
         * @param {?} items
         * @param {?=} flip
         * @param {?=} keep
         * @return {THIS}
         */
            function (items, flip, keep) {
                var _this = this;
                items = items || [];
                // items = Array.isArray(items) ? items : [items];
                if (!flip && !keep && ( /** @type {?} */(this)).hasAll(items)) {
                    ( /** @type {?} */(this)).removeAll(items);
                    return ( /** @type {?} */(this));
                }
                items.forEach(function (item) {
                    if (flip) {
                        ( /** @type {?} */(_this)).toggle(item, ( /** @type {?} */(_this)).config.solo, false);
                    }
                    else if (!( /** @type {?} */(_this)).hasAll(items)) {
                        ( /** @type {?} */(_this)).add(item, true, false);
                    }
                });
                ( /** @type {?} */(this)).update.next(( /** @type {?} */(this)));
                return ( /** @type {?} */(this));
            };
        /** Flips all items. */
        /**
         * Flips all items.
         * @template THIS
         * @this {THIS}
         * @param {?} items
         * @return {THIS}
         */
        Selection.prototype.flipAll = /**
         * Flips all items.
         * @template THIS
         * @this {THIS}
         * @param {?} items
         * @return {THIS}
         */
            function (items) {
                return ( /** @type {?} */(this)).toggleAll(items, true);
            };
        /** Returns an Array containing the current value. If an identifier is set, the array will consist of the identifier values,
         * if not, it will resolve the item contents. */
        /**
         * Returns an Array containing the current value. If an identifier is set, the array will consist of the identifier values,
         * if not, it will resolve the item contents.
         * @param {?=} solo
         * @return {?}
         */
        Selection.prototype.getValue = /**
         * Returns an Array containing the current value. If an identifier is set, the array will consist of the identifier values,
         * if not, it will resolve the item contents.
         * @param {?=} solo
         * @return {?}
         */
            function (solo) {
                var _this = this;
                if (solo === void 0) {
                    solo = this.config.solo;
                }
                /** @type {?} */
                var value = this.items.map(function (item) { return _this.config.identifier ? item.id() : item.resolve(); });
                if (solo) {
                    return value.length ? value[0] : null;
                }
                return value;
            };
        return Selection;
    }(List));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    exports.Collection = Collection;
    exports.Field = Field;
    exports.Config = Config;
    exports.Form = Form;
    exports.Item = Item;
    exports.List = List;
    exports.Pagination = Pagination;
    exports.Selection = Selection;
    exports.sortString = sortString;
    exports.sortNumber = sortNumber;
    exports.sortBoolean = sortBoolean;
    exports.Sorter = Sorter;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=ec.components-core.umd.js.map