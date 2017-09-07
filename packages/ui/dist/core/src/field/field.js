"use strict";
/** A Field acts as a property of an Item. It holds a single Property config. */
Object.defineProperty(exports, "__esModule", { value: true });
class Field {
    /** A Field is constructed by assigning the given config and the property to itself*/
    constructor(property, config = {}) {
        Object.assign(this, config);
        Object.assign(this, { property: property });
    }
    /** Returns placeholder if any */
    getPlaceholder() {
        return this.placeholder || this.label || this.property;
    }
}
exports.Field = Field;
//# sourceMappingURL=field.js.map