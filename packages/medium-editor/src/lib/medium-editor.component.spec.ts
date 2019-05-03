import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { mediumModuleConfig } from './medium-editor.module';
import { MediumEditorComponent } from './medium-editor.component';

describe('MediumEditorComponent', () => {
  let component: MediumEditorComponent;
  let fixture: ComponentFixture<MediumEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule(mediumModuleConfig).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediumEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
