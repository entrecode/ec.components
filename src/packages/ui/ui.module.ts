import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import {
  FieldComponent,
  FilterComponent,
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
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  exports: [
    ListComponent,
    PaginationComponent,
    TabsComponent,
    TabComponent,
    MockupComponent,
    FilterComponent,
    FieldComponent,
    ListItemsComponent,
    ListHeaderComponent,
    GroupPipe
  ],
  providers: [],
})
export class UiModule {
}