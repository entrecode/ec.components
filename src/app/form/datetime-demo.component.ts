import { Component } from '@angular/core';
import moment from 'moment-es6';
/* import { events } from './events'; */

@Component({
  template: `
  <h2>Datetime Component</h2>
  <p>pop with calendar inside</p>
  <ec-datetime></ec-datetime>
  <h2>Calendar: {{calendar.value}}</h2>
  <p>controls + month grid inside</p>
  <ec-calendar #calendar></ec-calendar>

  <h2>Month Heatmap</h2>
  <ec-heatmap [timestamps]="timestamps"></ec-heatmap>

  <h2>Month</h2>
  <p>Just month grid</p>
  <ec-month #month></ec-month>
  {{month.date}}

`
})
export class DatetimeDemoComponent {
  timestamps;

  constructor() {
    /*     this.timestamps = events.map(e => e.timestamp); */
    this.timestamps = [
      moment().subtract(1, 'day'),
      moment(),
      moment().add(1, 'day'),
    ].map(d => d.toISOString());
  }
}
