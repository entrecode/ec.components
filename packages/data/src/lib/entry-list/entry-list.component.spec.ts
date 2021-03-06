import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { EntryListComponent } from '../entry-list/entry-list.component';
import { UiModule } from '@ec.components/ui';
import { ResourceModule } from '../resource/resource.module';
import { ModelConfigService } from '../model-config/model-config.service';
import { EntryService } from '../entry/entry.service';
import { TypeConfigService } from '../model-config/type-config.service';
import { ImageSelectPopComponent } from '../files/image-select-pop/image-select-pop.component';

describe('EntryListComponent', () => {
  let component: EntryListComponent;
  let fixture: ComponentFixture<EntryListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [UiModule, ResourceModule],
      declarations: [ImageSelectPopComponent, EntryListComponent],
      providers: [
        ModelConfigService,
        EntryService,
        TypeConfigService,
        {
          provide: 'environment',
          useValue: {
            environment: 'live',
          },
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /* it('should create', () => {
    expect(component).toBeTruthy();
    component.ngOnChanges();
  }); */

  /* it('should init list', () => {
    component.model = 'muffin';
    return component.createList().then((list) => {
      return expect(list).toBeDefined();
    });
  }); */
});
