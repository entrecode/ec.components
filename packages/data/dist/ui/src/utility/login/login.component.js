"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const forms_1 = require("@angular/forms");
const Observable_1 = require("rxjs/Observable");
const field_validators_1 = require("../validators/field-validators");
/** Login Form Component with validation. Fires success event with credentials on submit. */
class LoginComponent {
    /** Injects the FormBuilder*/
    constructor(fb) {
        this.fb = fb;
        /** Event that emits on succesful submit of the form, passing the login credentials. */
        this.success = new core_1.EventEmitter();
        /** Event that emits when calling showError. */
        this.error = new core_1.EventEmitter();
    }
    /** Initializes the form */
    ngOnInit() {
        this.form = this.fb.group({
            email: ['', [forms_1.Validators.required, field_validators_1.FieldValidators.email]],
            password: ['', [forms_1.Validators.required]],
        });
    }
    /** Shows the given error in the form. Clears the password field and emits the error event. */
    showError(err) {
        this.errorMessage = err.message;
        this.form.get('password').setValue('');
        this.error.emit(err);
        Observable_1.Observable.throw(err);
    }
    /** Method that is meant to be overwritten by a subclass to communicate with an API. */
    login(value) {
        return Promise.resolve(value);
    }
    /** Is called when the form has been successfully submitted. Calls login and resets the form after. */
    onSubmit() {
        this.submitted = true;
        delete this.errorMessage;
        if (!this.form.valid) {
            return;
        }
        const login = this.login(this.form.value)
            .then((res) => {
            this.form.reset();
            this.success.emit(res);
        });
        if (this.loader) {
            this.loader.wait(login);
        }
    }
}
LoginComponent.decorators = [
    { type: core_1.Component, args: [{
                selector: 'ec-login',
                template: require('./login.component.html'),
                styles: [require('./login.component.scss')]
            },] },
];
/** @nocollapse */
LoginComponent.ctorParameters = () => [
    { type: forms_1.FormBuilder, },
];
LoginComponent.propDecorators = {
    'success': [{ type: core_1.Output },],
    'error': [{ type: core_1.Output },],
    'loader': [{ type: core_1.Input },],
};
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map