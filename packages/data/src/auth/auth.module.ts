import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CookieModule } from 'ngx-cookie';
import { ValidationOnBlurDirective } from './validate-onblur';
import { UiModule } from '@ec.components/ui/src/ui.module';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth-guard.service';
import { AuthService } from './auth.service';

export function cookieFactory(): ModuleWithProviders {
  // https://github.com/auth0/angular2-jwt/issues/305
  return CookieModule.forRoot();
}

@NgModule({
  declarations: [
    ValidationOnBlurDirective,
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
    ValidationOnBlurDirective,
    PasswordResetComponent,
    LoginComponent,
  ],
  providers: [AuthGuard, AuthService]
})
export class AuthModule {
}
