import { EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AdminService } from '../../sdk/admin.service';
export declare class AdminSignupComponent implements OnInit {
    private fb;
    private admin;
    signup: FormGroup;
    private submitted;
    errorMessage: string;
    success: EventEmitter<any>;
    error: EventEmitter<any>;
    constructor(fb: FormBuilder, admin: AdminService);
    ngOnInit(): void;
    showError(err: any): void;
    onSubmit(): void;
}
