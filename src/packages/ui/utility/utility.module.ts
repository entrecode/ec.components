import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
    BrowserModule,
    FormsModule,
    IoModule,
    ReactiveFormsModule
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