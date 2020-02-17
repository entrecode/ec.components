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
  /** custom class */
  heat?: string;
}

/** Displays the days of a month in a calendarish table. */
@Component({
  selector: 'ec-month',
  templateUrl: 'month.component.html',
})
export class MonthComponent implements OnInit, OnChanges {
  dragged: any;
  move: boolean;
  todayMoment = moment();
  /** The current selected date */
  @Input() selected: moment.Moment;
  /** Color mapping for day cells. E.g. to view a month heatmap */
  @Input() colors: Object;
  /** Class mapping for day cells. E.g. to apply different background classes */
  @Input() heatmap: Object;
  /** Timespan that is reflected. Marks days inside the span */
  @Input() timespan: moment.Moment[];
  /** Timespan in which the dates can be selected. */
  @Input() selectSpan: moment.Moment[];
  /** The current date (for showing month) */
  @Input() date: moment.Moment;
  /** The color of days that are inside the timespan */
  @Input() spancolor = '#ccc';
  /** If true, the timespan start cannot be dragged */
  @Input() disableDragStart = false;
  /** If true, the timespan end cannot be dragged */
  @Input() disableDragEnd = false;
  /** If true, cannot drag anywhere to select a span (can still drag start and end, if not disabled too) */
  @Input() disableDragAnywhere = false;
  /** If true, no dragging can be done at all (other drag flags will be ignored) */
  @Input() disableDrag = false;
  /** If true, nothing can be changed */
  @Input() disabled;
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

  protected changeSpan: Subject<moment.Moment[]> = new Subject();

  /* public symbol: SymbolService */
  constructor(@Inject('moment.format.month') protected defaultMonthFormat) {
    /* this.monthFormat = this.symbol.resolve('moment.format.month') || this.monthFormat; */
    this.monthFormat = this.defaultMonthFormat || this.monthFormat;
    this.changeSpan
      .asObservable()
      .pipe(debounceTime(500))
      .subscribe((timespan) => {
        this.spanChanged.emit(this.timespan);
      });
  }

  isDraggable(day) {
    return !this.disabled &&
      !this.disableDrag &&
      (
        (!this.disableDragAnywhere || this.isInTimeSpan(day.date)) ||
        ((day.first && !this.disableDragStart) || day.last && !this.disableDragEnd)
      );
  }

  dragOverDay(day: Day, e?) {
    if (!this.dragged) {
      return;
    }
    this.selected = null;

    /*  if (day.date.isSame(this.dragged.date)) {
       return;
     } */
    if (!day || !this.isSelectable(day.date)) {
      return;
    }
    let newTimespan;
    if (this.move) {
      const moved = day.date.diff(this.dragged.date, 'days');
      newTimespan = [this.timespan[0].clone().add(moved, 'days'), this.timespan[1].clone().add(moved, 'days')];
      this.dragged = day;
    } else {
      newTimespan = [].concat(this.timespan);
      newTimespan[this.dragged.first ? 0 : 1] = day.date.clone();
    }

    if (this.selectSpan && (
      newTimespan[0].isBefore(this.selectSpan[0].startOf('day')) || newTimespan[1].isAfter(this.selectSpan[1].endOf('day'))
    )) {
      return;
    }

    if (newTimespan[0].isSame(this.timespan[0]) && newTimespan[1].isSame(this.timespan[1])) {
      // nothing changes => no need to rerender
      return;
    }
    if (newTimespan[0].isAfter(newTimespan[1])) {
      this.dragged.first = !this.dragged.first;
      this.dragged.last = !this.dragged.last;
      newTimespan.reverse();
    }
    this.timespan = newTimespan;
    // this.changeSpan.next(this.timespan);

    this.setDate();

    /* if (this.cells[0] === day || this.cells[this.cells.length - 1] === day) {
      // change month if dragging to edge
      this.setDate(day.date.clone().subtract(1, 'days'));
    } else {
      this.setDate();
    } */

    /* this.cells = this.getMonth(this.date, 'current'); */
  }

  isInTimeSpan(date) {
    return this.timespan && date.isBetween(this.timespan[0], this.timespan[1], 'days', '][');
  }

  dragStart(day, e) {
    if (this.disabled || !this.isDraggable(day)) {
      return;
    }
    e.preventDefault();
    this.dragged = day;
    this.move = false;
    if (!day.first && !day.last) {
      if (this.isInTimeSpan(day.date)) {
        this.move = true;
        return;
      }
      this.timespan = [day.date, day.date];
      this.setDate();
    }
  }

  mouseUp(day, e) {
    if (!this.dragged) {
      return;
    }
    delete this.dragged;
    this.changeSpan.next(this.timespan);
    e.preventDefault();
  }

  mouseOver(day, e) {
    if (!this.dragged || this.dragged === day) {
      return;
    }
    e.preventDefault();
    this.dragOverDay(day, e);
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
    } else if (change.timespan || change.selectSpan) {
      this.setDate();
    }
    if (change.colors || change.heatmap) {
      this.cells = this.getMonth(this.date.clone(), 'current');
    }
  }

  /** Returns days of current month */
  getMonth(day = moment(), type?: string): Array<Day> {
    const begin = day
      .clone()
      .startOf('month')
      .startOf('week'); // .subtract(weeksbefore * 7, 'days');
    return new Array(42)
      .fill(0)
      .map((d, index) => begin.clone().add(index, 'days'))
      .map((date, index) => {
        const isStart =
          this.timespan &&
          date
            .clone()
            .startOf('day')
            .isSame(this.timespan[0].clone().startOf('day'));
        const isEnd =
          this.timespan &&
          date
            .clone()
            .startOf('day')
            .isSame(this.timespan[1].clone().startOf('day'));
        return {
          index,
          date,
          type: date.format('MM YYYY') === day.format('MM YYYY') ? 'current' : 'other',
          active: this.timespan && date.isBetween(this.timespan[0], this.timespan[1], 'days', '[]'),
          first: isStart,
          last: isEnd,
          selectable: this.isSelectable(date),
          inside: this.isInTimeSpan(date),
          color: this.getDayColor(date),
          heat: this.getDayHeat(date),
          format: date.format('DD'),
          today:
            moment()
              .startOf('day')
              .diff(date, 'days') === 0,
        };
      });
  }

  /** Sets the calendars viewed date to the given moment's month. Renders always 42 cells to keep the layout consistent. */
  setDate(date: moment.Moment = this.selected || this.date) {
    if (date && date !== this.date) {
      this.date = date.clone();
    }
    if (!date) {
      this.date = this.selectSpan ? this.selectSpan[1].clone() : moment();
    }
    this.formatted = this.date.format(this.monthFormat);
    this.cells = this.getMonth(this.date.clone(), 'current');
  }

  /** Selects the day of the given moment. */
  selectDay(_moment: moment.Moment, emit = true): void {
    if (this.disabled || !this.isSelectable(_moment)) {
      return;
    }
    if (!this.disableDragAnywhere) {
      this.timespan = [_moment, _moment];
      this.spanChanged.emit(this.timespan);
    } /* else if (!this.isInTimeSpan(_moment)) {
      if (_moment.isBefore(this.timespan[0])) {
        this.timespan = [_moment, this.timespan[1]];
      } else if (_moment.isAfter(this.timespan[1])) {
        this.timespan = [this.timespan[0], _moment];
      }
      this.spanChanged.emit(this.timespan);
    } */ else if (!this.timespan) {
      this.selected = _moment;
    }
    this.setDate(_moment);
    if (emit) {
      this.dayClicked.emit(_moment);
    }
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

  isSelectable(date, span = 'days') {
    return !this.selectSpan || date.isBetween(this.selectSpan[0], this.selectSpan[1], span, '[]');
  }

  canAlter(value, span: string) {
    const newDate = this.date?.clone().add(value, span);
    return this.isSelectable(newDate, 'months');
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

  /** Sets the current selected date to today. */
  setToday(): void {
    this.selectDay(moment());
  }
}
