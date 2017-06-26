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
  PopComponent,
  SelectComponent,
  TabComponent,
  TabsComponent
} from './index';
import { MenuComponent } from './menu/menu.component';

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
  ],
  providers: [],
})
export class UiModule {
}