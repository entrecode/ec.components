import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MediumEditorDemoComponent } from './medium-editor-demo.component';
import { demoModuleConfig } from '../demo.module.config';


describe('MediumEditorDemoComponent', () => {
  let component: MediumEditorDemoComponent;
  let fixture: ComponentFixture<MediumEditorDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule(demoModuleConfig).compileComponents();
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
