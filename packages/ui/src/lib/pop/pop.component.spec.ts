import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PopComponent } from './pop.component';
import { uiModuleConfig } from '../ui.module';

describe('PopComponent', () => {
  let component: PopComponent;
  let fixture: ComponentFixture<PopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule(uiModuleConfig)
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle', () => {
    expect(component.active).toBeUndefined();
    component.toggle();
    expect(component.active).toBe(true);
    component.toggle();
  });
  it('should hide', () => {
    expect(component.active).toBeUndefined();
    component.show();
    expect(component.active).toBe(true);
    component.hide();
    expect(component.active).toBe(false);
  });
});
