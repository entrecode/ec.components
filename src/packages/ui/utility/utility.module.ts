// import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { TabsComponent } from './tabs/tabs.component';
import { TabComponent } from './tab/tab.component';
import { MockupComponent } from './mockup/mockup.component';
import { MenuComponent } from './menu/menu.component';
import { LoginComponent } from './login/login.component';
import { IoModule } from '../io/io.module';

@NgModule({
  entryComponents: [],
  declarations: [
    TabsComponent,
    TabComponent,
    MockupComponent,
    MenuComponent,
    LoginComponent,
  ],
  imports: [
    // BrowserModule,
    CommonModule,
    FormsModule,
    IoModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  exports: [
    ReactiveFormsModule,
    IoModule,
    FormsModule,
    TabsComponent,
    TabComponent,
    MockupComponent,
    MenuComponent,
    LoginComponent
  ],
  providers: [],
})
export class UtilityModule {
}