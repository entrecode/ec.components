"use strict";
/** A Form is an extension of an Item. In advance to an Item it will create an Array of fields that is either extracted from config.fields or directly from the item body.*/
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var item_1 = require("../item/item");
var field_1 = require("../field/field");
/** The Form class is an Item with additional info about its properties (Fields). */
var Form = /** @class */ (function (_super) {
    __extends(Form, _super);
    /** The constructor will populate the fields array.
     * If config.fields is set only the configured fields will be created.
     * If not, all properties of the given body will be used as fields. */
    function Form(body, config) {
        var _this = _super.call(this, body, config) || this;
        _this.fields = [];
        Object.keys(_this.config.fields)
            .forEach(function (property) {
            _this.fields.push(new field_1.Field(property, _this.config.fields[property]));
        });
        return _this;
    }
    /** returns the field instance of the given property */
    Form.prototype.getField = function (property) {
        return this.fields.find(function (field) { return field.property === property; });
    };
    /** Returns the original value of the property, if any. */
    Form.prototype.getValue = function (property) {
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
    return Form;
}(item_1.Item));
exports.Form = Form;
