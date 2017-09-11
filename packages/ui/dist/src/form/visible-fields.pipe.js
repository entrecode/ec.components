"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
/** The VisibleFieldsPipe filters an array of Fields to only give back the ones that have form NOT set to false. */
class VisibleFieldsPipe {
    /** Filters out all fields that should not be displayed in a regular form */
    transform(fields) {
        return fields.filter((field) => {
            return field.form !== false;
        });
    }
}
VisibleFieldsPipe.decorators = [
    { type: core_1.Pipe, args: [{
                name: 'visibleFields'
            },] },
];
/** @nocollapse */
VisibleFieldsPipe.ctorParameters = () => [];
exports.VisibleFieldsPipe = VisibleFieldsPipe;
//# sourceMappingURL=visible-fields.pipe.js.map