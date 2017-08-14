import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { DynamicFieldComponent } from './dynamic-field/dynamic-field.component';
import { DefaultOutputComponent } from './output/default-output.component';
import { TabsComponent } from './tabs/tabs.component';
import { TabComponent } from './tab/tab.component';
import { MockupComponent } from './mockup/mockup.component';
import { MenuComponent } from './menu/menu.component';
import { LoginComponent } from './login/login.component';
import { NotificationsModule } from './notifications/notifications.module';
import { PopModule } from './pop/pop.module';
import { LoaderModule } from './loader/loader.module';
import { ListModule } from "./list/list.module";
import { FormModule } from './form/form.module';

@NgModule({
  entryComponents: [
    DynamicFieldComponent,
    DefaultOutputComponent,
  ],
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
    ReactiveFormsModule,
    NotificationsModule,
    PopModule,
    LoaderModule,
    FormModule,
    ListModule,
  ],
  exports: [
    ReactiveFormsModule,
    FormsModule,
    TabsComponent,
    TabComponent,
    MockupComponent,
    MenuComponent,
    LoginComponent,
    PopModule,
    NotificationsModule,
    LoaderModule,
    ListModule,
    FormModule
  ],
  providers: [],
})
export class UiModule {
}