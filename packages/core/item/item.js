"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** An Item basically wraps an Object and provides a config with metadata and helper methods to access the object. */
var Item = /** @class */ (function () {
    /** Each item is constructed with its body and an optional config. */
    function Item(body, config) {
        this.body = body;
        this.config = config || this.generateConfig();
    }
    /** Generates a config from the body by setting view to the properties type. */
    Item.prototype.generateConfig = function () {
        var _this = this;
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
    Item.prototype.getBody = function () {
        return this.body;
    };
    /** Returns true if the body is defined and not null*/
    Item.prototype.hasBody = function () {
        return this.body !== undefined && this.body !== null;
    };
    /** deletes the item body */
    Item.prototype.clear = function () {
        delete this.body;
    };
    /** Assigns the given config to the existing via Object.assign */
    Item.prototype.useConfig = function (config) {
        Object.assign(this.config, config);
    };
    /** Returns the item's config */
    Item.prototype.getConfig = function () {
        return this.config;
    };
    /** Returns an Array of properties possessed by the body. */
    Item.prototype.getProperties = function () {
        if (!this.body || typeof this.body !== 'object') {
            if (typeof this.body !== 'object') {
                return [this.config && this.config.title ? this.config.title : 'body'];
            }
            return [];
        }
        return Object.keys(this.body);
    };
    /** Returns the value of the the Item's identifier property. */
    Item.prototype.id = function () {
        if (!this.config.identifier) {
            throw new Error('cannot get id of item without identifier!');
        }
        return this.resolve(this.config.identifier);
    };
    /** Returns either the whole body (if no property is given) or the value of the given property.
     * This method will traverse the body via the config.resolve function (if given). */
    Item.prototype.resolve = function (property) {
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
        var v = this.config.resolve(this.body);
        return v ? v[property] : null;
    };
    /** The main method for transformation functions like resolve, display and group.
     * If you dont set the third parameter, the current item value will be used.
     * The third parameter can be used to transform a value that is not yet possesed (e.g. to
     * serialize) */
    Item.prototype.transform = function (action, property, value) {
        if (value === void 0) { value = this.resolve(property); }
        if (!this.hasBody()) {
            return;
        }
        if (this.config.fields && this.config.fields[property] && this.config.fields[property][action]) {
            return this.config.fields[property][action](value, this.body, property);
        }
        return value;
    };
    /** Returns the output of the config.group transformation function with the given property value.
     * If no group function is set, it will just return the property value.*/
    Item.prototype.group = function (property) {
        return this.transform('group', property);
    };
    /** Returns the output of the config.display transformation function with the given property value.
     * If no display function is set, it will just return the property value.*/
    Item.prototype.display = function (property) {
        if (!property) {
            return this.transform('display', this.config.label || this.getProperties()[0]); // Object.keys(this.resolve())[0]
        }
        return this.transform('display', property);
    };
    /** Transforms the given field's value for sorting */
    Item.prototype.sort = function (property) {
        return this.transform('sort', property);
    };
    /** Returns value with all readOnly properties removed */
    Item.prototype.pickWriteOnly = function (value) {
        var _this = this;
        if (value === void 0) { value = this.body; }
        return Object.assign.apply(Object, [{}].concat(Object.keys(value)
            .map(function (property) {
            if (_this.config.fields[property].readOnly) {
                return;
            }
            return _a = {}, _a[property] = value[property], _a;
            var _a;
        }).filter(function (v) { return !!v; })));
    };
    /** Transforms the given field's value for serialization when saving. */
    Item.prototype.serialize = function (value, put) {
        var _this = this;
        if (put === void 0) { put = false; }
        if (put) {
            value = this.pickWriteOnly(value);
        }
        /** Run the remaining properties through serializers */
        Object.keys(value).map(function (property) {
            Object.assign(value, (_a = {},
                _a[property] = _this.transform('serialize', property, value[property]),
                _a));
            var _a;
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
    Item.prototype.save = function (value) {
        var _this = this;
        if (value === void 0) { value = this.body; }
        if (this.config.onSave) {
            return Promise.resolve(this.config.onSave(this, value))
                .then(function (_value) {
                _this.body = _value;
                return _this;
            });
        }
        Object.assign(this.resolve() || {}, value);
        // Object.assign(this.resolve() || {}, this.serialize(value));
        return Promise.resolve(this);
    };
    return Item;
}());
exports.Item = Item;
