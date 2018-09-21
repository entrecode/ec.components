import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DataModule, EntryListComponent } from '../..';
import { UiModule } from '@ec.components/ui';
import { ResourceModule } from '../resource/resource.module';
import { AuthModule } from '../auth';
import { FilesModule } from '../files';
import { SdkModule } from '../sdk/sdk.module';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ResourceService } from '../resource-config/resource.service';
import { SdkService } from '../sdk/sdk.service';
import { ModelConfigService } from '../model-config/model-config.service';
import { CrudService } from '../crud/crud.service';
import { TypeConfigService } from '../model-config/type-config.service';

describe('EntryListComponent', () => {
  let component: EntryListComponent;
  let fixture: ComponentFixture<EntryListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        UiModule,
        ResourceModule],
      declarations: [EntryListComponent],
      providers: [
        ModelConfigService,
        CrudService,
        TypeConfigService,
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
    fixture = TestBed.createComponent(EntryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    component.ngOnChanges();
  });

  /* it('should init list', () => {
    component.model = 'muffin';
    return component.createList().then((list) => {
      return expect(list).toBeDefined();
    });
  }); */
});
