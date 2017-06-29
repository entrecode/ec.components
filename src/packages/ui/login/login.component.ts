import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { FieldValidators } from '../validators/field-validators';

@Component({
  selector: 'ec-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private form: FormGroup;
  private submitted: boolean;
  public errorMessage: string;
  @Output() success: EventEmitter<any> = new EventEmitter();
  @Output() error: EventEmitter<any> = new EventEmitter();

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', [Validators.required, FieldValidators.email]], //emailAvailable?
      password: ['', [Validators.required]],
    });
  }

  showError(err) {
    this.errorMessage = err.message;
    this.form.get('password').setValue('');
    this.error.emit(err);
    return Observable.throw(err);
  }

  login(value) { //meant to be overridden
    return Promise.resolve(value);
  }

  onSubmit() {
    this.submitted = true;
    delete this.errorMessage;
    if (!this.form.valid) {
      return;
    }
    this.login(this.form.value)
    .then((res) => {
      this.form.reset();
      this.success.emit(res);
    })
  }
}
