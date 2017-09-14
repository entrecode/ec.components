import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { TabsComponent } from './tabs/tabs.component';
import { TabComponent } from './tab/tab.component';
import { MockupComponent } from './mockup/mockup.component';
import { MenuComponent } from './menu/menu.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { IoModule } from '../io/io.module';

@NgModule({
  entryComponents: [],
  declarations: [
    TabsComponent,
    TabComponent,
    MockupComponent,
    MenuComponent,
    LoginFormComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    IoModule,
    CommonModule,
    RouterModule,
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    IoModule,
    TabsComponent,
    TabComponent,
    MockupComponent,
    MenuComponent,
    LoginFormComponent,
    RouterModule,
  ],
  providers: [],
})
export class UtilityModule {
}