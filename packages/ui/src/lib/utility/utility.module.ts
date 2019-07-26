import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IoModule } from '../io/io.module';
import { FocusDirective } from './focus/focus.directive';
import { LoginFormComponent } from './login-form/login-form.component';
import { SignupFormComponent } from './signup-form/signup-form.component';
import { TabComponent } from './tab/tab.component';
import { TabsComponent } from './tabs/tabs.component';
import { KeycommandsService } from './keycommands/keycommands.service';

export const utilityModuleConfig = {
  entryComponents: [],
  declarations: [TabsComponent, TabComponent, LoginFormComponent, SignupFormComponent, FocusDirective],
  imports: [FormsModule, ReactiveFormsModule, IoModule, CommonModule, RouterModule],
  exports: [
    /* FormsModule,
    ReactiveFormsModule,
    IoModule,
    */
    TabsComponent,
    TabComponent,
    LoginFormComponent,
    SignupFormComponent,
    FocusDirective,
    RouterModule,
  ],
  providers: [KeycommandsService],
};

@NgModule(utilityModuleConfig)
export class UtilityModule {}
