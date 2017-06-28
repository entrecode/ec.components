import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PublicAuthService } from '../public-auth.service';
import { FieldValidators } from '../field-validators';
import { Observable } from 'rxjs';

@Component({
  selector: 'ec-auth-public-signup',
  templateUrl: './public-signup.component.html',
  styleUrls: ['./public-signup.component.scss']
})
export class PublicSignupComponent implements OnInit {
  private signup: FormGroup;
  private submitted: boolean;
  private errorMessage: string;
  @Output() success: EventEmitter<any> = new EventEmitter();
  @Output() error: EventEmitter<any> = new EventEmitter();

  constructor(private fb: FormBuilder, private auth: PublicAuthService) {
  }

  ngOnInit() {
    this.signup = this.fb.group({
      email: ['', [Validators.required, FieldValidators.email]], //emailAvailable
      password: ['', [Validators.required]],
    });
  }

  showError(err) {
    this.errorMessage = err.message;
    this.error.emit(err);
    return Observable.throw(err);
  }

  onSubmit() {
    this.submitted = true;
    if (!this.signup.valid) {
      return;
    }
    console.log('subtmi!');
    /*this.auth.signup(this.signup.value)
    .catch((err) => this.showError(err))
    .subscribe(res => {
      this.signup.reset();
      this.success.emit();
      this.auth.useToken(res.token)
    });*/
  }
}
