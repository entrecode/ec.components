import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { emailAvailable } from '../email-available.validator';
import { Observable } from 'rxjs';
import { AdminService } from '../../sdk/admin.service';

@Component({
  selector: 'ec-auth-admin-signup',
  templateUrl: './admin-signup.component.html',
  styleUrls: ['./admin-signup.component.scss']
})
export class AdminSignupComponent implements OnInit {
  public signup: FormGroup;
  private submitted: boolean;
  public errorMessage: string;
  @Output() success: EventEmitter<any> = new EventEmitter();
  @Output() error: EventEmitter<any> = new EventEmitter();

  constructor(private fb: FormBuilder, private admin: AdminService) {
  }

  ngOnInit() {
    this.signup = this.fb.group({
      email: ['', [Validators.required, emailAvailable]], //emailAvailable
      password: ['', [Validators.required]],
    });
  }

  showError(err) {
    this.errorMessage = err.message;
    this.error.emit(err);
    Observable.throw(err);
  }

  onSubmit() {
    this.submitted = true;
    if (!this.signup.valid) {
      return;
    }
    this.admin.signup(this.signup.value).then((token) => {
      this.signup.reset();
      this.success.emit();
    })
    //TODO error handling etc
  }
}
