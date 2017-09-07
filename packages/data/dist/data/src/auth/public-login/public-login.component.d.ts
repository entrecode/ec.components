import { EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SdkService } from '../../sdk/sdk.service';
export declare class PublicLoginComponent implements OnInit {
    private fb;
    private sdk;
    login: FormGroup;
    private submitted;
    errorMessage: string;
    success: EventEmitter<any>;
    error: EventEmitter<any>;
    constructor(fb: FormBuilder, sdk: SdkService);
    ngOnInit(): void;
    showError(err: any): void;
    onSubmit(): void;
}
