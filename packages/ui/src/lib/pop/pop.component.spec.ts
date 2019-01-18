import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PopComponent } from './pop.component';
import { popModuleConfig } from './pop.module';

describe('PopComponent', () => {
  let component: PopComponent;
  let fixture: ComponentFixture<PopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule(popModuleConfig)
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
