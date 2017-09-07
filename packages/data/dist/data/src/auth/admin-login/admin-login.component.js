"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const forms_1 = require("@angular/forms");
const rxjs_1 = require("rxjs");
const admin_service_1 = require("../../sdk/admin.service");
const field_validators_1 = require("@ec.components/ui/src/utility/validators/field-validators");
class AdminLoginComponent {
    constructor(fb, admin) {
        this.fb = fb;
        this.admin = admin;
        this.success = new core_1.EventEmitter();
        this.error = new core_1.EventEmitter();
    }
    ngOnInit() {
        this.login = this.fb.group({
            email: ['', [forms_1.Validators.required, field_validators_1.FieldValidators.email]],
            password: ['', [forms_1.Validators.required]],
        });
    }
    showError(err) {
        this.errorMessage = err.message;
        this.login.get('password').setValue('');
        this.error.emit(err);
        rxjs_1.Observable.throw(err);
    }
    onSubmit() {
        this.submitted = true;
        delete this.errorMessage;
        if (!this.login.valid) {
            return;
        }
        this.admin.login(this.login.value).then((token) => {
            console.log(token);
            this.login.reset();
            this.success.emit();
        });
    }
}
AdminLoginComponent.decorators = [
    { type: core_1.Component, args: [{
                selector: 'ec-auth-admin-login',
                templateUrl: './admin-login.component.html',
                styleUrls: ['./admin-login.component.scss']
            },] },
];
/** @nocollapse */
AdminLoginComponent.ctorParameters = () => [
    { type: forms_1.FormBuilder, },
    { type: admin_service_1.AdminService, },
];
AdminLoginComponent.propDecorators = {
    'success': [{ type: core_1.Output },],
    'error': [{ type: core_1.Output },],
};
exports.AdminLoginComponent = AdminLoginComponent;
//# sourceMappingURL=admin-login.component.js.map