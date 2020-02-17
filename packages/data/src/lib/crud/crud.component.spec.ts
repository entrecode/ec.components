import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CrudComponent } from './crud.component';
import {
  DefaultEntryInputComponent,
  DefaultEntryOutputComponent,
  AdminEntryInputComponent,
  EntrySelectComponent,
  EntryListComponent,
  EntryFormComponent,
  EntryPopComponent,
  FilesModule,
  TypeConfigService,
  ModelConfigService,
  HistoryService
} from '../../public_api';
import { EntryActionbarComponent } from '../entry-actionbar/entry-actionbar.component';
import { EntryListSelectComponent } from '../entry-list-select/entry-list-select.component';
import { EntryListPopComponent } from '../entry-list-pop/entry-list-pop.component';
import { EntryDirective } from '../entry/entry.directive';
import { EntriesDirective } from '../entries/entries.directive';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UiModule } from '@ec.components/ui/public_api';
import { SdkModule } from '../sdk/sdk.module';
import { AuthModule } from '../auth';
import { ResourceModule } from '../resource/resource.module';
import { DndModule } from 'ngx-drag-drop';
import { EntryService } from '../entry/entry.service';

describe('CrudComponent', () => {
  let component: CrudComponent;
  let fixture: ComponentFixture<CrudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
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
        EntryActionbarComponent,
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
      providers: [
        EntryService,
        TypeConfigService,
        ModelConfigService,
        HistoryService,
        {
          provide: 'environment',
          useValue: {
            environment: 'live',
            datamanagerID: '83cc6374',
          },
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
