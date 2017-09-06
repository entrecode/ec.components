import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';
import { CookieModule } from 'ngx-cookie';
import { PublicAuthService } from './public-auth.service';
import { requestOptionsProvider } from './request-options';
import { AuthorizationService } from './authorization.service';
import { PublicLoginComponent } from './public-login/public-login.component';
import { ValidationOnBlurDirective } from './validate-onblur';
import { PublicSignupComponent } from './public-signup/public-signup.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { UiModule } from '@ec.components/ui/ui.module';
import { AdminSignupComponent } from './admin-signup/admin-signup.component';

@NgModule({
  declarations: [
    PublicLoginComponent,
    PublicSignupComponent,
    ValidationOnBlurDirective,
    AdminLoginComponent,
    AdminSignupComponent,
  ],
  imports: [
    CookieModule.forRoot(),
    CommonModule,
    ReactiveFormsModule,
    HttpModule,
    UiModule
  ],
  exports: [
    ValidationOnBlurDirective,
    PublicLoginComponent,
    PublicSignupComponent,
    AdminLoginComponent,
    AdminSignupComponent,
    ReactiveFormsModule
  ],
  providers: [AuthorizationService, requestOptionsProvider, PublicAuthService]
})
export class AuthModule {
}
