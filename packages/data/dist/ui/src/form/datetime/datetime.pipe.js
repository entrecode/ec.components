"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const moment = require("moment");
/** The GroupPipe filters an array of Item instances by a given property value.
 * It is meant to be used to get only the items with the exact same value. */
class DatetimePipe {
    transform(value, pattern = 'DD.MM.YYYY', raw) {
        if (!value) {
            return '';
        }
        if (raw) {
            console.log('raw', raw);
        }
        const typed = moment(value, pattern, true);
        if (!typed.isValid()) {
            return '';
        }
        if (Array.isArray(pattern)) {
            pattern = pattern[0];
        }
        return moment(value).format(pattern);
    }
}
DatetimePipe.decorators = [
    { type: core_1.Pipe, args: [{
                name: 'datetime'
            },] },
];
/** @nocollapse */
DatetimePipe.ctorParameters = () => [];
exports.DatetimePipe = DatetimePipe;
//# sourceMappingURL=datetime.pipe.js.map