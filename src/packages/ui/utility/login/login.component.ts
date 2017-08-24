import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { FieldValidators } from '../validators/field-validators';

/** Login Form Component with validation. Fires success event with credentials on submit. */
@Component({
  selector: 'ec-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  /** The login's form group.*/
  private form: FormGroup;
  /** Flips true when submitted. */
  private submitted: boolean;
  /** Contains possible error messages. */
  public errorMessage: string;
  /** Event that emits on succesful submit of the form, passing the login credentials. */
  @Output() success: EventEmitter<any> = new EventEmitter();
  /** Event that emits when calling showError. */
  @Output() error: EventEmitter<any> = new EventEmitter();

  /** Injects the FormBuilder*/
  constructor(private fb: FormBuilder) {
  }

  /** Initializes the form */
  ngOnInit() {
    this.form = this.fb.group({
      email: ['', [Validators.required, FieldValidators.email]], //emailAvailable?
      password: ['', [Validators.required]],
    });
  }

  /** Shows the given error in the form. Clears the password field and emits the error event. */
  showError(err) {
    this.errorMessage = err.message;
    this.form.get('password').setValue('');
    this.error.emit(err);
    return Observable.throw(err);
  }

  /** Method that is meant to be overwritten by a subclass to communicate with an API. */
  login(value) { //meant to be overridden
    return Promise.resolve(value);
  }

  /** Is called when the form has been successfully submitted. Calls login and resets the form after. */
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
