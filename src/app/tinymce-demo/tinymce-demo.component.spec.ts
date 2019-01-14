import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TinymceDemoComponent } from './tinymce-demo.component';

describe('TinymceDemoComponent', () => {
  let component: TinymceDemoComponent;
  let fixture: ComponentFixture<TinymceDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TinymceDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TinymceDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
