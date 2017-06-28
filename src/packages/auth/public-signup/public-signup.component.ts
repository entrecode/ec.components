import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FieldValidators } from '../field-validators';
import { Observable } from 'rxjs';
import { ApiService } from '../../data/api/api.service';

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

  constructor(private fb: FormBuilder, private dm: ApiService) {
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
    this.dm.signup(this.signup.value.email, this.signup.value.password, '').then((token) => {
      // this.dm.api.setToken(token);
      console.log('token', token);
      this.signup.reset();
      this.success.emit();
    })
    //TODO error handling etc
  }
}
