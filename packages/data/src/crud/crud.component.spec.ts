import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CrudComponent } from './crud.component';
import { EntryListComponent } from '../entry-list/entry-list.component';
import { EntryFormComponent } from '../entry-form/entry-form.component';
import { UiModule } from '@ec.components/ui/src/ui.module';
import { ModelConfigService } from '../model-config/model-config.service';
import { CrudService } from './crud.service';
import { SdkService } from '../sdk/sdk.service';
import { TypeConfigService } from '../model-config/type-config.service';
import { EntryPopComponent } from '../entry-pop/entry-pop.component';
import { AuthModule } from '../auth/auth.module';
import { FormsModule } from '@angular/forms';
import { SdkModule } from '../sdk/sdk.module';
import { FilesModule } from '../files/files.module';
import { RouterTestingModule } from '@angular/router/testing';
import { ResourceConfig } from '../resource-config/resource-config.service';
import { ResourceModule } from '../resource/resource.module';
import { ImageSelectPopComponent } from '../files/image-select-pop/image-select-pop.component';

describe('CrudComponent', () => {
  let component: CrudComponent<any>;
  let fixture: ComponentFixture<CrudComponent<any>>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FormsModule,
        UiModule,
        ResourceModule,
        SdkModule,
        FilesModule,
        AuthModule],
      declarations: [ImageSelectPopComponent, EntryPopComponent, EntryFormComponent, EntryListComponent, CrudComponent],
      providers: [ModelConfigService, CrudService, SdkService, TypeConfigService, ResourceConfig,
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
