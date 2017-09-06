import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DataModule } from '..';
import { UiModule } from '@ec.components/ui';
import { EntriesComponent } from './entries.component';

describe('EntriesComponent', () => {
  let component: EntriesComponent;
  let fixture: ComponentFixture<EntriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [UiModule, DataModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    component.ngOnChanges();
  });

  it('should load entry when setting model and id', () => {
    /*const s = sinon.stub(Datamanager, 'entries');
    const mockEntries = muffinList.entries;
    s.returns(Promise.resolve(mockEntries));
    component.model = 'muffin';
    component.ngOnChanges();
    expect(component.promise).toBeDefined();
    return component.promise.then((entries) => {
      expect(component.entries).toBe(mockEntries);
    });*/
  })
});
