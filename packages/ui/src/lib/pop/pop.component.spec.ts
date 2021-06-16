import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PopComponent } from './pop.component';
import { CommonModule } from '@angular/common';
import { IconModule, ModalComponent, PopService } from '../../public_api';

describe('PopComponent', () => {
  let component: PopComponent;
  let fixture: ComponentFixture<PopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PopComponent, ModalComponent],
      imports: [CommonModule, IconModule],
      providers: [PopService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /* it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle', () => {
    expect(component.active).toBeUndefined();
    component.toggle();
    expect(component.active).toBe(true);
    component.toggle();
  }); */
  /* it('should hide', () => {
    expect(component.active).toBeUndefined();
    component.show();
    expect(component.active).toBe(true);
    component.hide();
    expect(component.active).toBe(false);
  }); */
});
