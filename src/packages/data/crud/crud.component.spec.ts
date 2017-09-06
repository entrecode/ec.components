import { RouterModule } from '@angular/router';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CrudComponent } from './crud.component';
import { EntryListComponent } from '../entry-list/entry-list.component';
import { EntryFormComponent } from '../entry-form/entry-form.component';
import { UiModule } from '@ec.components/ui/ui.module';
import { ModelConfigService } from '../model-config/model-config.service';
import { CrudService } from './crud.service';
import { SdkService } from '../sdk/sdk.service';
import { TypeConfigService } from '../model-config/type-config.service';
import EntryResource from 'ec.sdk/src/resources/publicAPI/EntryResource';

describe('CrudComponent', () => {
  let component: CrudComponent<EntryResource>;
  let fixture: ComponentFixture<CrudComponent<EntryResource>>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [UiModule, RouterModule],
      declarations: [EntryFormComponent, EntryListComponent, CrudComponent],
      providers: [ModelConfigService, CrudService, SdkService, TypeConfigService,
        {
          provide: 'environment',
          useValue: {
            environment: 'live',
          }
        }]
    })
    .compileComponents();
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
