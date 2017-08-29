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
import { DatamanagerListComponent } from './datamanager-list/datamanager-list.component';
import { ResourceListComponent } from './resource-list/resource-list.component';
import { ModelListComponent } from './model-list/model-list.component';

@NgModule({
  entryComponents: [
    DefaultEntryInputComponent,
    DefaultEntryOutputComponent,
    DatamanagerListComponent,
    ModelListComponent,
    ResourceListComponent,
    EntrySelectComponent,
  ],
  declarations: [
    EntryListComponent,
    EntryComponent,
    EntriesComponent,
    EntryFormComponent,
    DatamanagerListComponent,
    ModelListComponent,
    ResourceListComponent,
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
    DatamanagerListComponent,
    ModelListComponent,
    ResourceListComponent,
  ],
  providers: [
    SdkService,
    PublicService,
    AdminService,
    CrudService,
    TypeConfigService,
    ModelConfigService,
    {
      provide: 'environment',
      useValue: {
        environment: 'live',
      }
    }
  ],
})
export class DataModule {
}