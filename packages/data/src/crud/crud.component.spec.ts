import { RouterModule } from '@angular/router';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CrudComponent } from './crud.component';
import { EntryListComponent } from '../entry-list/entry-list.component';
import { EntryFormComponent } from '../entry-form/entry-form.component';
import { UiModule } from '@ec.components/ui/src/ui.module';
import { ModelConfigService } from '../model-config/model-config.service';
import { CrudService } from './crud.service';
import { SdkService } from '../sdk/sdk.service';
import { TypeConfigService } from '../model-config/type-config.service';
import EntryResource from 'ec.sdk/lib/resources/publicAPI/EntryResource';
import { EntryPopComponent } from '../entry-pop/entry-pop.component';
import { AuthModule } from '../auth/auth.module';
import { demoRoutes } from '../../../../demo/app/demo.routes';
import { FormsModule } from '@angular/forms';
import { SdkModule } from '../sdk/sdk.module';
import { FilesModule } from '../files/files.module';
import { RouterTestingModule } from '@angular/router/testing';

describe('CrudComponent', () => {
  let component: CrudComponent<EntryResource>;
  let fixture: ComponentFixture<CrudComponent<EntryResource>>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FormsModule,
        UiModule,
        SdkModule,
        FilesModule,
        AuthModule],
      declarations: [EntryPopComponent, EntryFormComponent, EntryListComponent, CrudComponent],
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
