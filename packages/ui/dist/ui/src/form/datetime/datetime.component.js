"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const forms_1 = require("@angular/forms");
const moment = require("moment");
/** Input for a datetime. */
class DatetimeComponent {
    /** The constructor gets the weekdays for the calendar header and instantiates the allowed input patterns.*/
    constructor() {
        /** The current value of the input */
        this.value = '';
        /** The input's placeholder */
        this.placeholder = '';
        /** Allowed date input patterns. The first one will be standard. */
        this.patterns = ['DD.MM.YYYY', 'DD.MM', 'DD.MM.YY', 'MM-DD-YYYY', 'YYYY-MM-DD', 'YYYY-MM-DD'];
        /** Sets the input format of the time */
        this.timeFormat = 'HH:mm';
        /** Change propagation for ControlValueAccessor */
        this.propagateChange = (_) => {
        };
        this.weekdays = moment.weekdaysMin(true);
        if (!this.disableTime) {
            this.patterns = this.patterns.map((pattern) => {
                return pattern + ' ' + this.timeFormat;
            }).concat(this.patterns);
        }
    }
    getPattern(moment) {
        const format = moment.creationData().format;
        if (this.patterns.indexOf(format) !== -1) {
            return format;
        }
        return this.patterns[0];
    }
    /** Updates the value with the given moment and propagates the change. */
    select(selected) {
        this.value = selected.format(this.getPattern(selected));
        this.propagateChange(selected.toISOString() || 'invalid');
        // this.propagateChange(selected.toDate());
    }
    /** Called upon input value change by the user. */
    input(e) {
        const value = e.target.value;
        this.value = value;
        const typed = moment(value, this.patterns, true);
        if (typed.isValid()) {
            this.calendar.selectDay(typed);
        }
        else if (value === '') {
            this.calendar.clearSelection();
            this.propagateChange(null);
        }
        else {
            // this.propagateChange(typed.toDate());
            this.propagateChange(typed.toISOString() || 'invalid');
        }
    }
    /** Selects the given Date when the model changes. */
    writeValue(value) {
        if (!value) {
            return '';
        }
        const date = moment(value);
        if (!date.isValid()) {
            console.warn('written model value is not valid', date);
            return;
        }
        this.value = date.format(this.patterns[0]) || '';
        this.calendar.selectDay(moment(value));
    }
    /** registerOnChange implementation of ControlValueAccessor */
    registerOnChange(fn) {
        this.propagateChange = fn;
    }
    /** registerOnTouched implementation of ControlValueAccessor */
    registerOnTouched() {
    }
}
DatetimeComponent.decorators = [
    { type: core_1.Component, args: [{
                selector: 'ec-datetime',
                templateUrl: 'datetime.component.html',
                styleUrls: ['datetime.component.scss'],
                providers: [
                    {
                        provide: forms_1.NG_VALUE_ACCESSOR,
                        useExisting: core_1.forwardRef(() => DatetimeComponent),
                        multi: true
                    }
                ]
            },] },
];
/** @nocollapse */
DatetimeComponent.ctorParameters = () => [];
DatetimeComponent.propDecorators = {
    'date': [{ type: core_1.Input },],
    'formControl': [{ type: core_1.Input },],
    'calendar': [{ type: core_1.ViewChild, args: ['calendar',] },],
    'pop': [{ type: core_1.ViewChild, args: ['calendarPop',] },],
    'placeholder': [{ type: core_1.Input },],
    'disableTime': [{ type: core_1.Input },],
};
exports.DatetimeComponent = DatetimeComponent;
//# sourceMappingURL=datetime.component.js.map