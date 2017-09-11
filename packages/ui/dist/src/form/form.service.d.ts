import { Form } from '@ec.components/core/src/form/form';
import { FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";
import { Field } from '@ec.components/core/src/field/field';
/** This service is the interface between Angular Forms and ec.components core classes. */
export declare class FormService {
    /** Initializes the form group from the form fields*/
    getGroup(form: Form<any>): FormGroup;
    /** Extracts all validators from a given Field instance. */
    getValidators(field: Field<any>): ValidatorFn[];
    /** Returns a Validation function from the given field (using field.validate) */
    validateFactory(field: Field<any>): ValidationErrors | null;
}
