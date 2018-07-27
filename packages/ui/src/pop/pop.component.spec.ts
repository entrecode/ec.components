import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UiModule } from '../..';
import { PopComponent } from './pop.component';

describe('PopComponent', () => {
  let component: PopComponent;
  let fixture: ComponentFixture<PopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [UiModule]
    })
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
    expect(component.visible).toBe(false);
  });
});
