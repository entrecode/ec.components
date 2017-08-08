import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { UiModule } from '../ui/ui.module';
import {
  AdminService,
  DefaultEntryInputComponent,
  EntriesComponent,
  EntryComponent,
  EntryFormComponent,
  EntryListComponent,
  PublicService,
  SdkService,
} from './index';
import { ModelConfig } from './model-config/model-config';

@NgModule({
  entryComponents: [
    DefaultEntryInputComponent,
  ],
  declarations: [
    EntryListComponent,
    EntryComponent,
    EntriesComponent,
    EntryFormComponent,
    DefaultEntryInputComponent,
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
    SdkService,
    PublicService,
    AdminService,
    ModelConfig,
  ],
})
export class DataModule {
}