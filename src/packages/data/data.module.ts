import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { UiModule } from '../ui';
import {
  ApiService,
  EntriesComponent,
  EntryComponent,
  EntryFormComponent,
  EntryListComponent
} from '.';

@NgModule({
  declarations: [
    EntryListComponent,
    EntryComponent,
    EntriesComponent,
    EntryFormComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    UiModule
  ],
  exports: [
    EntryListComponent,
    EntryComponent,
    EntriesComponent,
    EntryFormComponent,
  ],
  providers: [
    ApiService,
  ],
})
export class DataModule {
}