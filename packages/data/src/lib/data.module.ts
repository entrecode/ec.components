import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UiModule } from '@ec.components/ui';
import { DndModule } from 'ngx-drag-drop';
import { AuthModule } from './auth/auth.module';
import { CrudComponent } from './crud/crud.component';
import { CrudService } from './crud/crud.service';
import { EntriesDirective } from './entries/entries.directive';
import { AdminEntryInputComponent } from './entry-form/admin-entry-input.component';
import { DefaultEntryInputComponent } from './entry-form/default-entry-input.component';
import { DefaultEntryOutputComponent } from './entry-form/default-entry-output.component';
import { EntryFormComponent } from './entry-form/entry-form.component';
import { EntryListPopComponent } from './entry-list-pop/entry-list-pop.component';
import { EntryListComponent } from './entry-list/entry-list.component';
import { EntryPopComponent } from './entry-pop/entry-pop.component';
import { EntrySelectComponent } from './entry-select/entry-select.component';
import { EntryDirective } from './entry/entry.directive';
import { FilesModule } from './files/files.module';
import { ModelConfigService } from './model-config/model-config.service';
import { TypeConfigService } from './model-config/type-config.service';
import { ResourceModule } from './resource/resource.module';
import { HistoryService } from './sdk/history.service';
import { SdkModule } from './sdk/sdk.module';
import { EntryListSelectComponent } from './entry-list-select/entry-list-select.component';

@NgModule({
  entryComponents: [
    DefaultEntryInputComponent,
    DefaultEntryOutputComponent,
    AdminEntryInputComponent,
    EntrySelectComponent,
    EntryListSelectComponent,
    EntryListPopComponent,
  ],
  declarations: [
    EntryListComponent,
    EntryDirective,
    EntriesDirective,
    EntryFormComponent,
    EntryPopComponent,
    DefaultEntryInputComponent,
    DefaultEntryOutputComponent,
    AdminEntryInputComponent,
    EntryListSelectComponent,
    CrudComponent,
    EntrySelectComponent,
    EntryListPopComponent,
  ],
  imports: [
    FormsModule,
    CommonModule,
    UiModule,
    SdkModule,
    FilesModule,
    AuthModule,
    ResourceModule,
    DndModule
  ],
  exports: [
    EntryListComponent,
    EntryDirective,
    EntriesDirective,
    EntryFormComponent,
    EntryPopComponent,
    CrudComponent,
    EntrySelectComponent,
    EntryListSelectComponent,
    EntryListPopComponent,
    RouterModule,
    UiModule,
    SdkModule,
    FilesModule,
    AuthModule,
    ResourceModule
  ],
  providers: [
    CrudService,
    TypeConfigService,
    ModelConfigService,
    HistoryService,
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
