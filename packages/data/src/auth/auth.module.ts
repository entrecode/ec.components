import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { UiModule } from '../../../ui/src/ui.module';
import { CookieModule } from 'ngx-cookie';
import { AuthGuard } from './auth-guard.service';
import { AuthService } from './auth.service';
import { LoginComponent } from './login/login.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { SignupComponent } from './signup/signup.component';

/** loads CookieModule */
export function cookieFactory(): ModuleWithProviders {
  // https://github.com/auth0/angular2-jwt/issues/305
  return CookieModule.forRoot();
}
/** Module for all auth related components and services. */
@NgModule({
  declarations: [
    PasswordResetComponent,
    LoginComponent,
    SignupComponent,
  ],
  imports: [
    cookieFactory(),
    CommonModule,
    ReactiveFormsModule,
    UiModule
  ],
  exports: [
    ReactiveFormsModule,
    PasswordResetComponent,
    LoginComponent,
    SignupComponent,
  ],
  providers: [AuthGuard, AuthService]
})
export class AuthModule {
}
