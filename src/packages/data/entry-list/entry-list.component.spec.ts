import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DataModule, EntryListComponent } from '..';
import { UiModule } from '../../ui';
import sinon = require('sinon');

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

  it('should construct list when setting model', () => {
    component.model = 'muffin';
    component.ngOnChanges();
    expect(component.list).toBeDefined();
  })
});
