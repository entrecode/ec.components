import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import {
  FieldComponent,
  FieldErrorsComponent,
  FilterComponent,
  FormComponent,
  GroupPipe,
  ListComponent,
  ListHeaderComponent,
  ListItemsComponent,
  LoginComponent,
  MenuComponent,
  MockupComponent,
  PaginationComponent,
  PopComponent,
  SelectComponent,
  TabComponent,
  TabsComponent
} from './index';

@NgModule({
  entryComponents: [
    FieldComponent,
    PopComponent,
  ],
  declarations: [
    ListComponent,
    PaginationComponent,
    TabsComponent,
    TabComponent,
    MockupComponent,
    FilterComponent,
    FieldComponent,
    ListItemsComponent,
    ListHeaderComponent,
    GroupPipe,
    FieldErrorsComponent,
    FormComponent,
    PopComponent,
    MenuComponent,
    SelectComponent,
    LoginComponent,
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
    FieldComponent,
    ListItemsComponent,
    ListHeaderComponent,
    GroupPipe,
    FormComponent,
    FieldErrorsComponent,
    PopComponent,
    MenuComponent,
    SelectComponent,
    LoginComponent
  ],
  providers: [],
})
export class UiModule {
}