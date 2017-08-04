import { BrowserModule } from '@angular/platform-browser';
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
import { InputErrorsComponent } from './input-errors/input-errors.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
// import { HyperAgentModule } from './hyperagent/hyper-agent.module';

@NgModule({
  declarations: [
    PublicLoginComponent,
    PublicSignupComponent,
    ValidationOnBlurDirective,
    InputErrorsComponent,
    AdminLoginComponent,
  ],
  imports: [
    CookieModule.forRoot(),
    BrowserModule,
    ReactiveFormsModule,
    //HyperAgentModule,
    HttpModule,
  ],
  exports: [
    ValidationOnBlurDirective,
    InputErrorsComponent,
    PublicLoginComponent,
    PublicSignupComponent,
    AdminLoginComponent
  ],
  providers: [AuthorizationService, requestOptionsProvider, PublicAuthService]
})
export class AuthModule {
}
