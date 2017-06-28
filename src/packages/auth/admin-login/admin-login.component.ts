import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FieldValidators } from '../field-validators';
import { Observable } from 'rxjs';
import { ApiService } from '../../data';
import { SdkService } from '../../data/sdk/sdk.service';

@Component({
  selector: 'ec-auth-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit {
  private login: FormGroup;
  private submitted: boolean;
  public errorMessage: string;
  @Output() success: EventEmitter<any> = new EventEmitter();
  @Output() error: EventEmitter<any> = new EventEmitter();

  constructor(private fb: FormBuilder, private dm: ApiService, private sdk: SdkService) {
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
    console.log('!admin login', this.login.value);
    this.sdk.login(this.login.value).then((token) => {
      console.log(token);
    });

    /*this.dm.login(this.login.value.email, this.login.value.password)
     .then((res) => {
     console.log('login res', res);
     this.login.reset();
     this.success.emit();
     });*/
  }
}
