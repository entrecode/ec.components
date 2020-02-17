import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DatetimePipe } from '../datetime.pipe';
import { CalendarComponent } from './calendar.component';
import { HeatmapComponent } from '../heatmap/heatmap.component';
import { DaterangeComponent } from '../daterange/daterange.component';
import { MonthComponent } from './month.component';
import { CommonModule } from '@angular/common';

describe('MonthComponent', () => {
  let component: MonthComponent;
  let fixture: ComponentFixture<MonthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule],
      declarations: [DatetimePipe, CalendarComponent, HeatmapComponent, DaterangeComponent, MonthComponent],
      providers: [
        {
          provide: 'moment.format.date',
          useValue: 'DD.MM.YYYY',
        },
        {
          provide: 'moment.format.time',
          useValue: 'HH:mm',
        },
        {
          provide: 'moment.format.month',
          useValue: 'MMMM YYYY',
        },
      ],
    }).compileComponents();
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
