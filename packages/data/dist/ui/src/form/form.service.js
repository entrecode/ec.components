"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const forms_1 = require("@angular/forms");
/** This service is the interface between Angular Forms and ec.components core classes. */
class FormService {
    /** Initializes the form group from the form fields*/
    getGroup(form) {
        const control = {};
        form.fields.filter((field) => field.form !== false)
            .forEach((field) => {
            const validators = this.getValidators(field);
            control[field.property] = new forms_1.FormControl(form.getValue(field.property), validators);
        });
        return new forms_1.FormGroup(control);
    }
    /** Extracts all validators from a given Field instance. */
    getValidators(field) {
        const validators = [];
        if (field.required) {
            validators.push(forms_1.Validators.required);
        }
        if (field.validate) {
            validators.push(this.validateFactory(field));
        }
        return validators;
    }
    /** Returns a Validation function from the given field (using field.validate) */
    validateFactory(field) {
        return (control) => {
            if (!field.validate) {
                return;
            }
            const error = field.validate(control.value, field);
            if (error) {
                return {
                    custom: error
                };
            }
        };
    }
}
FormService.decorators = [
    { type: core_1.Injectable },
];
/** @nocollapse */
FormService.ctorParameters = () => [];
exports.FormService = FormService;
//# sourceMappingURL=form.service.js.map