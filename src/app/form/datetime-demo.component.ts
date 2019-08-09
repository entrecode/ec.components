import { Component } from '@angular/core';
import moment from 'moment-es6';
/* import { events } from './events'; */

@Component({
  template: `
    <h2>Datetime Component</h2>
    <p>pop with calendar inside</p>
    <ec-datetime></ec-datetime>
    <h2>Calendar: {{ calendar.value }}</h2>
    <p>controls + month grid inside</p>
    <ec-calendar #calendar></ec-calendar>
    <h2>Month Heatmap</h2>
    <ec-heatmap [selectSpan]="selectSpan"
    [disableDrag]="false" (spanChanged)="changedSpan($event)" [timestamps]="timestamps"></ec-heatmap>
    <h2>Month</h2>
    <p>Just month grid</p>
    <ec-month #month></ec-month>
    {{ month.date }}
  `,
})
export class DatetimeDemoComponent {
  timestamps;
  selectSpan = [moment().subtract(32, 'days'), moment().subtract(16, 'days')];

  constructor() {
    /*     this.timestamps = events.map(e => e.timestamp); */
    this.timestamps = [moment().subtract(18, 'days'), moment().subtract(25, 'days')].map((d) => d.toISOString());
  }
  changedSpan(span) {
    console.log('span', span.map((m) => m.toISOString()));
  }
}
