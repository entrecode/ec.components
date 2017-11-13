import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DataModule, EntryListComponent } from '../../index';
import { UiModule } from '@ec.components/ui';

describe('EntryListComponent', () => {
  let component: EntryListComponent;
  let fixture: ComponentFixture<EntryListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [UiModule, DataModule]
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
