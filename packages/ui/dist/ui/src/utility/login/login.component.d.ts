import { EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LoaderComponent } from '../../loader/loader.component';
/** Login Form Component with validation. Fires success event with credentials on submit. */
export declare class LoginComponent implements OnInit {
    private fb;
    /** The login's form group.*/
    form: FormGroup;
    /** Flips true when submitted. */
    private submitted;
    /** Contains possible error messages. */
    errorMessage: string;
    /** Event that emits on succesful submit of the form, passing the login credentials. */
    success: EventEmitter<any>;
    /** Event that emits when calling showError. */
    error: EventEmitter<any>;
    /** The loader that should be shown during login */
    loader: LoaderComponent;
    /** Injects the FormBuilder*/
    constructor(fb: FormBuilder);
    /** Initializes the form */
    ngOnInit(): void;
    /** Shows the given error in the form. Clears the password field and emits the error event. */
    showError(err: any): any;
    /** Method that is meant to be overwritten by a subclass to communicate with an API. */
    login(value: any): Promise<any>;
    /** Is called when the form has been successfully submitted. Calls login and resets the form after. */
    onSubmit(): void;
}
