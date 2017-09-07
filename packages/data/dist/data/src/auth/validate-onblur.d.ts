import { NgControl } from '@angular/forms';
export declare class ValidationOnBlurDirective {
    formControl: NgControl;
    private validators;
    private asyncValidators;
    private wasChanged;
    constructor(formControl: NgControl);
    onFocus($event: any): void;
    onKeyup($event: any): void;
    onChange($event: any): void;
    onNgModelChange($event: any): void;
    onBlur($event: any): void;
}
