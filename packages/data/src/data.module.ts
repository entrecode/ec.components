import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UiModule } from '../../ui/src/ui.module';
import { ModelConfigService } from './model-config/model-config.service';
import { CrudService } from './crud/crud.service';
import { DefaultEntryInputComponent } from './entry-form/default-entry-input.component';
import { EntryListComponent } from './entry-list/entry-list.component';
import { EntryComponent } from './entry/entry.component';
import { EntriesComponent } from './entries/entries.component';
import { EntryFormComponent } from './entry-form/entry-form.component';
import { CrudComponent } from './crud/crud.component';
import { DefaultEntryOutputComponent } from './entry-form/default-entry-output.component';
import { EntrySelectComponent } from './entry-select/entry-select.component';
import { TypeConfigService } from './model-config/type-config.service';
import { DatamanagerListComponent } from './datamanager-list/datamanager-list.component';
import { ResourceListComponent } from './resource-list/resource-list.component';
import { ModelListComponent } from './model-list/model-list.component';
import { EditorComponent } from './editor.component';
import { SdkModule } from './sdk/sdk.module';
import { FilesModule } from './files/files.module';

@NgModule({
  entryComponents: [
    DefaultEntryInputComponent,
    DefaultEntryOutputComponent,
    DatamanagerListComponent,
    ModelListComponent,
    ResourceListComponent,
    EntrySelectComponent,
    EditorComponent,
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
    EditorComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    UiModule,
    SdkModule,
    FilesModule,
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
    RouterModule,
    EditorComponent,
    SdkModule,
    FilesModule,
  ],
  providers: [
    CrudService,
    TypeConfigService,
    ModelConfigService,
    {
      provide: 'environment',
      useValue: {
        environment: 'live'
      }
    }
  ],
})
export class DataModule {

  constructor() {
  }

  static forEnvironment(environment): ModuleWithProviders {
    return {
      ngModule: DataModule,
      providers: [
        {
          provide: 'environment',
          useValue: Object.assign(
            {
              environment: 'live'
            },
            environment)
        }
      ]
    }
  }
}