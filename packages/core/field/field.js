"use strict";
/** A Field acts as a property of an Item. It holds a single Property config. */
Object.defineProperty(exports, "__esModule", { value: true });
var Field = /** @class */ (function () {
    /** A Field is constructed by assigning the given config and the property to itself*/
    function Field(property, config) {
        if (config) {
            Object.assign(this, config);
        }
        Object.assign(this, { property: property });
    }
    /** Returns placeholder if any */
    Field.prototype.getPlaceholder = function () {
        return this.placeholder || this.label || this.property;
    };
    return Field;
}());
exports.Field = Field;
