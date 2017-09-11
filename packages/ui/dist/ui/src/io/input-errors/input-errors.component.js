"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const input_errors_1 = require("./input-errors");
/** This component keeps track of a form control's errors and displays them. It is meant to be used beneath a form control. */
class InputErrorsComponent {
    constructor() {
        /** Imported error messages. */
        this.errors = input_errors_1.errors;
    }
    /** This method will iterate over the control errors and generate objects for the template. */
    getErrors() {
        return Object.keys(this.control.errors).reduce((errs, key) => {
            let message;
            if (key === 'custom') {
                message = this.control.errors[key];
            }
            else {
                message = input_errors_1.errors[key] || 'Ungültige Eingabe';
            }
            errs.push({
                key: key,
                error: this.control.errors[key],
                message
            });
            return errs;
        }, []);
    }
}
InputErrorsComponent.decorators = [
    { type: core_1.Component, args: [{
                selector: 'ec-input-errors',
                template: require('./input-errors.component.html'),
                styles: [require('./input-errors.component.scss')]
            },] },
];
/** @nocollapse */
InputErrorsComponent.ctorParameters = () => [];
InputErrorsComponent.propDecorators = {
    'control': [{ type: core_1.Input },],
};
exports.InputErrorsComponent = InputErrorsComponent;
//# sourceMappingURL=input-errors.component.js.map