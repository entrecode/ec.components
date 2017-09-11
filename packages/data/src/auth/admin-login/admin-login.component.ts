import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { AdminService } from '../../sdk/admin.service';
import { FieldValidators } from '@ec.components/ui/src/utility/validators/field-validators';

@Component({
  selector: 'ec-auth-admin-login',
  template: require('./admin-login.component.html'),
  styles: [require('./admin-login.component.scss')]
})
export class AdminLoginComponent implements OnInit {
  public login: FormGroup;
  private submitted: boolean;
  public errorMessage: string;
  @Output() success: EventEmitter<any> = new EventEmitter();
  @Output() error: EventEmitter<any> = new EventEmitter();

  constructor(private fb: FormBuilder, private admin: AdminService) {
  }

  ngOnInit() {
    this.login = this.fb.group({
      email: ['', [Validators.required, FieldValidators.email]], //emailAvailable
      password: ['', [Validators.required]],
    });
  }

  showError(err) {
    this.errorMessage = err.message;
    this.login.get('password').setValue('');
    this.error.emit(err);
    Observable.throw(err);
  }

  onSubmit() {
    this.submitted = true;
    delete this.errorMessage;
    if (!this.login.valid) {
      return;
    }
    this.admin.login(this.login.value).then((token) => {
      console.log(token);
      this.login.reset();
      this.success.emit();
    });
  }
}
