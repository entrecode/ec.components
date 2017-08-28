import { Component, EventEmitter, Input, Output } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'ec-month',
  styleUrls: ['month.component.scss'],
  templateUrl: 'month.component.html'
})
export class MonthComponent {
  /** The current selected date */
  @Input() selected: moment.Moment;
  /** The current date (for showing month) */
  @Input() date: moment.Moment;
  /** The current date */
  /** If false, the first line (mixed month days) will be omitted) */
  @Input() head: boolean = true;
  /** If false, the last line (mixed month days) will be omitted) */
  @Input() tail: boolean = true;
  private formatted: string;
  days: Array<{ date, type?, format }>;
  before: Array<{ date, type?, format }>;
  after: Array<{ date, type?, format }>;
  private cells: any;

  @Output() select: EventEmitter<any> = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
    this.setDate();
  }

  ngOnChanges(change) {
    if (change.selected) {
      this.setDate(this.selected);
      return;
    }
    if (change.date) {
      this.setDate(this.date);
    }
  }

  getDays(day = moment(), type?) {
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

  setDate(date = this.selected || this.date || moment()) {
    this.date = date.clone().startOf('month');
    this.formatted = date.format('MMMM YYYY');
    this.days = this.getDays(date.clone(), 'current');
    const start = date.clone().startOf('month');
    const end = date.clone().endOf('month');
    const head = start.weekday(); //how many days should be shown ahead of the first?
    let tail = 7 - end.weekday() - 1; //how many days are needed to fill the week after the last?
    const fill = 42 - tail - this.days.length - head; //days to fill to get 42 total
    tail += fill; //fill up till 42 days (6 rows)
    this.before = head ? this.getDays(date.clone().subtract(1, 'month')).slice(-head) : [];
    this.after = this.getDays(date.clone().add(1, 'month')).slice(0, tail);

    this.cells = [...this.before, ...this.days, ...this.after];

    /*if (!this.head) {
      this.before = []; //TODO
      this.days = this.days.slice(7 - head); // + fill
    }
    if (!this.tail) {
      const overlength = (fill - tail + 7) % 7;
      console.log('over length', overlength);
      this.days = this.days.slice(0, this.days.length - overlength);
      this.after = [];
    }*/
  }

  selectDay(moment) {
    console.log('select', moment.format('DD.MM.YYYY'));
    this.setDate(moment);
    this.selected = moment;
    this.select.emit(moment);
  }

  isSelected(day) {
    if (!this.selected) {
      return;
    }
    return this.selected.startOf('day').diff(day.date, 'days') === 0;
  }

  change(value, span) {
    this.setDate(this.date.add(value, span));
  }

  today() {
    this.setDate(moment());
  }

  registerOnTouched() {

  }

}
