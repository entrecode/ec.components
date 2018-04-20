import { Component } from '@angular/core';

@Component({
  template: `
  <h2>Datetime Component</h2>
  <p>pop with calendar inside</p>
  <ec-datetime [(ngModel)]="myDate"></ec-datetime>
{{myDate}}
  <h2>Calendar: {{calendar.value}}</h2>
  <p>controls + month grid inside</p>
  <ec-calendar #calendar></ec-calendar>

  <h2>Month</h2>
  <p>Just month grid</p>
  <ec-month #month></ec-month>
  {{month.date}}
`
})
export class DatetimeDemoComponent {
  constructor() {
  }
}
