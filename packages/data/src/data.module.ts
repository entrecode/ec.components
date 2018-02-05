import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UiModule } from '@ec.components/ui/src/ui.module';
import { ModelConfigService } from './model-config/model-config.service';
import { CrudService } from './crud/crud.service';
import { DefaultEntryInputComponent } from './entry-form/default-entry-input.component';
import { EntryListComponent } from './entry-list/entry-list.component';
import { EntryFormComponent } from './entry-form/entry-form.component';
import { CrudComponent } from './crud/crud.component';
import { DefaultEntryOutputComponent } from './entry-form/default-entry-output.component';
import { EntrySelectComponent } from './entry-select/entry-select.component';
import { TypeConfigService } from './model-config/type-config.service';
import { DatamanagerListComponent } from './datamanager-list/datamanager-list.component';
import { ResourceListComponent } from './resource-list/resource-list.component';
import { ModelListComponent } from './model-list/model-list.component';
import { SdkModule } from './sdk/sdk.module';
import { FilesModule } from './files/files.module';
import { AuthModule } from './auth/auth.module';
import { EntriesDirective } from './entries/entries.directive';
import { EntryDirective } from './entry/entry.directive';
import { EntryPopComponent } from './entry-pop/entry-pop.component';
import { ResourceFormComponent } from './resource-form/resource-form.component';

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
    EntryDirective,
    EntriesDirective,
    EntryFormComponent,
    EntryPopComponent,
    DatamanagerListComponent,
    ModelListComponent,
    ResourceListComponent,
    ResourceFormComponent,
    DefaultEntryInputComponent,
    DefaultEntryOutputComponent,
    CrudComponent,
    EntrySelectComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    UiModule,
    SdkModule,
    FilesModule,
    AuthModule
  ],
  exports: [
    EntryListComponent,
    EntryDirective,
    EntriesDirective,
    EntryFormComponent,
    EntryPopComponent,
    CrudComponent,
    EntrySelectComponent,
    DatamanagerListComponent,
    ModelListComponent,
    ResourceListComponent,
    ResourceFormComponent,
    RouterModule,
    UiModule,
    SdkModule,
    FilesModule,
    AuthModule
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
  ]
})
export class DataModule {
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
            environment
          )
        }
      ]
    };
  }
  constructor() { }
}
