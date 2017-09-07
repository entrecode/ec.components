"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//taken from
// http://stackoverflow.com/questions/33866824/angular2-control-validation-on-blur/41973780#41973780
//check https://github.com/angular/angular/issues/7113
const core_1 = require("@angular/core");
const forms_1 = require("@angular/forms");
class ValidationOnBlurDirective {
    constructor(formControl) {
        this.formControl = formControl;
    }
    onFocus($event) {
        this.wasChanged = false;
        this.validators = this.formControl.control.validator;
        this.asyncValidators = this.formControl.control.asyncValidator;
        this.formControl.control.clearAsyncValidators();
        this.formControl.control.clearValidators();
    }
    onKeyup($event) {
        this.wasChanged = true; // keyboard change
    }
    onChange($event) {
        this.wasChanged = true; // copypaste change
    }
    onNgModelChange($event) {
        this.wasChanged = true; // ng-value change
    }
    onBlur($event) {
        this.formControl.control.setAsyncValidators(this.asyncValidators);
        this.formControl.control.setValidators(this.validators);
        if (this.wasChanged) {
            this.formControl.control.updateValueAndValidity();
        }
    }
}
ValidationOnBlurDirective.decorators = [
    { type: core_1.Directive, args: [{
                selector: '[validate-onblur]',
                host: {
                    '(focus)': 'onFocus($event)',
                    '(blur)': 'onBlur($event)',
                    '(keyup)': 'onKeyup($event)',
                    '(change)': 'onChange($event)',
                    '(ngModelChange)': 'onNgModelChange($event)'
                }
            },] },
];
/** @nocollapse */
ValidationOnBlurDirective.ctorParameters = () => [
    { type: forms_1.NgControl, },
];
exports.ValidationOnBlurDirective = ValidationOnBlurDirective;
//# sourceMappingURL=validate-onblur.js.map