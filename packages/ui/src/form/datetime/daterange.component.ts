import { Component, OnInit, Input } from '@angular/core';
import moment from 'moment-es6';
import { MonthComponent } from './month.component';

@Component({
    selector: 'ec-daterange',
    templateUrl: './daterange.component.html',
})

export class DaterangeComponent extends MonthComponent implements OnInit {
    /** The date that should be displayed at start. */
    @Input() date: moment.Moment = moment();
    /** span of moments which is reflected */
    @Input() timespan: moment.Moment[];

    ngOnInit() { }
}
