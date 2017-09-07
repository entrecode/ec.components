import { FormControl } from '@angular/forms';
/** This component keeps track of a form control's errors and displays them. It is meant to be used beneath a form control. */
export declare class InputErrorsComponent {
    /** The form control that should be tracked */
    control: FormControl;
    /** Imported error messages. */
    errors: {
        emailUnavailable: string;
        required: string;
        pattern: string;
        minlength: string;
    };
    /** This method will iterate over the control errors and generate objects for the template. */
    private getErrors();
}
