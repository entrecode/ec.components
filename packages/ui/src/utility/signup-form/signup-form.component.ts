import { Component, Input, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { FieldValidators } from '../../..';
import { WithLoader } from '../../loader/with-loader.interface';
import { LoginFormComponent } from '../login-form/login-form.component';

/** Login Form Component with validation. Fires success event with credentials on submit.
 * <example-url>https://components.entrecode.de/ui/login?e=1</example-url>
*/
@Component({
  selector: 'ec-signup-form',
  templateUrl: './signup-form.component.html',
})
export class SignupFormComponent extends LoginFormComponent implements OnInit, WithLoader {

  /** The Label of the submit button. Defaults to Login */
  @Input() buttonLabel = this.symbol.resolve('signup.button.label');
  /** The Placeholder of the mail Field */
  @Input() invitePlaceholder = this.symbol.resolve('signup.invite.placeholder');
  /** If set, the invite field will be hidden and the given code will be used for signup */
  @Input() invite = '';
  /** Method that is meant to be overwritten by a subclass to communicate with an API. */
  signup(value) { // meant to be overridden
    return Promise.resolve(value);
  }

  /** Initializes the form */
  ngOnInit() {
    this.form = this.fb.group({
      email: ['', [Validators.required, FieldValidators.email]], // emailAvailable?
      password: ['', [Validators.required]],
      invite: [this.invite, [Validators.required]] // FieldValidators.uuid
    });
  }

  /** Is called when the form has been successfully submitted. Calls login and resets the form after. */
  onSubmit() {
    this.submitted = true;
    delete this.errorMessage;
    if (!this.form.valid) {
      return;
    }
    const login = this.signup(this.form.value)
      .then((res) => {
        // this.form.reset();
        this.success.emit(res);
      });
    if (this.loader) {
      this.loader.wait(login);
    }
  }
}
