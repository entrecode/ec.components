import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CookieModule } from 'ngx-cookie';
import { UiModule } from '@ec.components/ui/src/ui.module';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth-guard.service';
import { AuthService } from './auth.service';

/** loads CookieModule */
export function cookieFactory(): ModuleWithProviders {
  // https://github.com/auth0/angular2-jwt/issues/305
  return CookieModule.forRoot();
}
/** Module for all auth related components and services. */
@NgModule({
  declarations: [
    PasswordResetComponent,
    LoginComponent
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
  ],
  providers: [AuthGuard, AuthService]
})
export class AuthModule {
}
