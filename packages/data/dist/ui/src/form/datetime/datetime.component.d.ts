import { ControlValueAccessor, FormControl } from '@angular/forms';
import * as moment from 'moment';
import { MonthComponent } from './month.component';
import { PopComponent } from '../../pop/pop.component';
/** Input for a datetime. */
export declare class DatetimeComponent implements ControlValueAccessor {
    /** The date that should be displayed at start. */
    date: moment.Moment;
    /** The form control that holds the date */
    formControl: FormControl;
    /** The current value of the input */
    value: string;
    /** The calendar view child. */
    calendar: MonthComponent;
    /** The dropdown pop with the calendar*/
    pop: PopComponent;
    /** Array of the days of a week. */
    weekdays: string[];
    /** The input's placeholder */
    placeholder: string;
    /** If true, the time will not be displayed nor will be editable. */
    disableTime: boolean;
    /** Allowed date input patterns. The first one will be standard. */
    private patterns;
    /** Sets the input format of the time */
    private timeFormat;
    /** The constructor gets the weekdays for the calendar header and instantiates the allowed input patterns.*/
    constructor();
    getPattern(moment: any): any;
    /** Updates the value with the given moment and propagates the change. */
    select(selected: any): void;
    /** Called upon input value change by the user. */
    input(e: any): void;
    /** Selects the given Date when the model changes. */
    writeValue(value: Date): string;
    /** Change propagation for ControlValueAccessor */
    propagateChange: (_: any) => void;
    /** registerOnChange implementation of ControlValueAccessor */
    registerOnChange(fn: any): void;
    /** registerOnTouched implementation of ControlValueAccessor */
    registerOnTouched(): void;
}
