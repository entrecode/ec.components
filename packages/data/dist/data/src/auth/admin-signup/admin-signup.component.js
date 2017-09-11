"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const forms_1 = require("@angular/forms");
const email_available_validator_1 = require("../email-available.validator");
const rxjs_1 = require("rxjs");
const admin_service_1 = require("../../sdk/admin.service");
class AdminSignupComponent {
    constructor(fb, admin) {
        this.fb = fb;
        this.admin = admin;
        this.success = new core_1.EventEmitter();
        this.error = new core_1.EventEmitter();
    }
    ngOnInit() {
        this.signup = this.fb.group({
            email: ['', [forms_1.Validators.required, email_available_validator_1.emailAvailable]],
            password: ['', [forms_1.Validators.required]],
        });
    }
    showError(err) {
        this.errorMessage = err.message;
        this.error.emit(err);
        rxjs_1.Observable.throw(err);
    }
    onSubmit() {
        this.submitted = true;
        if (!this.signup.valid) {
            return;
        }
        this.admin.signup(this.signup.value).then((token) => {
            this.signup.reset();
            this.success.emit();
        });
        //TODO error handling etc
    }
}
AdminSignupComponent.decorators = [
    { type: core_1.Component, args: [{
                selector: 'ec-auth-admin-signup',
                template: require('./admin-signup.component.html'),
                styles: [require('./admin-signup.component.scss')]
            },] },
];
/** @nocollapse */
AdminSignupComponent.ctorParameters = () => [
    { type: forms_1.FormBuilder, },
    { type: admin_service_1.AdminService, },
];
AdminSignupComponent.propDecorators = {
    'success': [{ type: core_1.Output },],
    'error': [{ type: core_1.Output },],
};
exports.AdminSignupComponent = AdminSignupComponent;
//# sourceMappingURL=admin-signup.component.js.map