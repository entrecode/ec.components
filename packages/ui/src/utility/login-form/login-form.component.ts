import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { LoaderComponent } from '../../loader/loader.component';
import { WithLoader } from '../../loader/with-loader.interface';
import { SymbolService } from '../../symbol/symbol.service';
import { FieldValidators } from '../validators/field-validators';

/** Login Form Component with validation. Fires success event with credentials on submit.
 * <example-url>https://components.entrecode.de/ui/login?e=1</example-url>
*/
@Component({
  selector: 'ec-login-form',
  templateUrl: './login-form.component.html',
})
export class LoginFormComponent implements OnInit, WithLoader {
  /** The login's form group.*/
  public form: FormGroup;
  /** Flips true when submitted. */
  protected submitted: boolean;
  /** Contains possible error messages. */
  public errorMessage: string;
  /** Event that emits on succesful submit of the form, passing the login credentials. */
  @Output() success: EventEmitter<any> = new EventEmitter();
  /** Event that emits when calling showError. */
  @Output() error: EventEmitter<any> = new EventEmitter();
  /** The loader that should be shown during login */
  @Input() loader: LoaderComponent;
  /** If true, email and password wont have labels */
  @Input() showLabels = true;
  /** The Label of the Mail field */
  @Input() emailLabel = this.symbol.resolve('login.email.label');
  /** The Placeholder of the mail Field */
  @Input() emailPlaceholder = this.symbol.resolve('login.email.placeholder');
  /** The Label of the password field. */
  @Input() passwordLabel = this.symbol.resolve('login.password.label');
  /** The Placeholder of the password field */
  @Input() passwordPlaceholder = this.symbol.resolve('login.password.placeholder');
  /** The Label of the submit button. Defaults to Login */
  @Input() buttonLabel = this.symbol.resolve('login.button.label');
  /** Additional Button classes */
  @Input() buttonClasses = '';
  /** Recent error Notifications */
  notifications: Notification[];

  /** Injects the FormBuilder*/
  constructor(protected fb: FormBuilder, public symbol: SymbolService) {
  }

  /** Initializes the form */
  ngOnInit() {
    this.form = this.fb.group({
      email: ['', [Validators.required, FieldValidators.email]], // emailAvailable?
      password: ['', [Validators.required]],
    });
  }

  /** Shows the given error in the form. Clears the password field and emits the error event. */
  showError(err): any {
    this.errorMessage = err.message;
    this.form.get('password').setValue('');
    this.error.emit(err);
    Observable.throw(err);
  }

  /** Method that is meant to be overwritten by a subclass to communicate with an API. */
  login(value) { // meant to be overridden
    return Promise.resolve(value);
  }

  /** Is called when the form has been successfully submitted. Calls login and resets the form after. */
  onSubmit() {
    this.submitted = true;
    delete this.errorMessage;
    if (!this.form.valid) {
      return;
    }
    const login = this.login(this.form.value)
      .then((res) => {
        this.form.reset();
        this.success.emit(res);
      });
    if (this.loader) {
      this.loader.wait(login);
    }
  }
}
