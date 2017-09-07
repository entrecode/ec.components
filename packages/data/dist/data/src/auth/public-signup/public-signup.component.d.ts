import { EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PublicService } from '../../sdk/public.service';
export declare class PublicSignupComponent implements OnInit {
    private fb;
    private pub;
    signup: FormGroup;
    private submitted;
    errorMessage: string;
    success: EventEmitter<any>;
    error: EventEmitter<any>;
    constructor(fb: FormBuilder, pub: PublicService);
    ngOnInit(): void;
    showError(err: any): void;
    onSubmit(): void;
}
