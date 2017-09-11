import { EventEmitter } from '@angular/core';
import * as moment from 'moment';
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
export declare class MonthComponent {
    /** The current selected date */
    selected: moment.Moment;
    /** The current date (for showing month) */
    date: moment.Moment;
    /** The current month as string */
    private formatted;
    /** The cells containing the days */
    cells: Array<Day>;
    /** Emits when the selected day changes. */
    select: EventEmitter<any>;
    /** Initializes the calendar. */
    ngOnInit(): void;
    /** When changing the date or selected input, the calendar will update its view to display the month containing it. */
    ngOnChanges(change: any): void;
    /** Returns an Array of days in the given moment's month. */
    getDays(day?: moment.Moment, type?: string): Array<Day>;
    /** Sets the calendars viewed date to the given moment's month. Renders always 42 cells to keep the layout consistent. */
    setDate(date?: moment.Moment): void;
    /** Selects the day of the given moment. */
    selectDay(moment: moment.Moment): void;
    /** Clears the current selected date*/
    clearSelection(): void;
    /** Returns true if the given moment is currently selected (on a day basis) */
    isSelected(moment: moment.Moment): boolean;
    /** Updates the viewed date to reflect the given relative changes. */
    change(value: any, span: string): void;
    /** Sets the current viewed date to today. */
    today(): void;
}
