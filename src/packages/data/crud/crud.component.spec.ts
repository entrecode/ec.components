import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CrudComponent } from './crud.component';
import { EntryListComponent } from '../entry-list/entry-list.component';
import { EntryFormComponent } from '../entry-form/entry-form.component';
import { UiModule } from '../../ui/ui.module';
import { ModelConfig } from '../model-config/model-config';
import { CrudService } from './crud.service';
import { SdkService } from '../sdk/sdk.service';

describe('CrudComponent', () => {
  let component: CrudComponent;
  let fixture: ComponentFixture<CrudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [UiModule],
      declarations: [EntryFormComponent, EntryListComponent, CrudComponent],
      providers: [ModelConfig, CrudService, SdkService]
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
