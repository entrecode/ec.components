"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const forms_1 = require("@angular/forms");
const rxjs_1 = require("rxjs");
const ui_1 = require("@ec.components/ui");
const sdk_service_1 = require("../../sdk/sdk.service");
class PublicLoginComponent {
    constructor(fb, sdk) {
        this.fb = fb;
        this.sdk = sdk;
        this.success = new core_1.EventEmitter();
        this.error = new core_1.EventEmitter();
    }
    ngOnInit() {
        this.login = this.fb.group({
            email: ['', [forms_1.Validators.required, ui_1.FieldValidators.email]],
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
        this.sdk.login(this.login.value)
            .then((res) => {
            this.login.reset();
            this.success.emit();
        });
    }
}
PublicLoginComponent.decorators = [
    { type: core_1.Component, args: [{
                selector: 'ec-auth-public-login',
                templateUrl: './public-login.component.html',
                styleUrls: ['./public-login.component.scss']
            },] },
];
/** @nocollapse */
PublicLoginComponent.ctorParameters = () => [
    { type: forms_1.FormBuilder, },
    { type: sdk_service_1.SdkService, },
];
PublicLoginComponent.propDecorators = {
    'success': [{ type: core_1.Output },],
    'error': [{ type: core_1.Output },],
};
exports.PublicLoginComponent = PublicLoginComponent;
//# sourceMappingURL=public-login.component.js.map