import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { FieldValidators } from '../../ui';
import { SdkService } from '../../data/sdk/sdk.service';

@Component({
  selector: 'ec-auth-public-login',
  templateUrl: './public-login.component.html',
  styleUrls: ['./public-login.component.scss']
})
export class PublicLoginComponent implements OnInit {
  public login: FormGroup;
  private submitted: boolean;
  public errorMessage: string;
  @Output() success: EventEmitter<any> = new EventEmitter();
  @Output() error: EventEmitter<any> = new EventEmitter();

  constructor(private fb: FormBuilder, private sdk: SdkService) {
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
    return Observable.throw(err);
  }

  onSubmit() {
    this.submitted = true;
    delete this.errorMessage;
    if (!this.login.valid) {
      return;
    }

    this.sdk.login(this.login.value)
    .then((res) => {
      this.login.reset();
      this.success.emit();
    });
  }
}
