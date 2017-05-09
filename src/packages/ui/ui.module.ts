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
  MockupComponent,
  PaginationComponent,
  TabComponent,
  TabsComponent
} from './index';

@NgModule({
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
    FormComponent
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
    FieldErrorsComponent
  ],
  providers: [],
})
export class UiModule {
}