import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { UiModule } from '../ui/ui.module';
import { ModelConfig } from './model-config/model-config';
import { CrudService } from './crud/crud.service';
import { DefaultEntryInputComponent } from './entry-form/default-entry-input.component';
import { EntryListComponent } from './entry-list/entry-list.component';
import { EntryComponent } from './entry/entry.component';
import { EntriesComponent } from './entries/entries.component';
import { EntryFormComponent } from './entry-form/entry-form.component';
import { SdkService } from './sdk/sdk.service';
import { PublicService } from './sdk/public.service';
import { AdminService } from './sdk/admin.service';

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
    CrudService,
    ModelConfig,
  ],
})
export class DataModule {
}