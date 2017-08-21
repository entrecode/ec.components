import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { UiModule } from '../ui/ui.module';
import { ModelConfigService } from './model-config/model-config.service';
import { CrudService } from './crud/crud.service';
import { DefaultEntryInputComponent } from './entry-form/default-entry-input.component';
import { EntryListComponent } from './entry-list/entry-list.component';
import { EntryComponent } from './entry/entry.component';
import { EntriesComponent } from './entries/entries.component';
import { EntryFormComponent } from './entry-form/entry-form.component';
import { SdkService } from './sdk/sdk.service';
import { PublicService } from './sdk/public.service';
import { AdminService } from './sdk/admin.service';
import { CrudComponent } from './crud/crud.component';
import { DefaultEntryOutputComponent } from './entry-form/default-entry-output.component';
import { EntrySelectComponent } from './entry-select/entry-select.component';
import { TypeConfigService } from './model-config/type-config.service';

@NgModule({
  entryComponents: [
    DefaultEntryInputComponent,
    DefaultEntryOutputComponent,
    EntrySelectComponent,
  ],
  declarations: [
    EntryListComponent,
    EntryComponent,
    EntriesComponent,
    EntryFormComponent,
    DefaultEntryInputComponent,
    DefaultEntryOutputComponent,
    CrudComponent,
    EntrySelectComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    UiModule,
  ],
  exports: [
    EntryListComponent,
    EntryComponent,
    EntriesComponent,
    EntryFormComponent,
    CrudComponent,
    EntrySelectComponent,
  ],
  providers: [
    SdkService,
    PublicService,
    AdminService,
    CrudService,
    TypeConfigService,
    ModelConfigService,
  ],
})
export class DataModule {
}