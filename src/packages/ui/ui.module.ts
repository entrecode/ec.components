import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { InputComponent } from './input/input.component';
import { PopComponent } from './pop/pop.component';
import { DynamicFieldComponent } from './dynamic-field/dynamic-field.component';
import { DefaultInputComponent } from './input/default-input.component';
import { DefaultOutputComponent } from './output/default-output.component';
import { SelectComponent } from './select/select.component';
import { LoaderComponent } from './loader/loader.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { ListComponent } from './list/list.component';
import { PaginationComponent } from './pagination/pagination.component';
import { TabsComponent } from './tabs/tabs.component';
import { TabComponent } from './tab/tab.component';
import { MockupComponent } from './mockup/mockup.component';
import { FilterComponent } from './filter/filter.component';
import { OutputComponent } from './output/output.component';
import { ListItemsComponent } from './list-items/list-items.component';
import { ListHeaderComponent } from './list-header/list-header.component';
import { GroupPipe } from './list/group.pipe';
import { InputErrorsComponent } from './input-errors/input-errors.component';
import { FormComponent } from './form/form.component';
import { MenuComponent } from './menu/menu.component';
import { LoginComponent } from './login/login.component';
import { FieldHostDirective } from './dynamic-field/field-host.directive';
import { LoaderService } from './loader/loader.service';
import { NotificationsService } from './notifications/notifications.service';
import { ErrorComponent } from './error/error.component';

@NgModule({
  entryComponents: [
    InputComponent,
    PopComponent,
    DynamicFieldComponent,
    DefaultInputComponent,
    DefaultOutputComponent,
    SelectComponent,
    LoaderComponent,
    NotificationsComponent,
    ErrorComponent,
  ],
  declarations: [
    ListComponent,
    PaginationComponent,
    TabsComponent,
    TabComponent,
    MockupComponent,
    FilterComponent,
    InputComponent,
    OutputComponent,
    ListItemsComponent,
    ListHeaderComponent,
    GroupPipe,
    InputErrorsComponent,
    FormComponent,
    PopComponent,
    MenuComponent,
    SelectComponent,
    LoginComponent,
    FieldHostDirective,
    DynamicFieldComponent,
    DefaultInputComponent,
    DefaultOutputComponent,
    LoaderComponent,
    NotificationsComponent,
    ErrorComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    ReactiveFormsModule,
    ListComponent,
    PaginationComponent,
    TabsComponent,
    TabComponent,
    MockupComponent,
    FilterComponent,
    InputComponent,
    OutputComponent,
    ListItemsComponent,
    ListHeaderComponent,
    GroupPipe,
    FormComponent,
    PopComponent,
    MenuComponent,
    SelectComponent,
    LoginComponent,
    InputErrorsComponent,
    LoaderComponent,
    NotificationsComponent,
    ErrorComponent,
  ],
  providers: [
    LoaderService,
    NotificationsService,
  ],
})
export class UiModule {
}