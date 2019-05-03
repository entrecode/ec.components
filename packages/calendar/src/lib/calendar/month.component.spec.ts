import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MonthComponent } from './month.component';
import { calendarModuleConfig } from '../calendar.module';

describe('MonthComponent', () => {
  let component: MonthComponent;
  let fixture: ComponentFixture<MonthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule(calendarModuleConfig).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the correct number of days', () => {
    expect(component['cells'].length).toBe(42);
  });
});
