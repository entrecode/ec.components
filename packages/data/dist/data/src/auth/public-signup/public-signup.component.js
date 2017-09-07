"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const forms_1 = require("@angular/forms");
const rxjs_1 = require("rxjs");
const public_service_1 = require("../../sdk/public.service");
const field_validators_1 = require("@ec.components/ui/src/utility/validators/field-validators");
class PublicSignupComponent {
    constructor(fb, pub) {
        this.fb = fb;
        this.pub = pub;
        this.success = new core_1.EventEmitter();
        this.error = new core_1.EventEmitter();
    }
    ngOnInit() {
        this.signup = this.fb.group({
            email: ['', [forms_1.Validators.required, field_validators_1.FieldValidators.email]],
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
        this.pub.signup(this.signup.value).then((token) => {
            this.signup.reset();
            this.success.emit();
        });
        //TODO error handling etc
    }
}
PublicSignupComponent.decorators = [
    { type: core_1.Component, args: [{
                selector: 'ec-auth-public-signup',
                templateUrl: './public-signup.component.html',
                styleUrls: ['./public-signup.component.scss']
            },] },
];
/** @nocollapse */
PublicSignupComponent.ctorParameters = () => [
    { type: forms_1.FormBuilder, },
    { type: public_service_1.PublicService, },
];
PublicSignupComponent.propDecorators = {
    'success': [{ type: core_1.Output },],
    'error': [{ type: core_1.Output },],
};
exports.PublicSignupComponent = PublicSignupComponent;
//# sourceMappingURL=public-signup.component.js.map