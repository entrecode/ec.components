import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { PublicService } from '../../index';
import { FieldValidators } from '../../../ui/index';

@Component({
  selector: 'ec-auth-public-signup',
  templateUrl: './public-signup.component.html',
  styleUrls: ['./public-signup.component.scss']
})
export class PublicSignupComponent implements OnInit {
  public signup: FormGroup;
  private submitted: boolean;
  public errorMessage: string;
  @Output() success: EventEmitter<any> = new EventEmitter();
  @Output() error: EventEmitter<any> = new EventEmitter();

  constructor(private fb: FormBuilder, private pub: PublicService) {
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
    this.pub.signup(this.signup.value).then((token) => {
      this.signup.reset();
      this.success.emit();
    })
    //TODO error handling etc
  }
}
