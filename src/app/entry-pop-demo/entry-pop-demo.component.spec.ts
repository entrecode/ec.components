import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntryPopDemoComponent } from './entry-pop-demo.component';

describe('EntryPopDemoComponent', () => {
  let component: EntryPopDemoComponent;
  let fixture: ComponentFixture<EntryPopDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntryPopDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntryPopDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
