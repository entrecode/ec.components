import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CalendarComponent } from './month.component';
import { FormModule } from '../form.module';

fdescribe('CalendarComponent', () => {
  let component: CalendarComponent;
  let fixture: ComponentFixture<CalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the correct number of days', () => {
    const cells = component.before.length + component.days.length + component.after.length;
    expect((cells === 42)).toBe(true);
  })
});
