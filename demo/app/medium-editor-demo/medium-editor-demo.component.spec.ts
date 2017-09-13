import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MediumEditorDemoComponent } from './medium-editor-demo.component';

describe('MediumEditorDemoComponent', () => {
  let component: MediumEditorDemoComponent;
  let fixture: ComponentFixture<MediumEditorDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MediumEditorDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediumEditorDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
