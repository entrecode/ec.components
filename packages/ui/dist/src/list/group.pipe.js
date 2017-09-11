"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
/** The GroupPipe filters an array of Item instances by a given property value.
 * It is meant to be used to get only the items with the exact same value. */
class GroupPipe {
    transform(items, property, value) {
        if (!property) {
            return items;
        }
        return items.filter((item) => {
            return item.group(property) === value;
        });
    }
}
GroupPipe.decorators = [
    { type: core_1.Pipe, args: [{
                name: 'group'
            },] },
];
/** @nocollapse */
GroupPipe.ctorParameters = () => [];
exports.GroupPipe = GroupPipe;
//# sourceMappingURL=group.pipe.js.map