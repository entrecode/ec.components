import { Component, EventEmitter, Input, OnChanges, OnInit, Output, Inject } from '@angular/core';
/* import { SymbolService } from '../../symbol/symbol.service'; */
import moment from 'moment-es6';
import { debounceTime } from 'rxjs/operators';
import { Subject } from 'rxjs';

/** Interface for a day inside the a month.
 * <example-url>https://components.entrecode.de/ui/datetime?e=1</example-url>
 * */
export interface Day {
  /** The cell index */
  index: number;
  /** The moment that is represented by the day. */
  date: moment.Moment;
  /** Can be given a type, to set a class. */
  type?: string;
  /** The formatted day number. */
  format: string;
  /** Flag that is true if the day is today. */
  today: boolean;
  /** if the day is the first in the timespan */
  first: boolean;
  /** if the day is the last in the timespan */
  last: boolean;
  /** determines if the day can be dragged to change the timespan */
  draggable: boolean;
  /** custom class */
  heat?: string;
}

/** Displays the days of a month in a calendarish table. */
@Component({
  selector: 'ec-month',
  templateUrl: 'month.component.html'
})
export class MonthComponent implements OnInit, OnChanges {
  dragged: any;
  /** The current selected date */
  @Input() selected: moment.Moment;
  /** Color mapping for day cells. E.g. to view a month heatmap */
  @Input() colors: Object;
  /** Class mapping for day cells. E.g. to apply different background classes */
  @Input() heatmap: Object;
  /** Timespan that is reflected. Marks days inside the span */
  @Input() timespan: moment.Moment[];
  /** The current date (for showing month) */
  @Input() date: moment.Moment;
  /** The color of days that are inside the timespan */
  @Input() spancolor = '#ccc';
  /** If true, the timespan start cannot be dragged */
  @Input() disableDragStart = false;
  /** If true, the timespan end cannot be dragged */
  @Input() disableDragEnd = false;
  /** The current month as string */
  public formatted: string;
  /** The cells containing the days */
  public cells: Array<Day>;
  /** Format for month in header */
  public monthFormat = 'MMMM YYYY';
  /** Emits when the selected day changes. */
  @Output() dayClicked: EventEmitter<any> = new EventEmitter();
  /** Changed Timespan selection */
  @Output() spanChanged: EventEmitter<any> = new EventEmitter();

  protected drag: Subject<Day> = new Subject();
  protected changeSpan: Subject<moment.Moment[]> = new Subject();

  constructor(
    @Inject('moment.format.month') protected defaultMonthFormat
    /* public symbol: SymbolService */
  ) {
    /* this.monthFormat = this.symbol.resolve('moment.format.month') || this.monthFormat; */
    this.monthFormat = this.defaultMonthFormat || this.monthFormat;
    this.drag.asObservable()
      .pipe(debounceTime(100))
      .subscribe((day) => this.dropDay(day));
    this.changeSpan.asObservable().pipe(debounceTime(800))
      .subscribe(timespan => this.spanChanged.emit(this.timespan));
  }

  dropDay(day: Day) {
    if (!this.dragged || (day.first && this.dragged.first || day.last && this.dragged.last)) {
      return;
    }
    const newTimespan = [].concat(this.timespan);
    newTimespan[this.dragged.first ? 0 : 1] = day.date.clone();
    if (newTimespan[0].isAfter(newTimespan[1])) {
      this.dragged.first = !this.dragged.first;
      this.dragged.last = !this.dragged.last;
      newTimespan.reverse();
    }
    this.timespan = newTimespan;
    this.changeSpan.next(this.timespan);
    /* if (this.cells[0] === day || this.cells[this.cells.length - 1] === day) {
      // change month if dragging to edge
      this.setDate(day.date.clone().subtract(1, 'days'));
    } else {
      this.setDate();
    } */
    this.setDate();
  }

  dragStart(day, e) {
    if ((this.disableDragStart && day.first) || (this.disableDragEnd && day.last)) {
      return;
    }
    this.dragged = day;
    e.preventDefault();
  }

  mouseUp(day, e) {
    if (!this.dragged) {
      return;
    }
    delete this.dragged;
    e.preventDefault();
  }

  mouseOver(day, e) {
    if (!this.dragged || this.dragged === day) {
      return;
    }
    e.preventDefault();
    this.drag.next(day);
  }

  getDayColor(_moment: moment.Moment) {
    if (this.colors && this.colors[_moment.toISOString()]) {
      return this.colors[_moment.toISOString()];
    }
  }

  getDayHeat(_moment: moment.Moment) {
    if (this.heatmap && this.heatmap[_moment.toISOString()]) {
      return this.heatmap[_moment.toISOString()];
    }
  }

  /** Initializes the calendar. */
  ngOnInit() {
    this.setDate();
  }

  /** When changing the date or selected input, the calendar will update its view to display the month containing it. */
  ngOnChanges(change) {
    if (change.selected) {
      this.setDate(this.selected);
      return;
    } else if (change.date) {
      this.setDate(this.date);
    } else if (change.timespan) {
      this.setDate();
    } if (change.colors || change.heatmap) {
      this.cells = this.getMonth(this.date.clone(), 'current');
    }
  }

  /** Returns days of current month */
  getMonth(day = moment(), type?: string): Array<Day> {
    const begin = day.clone().startOf('month').startOf('week'); // .subtract(weeksbefore * 7, 'days');
    return new Array(42)
      .fill(0)
      .map((d, index) => begin.clone().add(index, 'days'))
      .map((date, index) => {
        const isStart = this.timespan && date.clone().startOf('day').isSame(this.timespan[0].clone().startOf('day'));
        const isEnd = this.timespan && date.clone().startOf('day').isSame(this.timespan[1].clone().startOf('day'));
        return {
          index,
          date,
          type: date.format('MM YYYY') === day.format('MM YYYY') ? 'current' : 'other',
          active: this.timespan && date.isBetween(this.timespan[0], this.timespan[1], 'days', '[]'),
          first: isStart,
          last: isEnd,
          draggable: (!this.disableDragStart && isStart) || (!this.disableDragEnd && isEnd),
          color: this.getDayColor(date),
          heat: this.getDayHeat(date),
          format: date.format('DD'),
          today: moment().startOf('day').diff(date, 'days') === 0,
        };
      });
  }


  /** Sets the calendars viewed date to the given moment's month. Renders always 42 cells to keep the layout consistent. */
  setDate(date: moment.Moment = this.selected || this.date || moment()) {
    this.date = date.clone();
    this.formatted = date.format(this.monthFormat);
    this.cells = this.getMonth(date.clone(), 'current');
  }

  /** Selects the day of the given moment. */
  selectDay(_moment: moment.Moment): void {
    this.setDate(_moment);
    this.selected = _moment;
    this.dayClicked.emit(_moment);
  }

  /** Clears the current selected date*/
  clearSelection(): void {
    delete this.selected;
  }

  /** Returns true if the given moment is currently selected (on a day basis) */
  isSelected(_moment: moment.Moment): boolean {
    if (!this.selected) {
      return;
    }
    return this.selected.startOf('day').diff(_moment, 'days') === 0;
  }

  canAlter(value, span: string) {
    if (!this.timespan) {
      return true;
    }
    const newDate = this.date.clone().add(value, span);
    return newDate.isBetween(this.timespan[0], this.timespan[1], 'months', '[]');
  }

  /** Updates the viewed date to reflect the given relative changes. */
  alter(value, span: string): void {
    if (!this.canAlter(value, span)) {
      return;
    }
    this.setDate(this.date.clone().add(value, span));
  }

  /** Sets the current viewed date to today. */
  today(): void {
    this.setDate(moment());
  }
}
