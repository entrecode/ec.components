import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DataModule } from '..';
import { UiModule } from '../../ui';
import { EntryComponent } from './entry.component';

describe('EntryComponent', () => {
  let component: EntryComponent;
  let fixture: ComponentFixture<EntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [UiModule, DataModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    component.ngOnChanges();
  });

  it('should load entry when setting model and id', () => {
    //TODO mock new entry resource
    /*const s = sinon.stub(Datamanager, 'entry');
    const mockEntry = muffinList.entries[0];
    s.returns(Promise.resolve(mockEntry));
    component.model = 'muffin';
    component.id = 'SkXEhDZ5yW';
    component.ngOnChanges();
    expect(component.promise).toBeDefined();
    return component.promise.then((entry) => {
      expect(component.entry).toBe(mockEntry);
    });*/
  })
});
