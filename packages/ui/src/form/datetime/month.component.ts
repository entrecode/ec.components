import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import moment from 'moment-es6';
import { SymbolService } from '@ec.components/ui/src/symbol/symbol.service';

/** Interface for a day inside the a month. */
export interface Day {
  /** The moment that is represented by the day. */
  date: moment.Moment;
  /** Can be given a type, to set a class. */
  type?: string;
  /** The formatted day number. */
  format: string;
  /** Flag that is true if the day is today. */
  today: boolean;
}

/** Displays the days of a month in a calendarish table. */
@Component({
  selector: 'ec-month',
  styleUrls: ['month.component.scss'],
  templateUrl: 'month.component.html'
})
export class MonthComponent implements OnInit, OnChanges {
  /** The current selected date */
  @Input() selected: moment.Moment;
  /** Color array for day cells. E.g. to view a month heatmap */
  @Input() colors: Object;
  /** Array of timestamps that should be turned into a heatmap */
  @Input() timestamps: string[] = [];
  /** The current date (for showing month) */
  @Input() date: moment.Moment;
  /** The current month as string */
  public formatted: string;
  /** The cells containing the days */
  public cells: Array<Day>;
  /** Format for month in header */
  public monthFormat = 'MMMM YYYY';
  /** Emits when the selected day changes. */
  @Output() dayClicked: EventEmitter<any> = new EventEmitter();

  constructor(private symbol: SymbolService) {
    this.monthFormat = this.symbol.resolve('moment.format.month') || this.monthFormat;
  }

  getDayColor(_moment: moment.Moment) {
    if (this.colors && this.colors[_moment.toISOString()]) {
      return this.colors[_moment.toISOString()];
    }
  }

  /** Initializes the calendar. */
  ngOnInit() {
    this.setDate();
    this.updateHeatmap();
  }

  /** When changing the date or selected input, the calendar will update its view to display the month containing it. */
  ngOnChanges(change) {
    if (change.selected) {
      this.setDate(this.selected);
      return;
    }
    if (change.date) {
      this.setDate(this.date);
    }
    if (change.timestamps) {
      this.updateHeatmap();
    }
  }

  /** Returns an Array of days in the given moment's month. */
  getDays(day = moment(), type?: string): Array<Day> {
    const begin = day.startOf('month');
    return new Array(day.daysInMonth())
      .fill(0)
      .map((d, index) => begin.clone().add(index, 'days'))
      .map((date) => ({
        date,
        type,
        format: date.format('DD'),
        today: moment().startOf('day').diff(date, 'days') === 0,
      }));
  }

  /** Sets the calendars viewed date to the given moment's month. Renders always 42 cells to keep the layout consistent. */
  setDate(date: moment.Moment = this.selected || this.date || moment()) {
    this.date = date.clone();
    this.formatted = date.format(this.monthFormat);
    const days = this.getDays(date.clone(), 'current');
    const start = date.clone().startOf('month');
    const end = date.clone().endOf('month');
    const head = start.weekday(); // how many days should be shown ahead of the first?
    let tail = 7 - end.weekday() - 1; // how many days are needed to fill the week after the last?
    const fill = 42 - tail - days.length - head; // days to fill to get 42 total
    tail += fill; // fill up till 42 days (6 rows)
    const before = head ? this.getDays(date.clone().subtract(1, 'month')).slice(-head) : [];
    const after = this.getDays(date.clone().add(1, 'month')).slice(0, tail);
    this.cells = [...before, ...days, ...after];
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

  /** Updates the viewed date to reflect the given relative changes. */
  change(value, span: string): void {
    this.setDate(this.date.clone().add(value, span));
  }

  /** Sets the current viewed date to today. */
  today(): void {
    this.setDate(moment());
  }

  toShade(count, max = 100, digits = 2) {
    if (max === 0) {
      return 0;
    }
    const grain = Math.pow(10, digits);
    return Math.floor((1 - count / max) * grain) / grain * 100;
  }

  getHeatMap(timestamps, hue = 67, saturation = 50, factor = 1.5) { // iso timestamps
    const dates = timestamps
      .map(timestamp => moment(timestamp).startOf('day').toISOString())
      .reduce((counts, date) => Object.assign(counts, {
        [date]: ++counts[date] || 0
      }), {});
    const max = dates[Object.keys(dates).sort((a, b) => dates[a] > dates[b] ? -1 : 1)[0]];
    return Object.keys(dates).reduce((colors, date) => {
      return Object.assign(colors, {
        [date]: `hsl(${hue},${saturation}%,${this.toShade(dates[date], max * factor)}%)`
      })
    }, {});
  }

  updateHeatmap() {
    if (!this.timestamps) {
      this.colors = [];
      return;
    }
    this.colors = this.getHeatMap(this.timestamps);
  }
}
