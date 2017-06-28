import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Http } from '@angular/http';
import { PublicAuthService } from '../public-auth.service';
import { FieldValidators } from '../field-validators';
import { Observable } from 'rxjs';

@Component({
  selector: 'ec-auth-public-login',
  templateUrl: './public-login.component.html',
  styleUrls: ['./public-login.component.scss']
})
export class PublicLoginComponent implements OnInit {
  private login: FormGroup;
  private submitted: boolean;
  public errorMessage: string;
  @Output() success: EventEmitter<any> = new EventEmitter();
  @Output() error: EventEmitter<any> = new EventEmitter();

  constructor(private fb: FormBuilder, private http: Http, private auth: PublicAuthService) {
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
    console.log('login!.');
    /*this.auth.login(this.login.value)
     .catch((err) => this.showError(err))
     .subscribe(res => {
     this.auth.useToken(res.token);
     this.login.reset();
     this.success.emit();
     });*/
  }
}
