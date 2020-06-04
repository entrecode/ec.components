import { __decorate, __metadata, __param } from 'tslib';
import { EventEmitter, Inject, Input, Output, Component, ViewChild, forwardRef, Pipe, NgModule } from '@angular/core';
import moment from 'moment-es6';
import { debounceTime } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonModule } from '@angular/common';

/** Displays the days of a month in a calendarish table. */
import * as ɵngcc0 from '@angular/core';
import * as ɵngcc1 from '@angular/common';

function MonthComponent_li_1_Template(rf, ctx) { if (rf & 1) {
    const _r4 = ɵngcc0.ɵɵgetCurrentView();
    ɵngcc0.ɵɵelementStart(0, "li", 2);
    ɵngcc0.ɵɵlistener("dragstart", function MonthComponent_li_1_Template_li_dragstart_0_listener($event) { ɵngcc0.ɵɵrestoreView(_r4); const day_r1 = ctx.$implicit; const ctx_r3 = ɵngcc0.ɵɵnextContext(); return ctx_r3.dragStart(day_r1, $event); })("click", function MonthComponent_li_1_Template_li_click_0_listener($event) { ɵngcc0.ɵɵrestoreView(_r4); const day_r1 = ctx.$implicit; const ctx_r5 = ɵngcc0.ɵɵnextContext(); return ctx_r5.selectDay(day_r1.date); })("mouseover", function MonthComponent_li_1_Template_li_mouseover_0_listener($event) { ɵngcc0.ɵɵrestoreView(_r4); const day_r1 = ctx.$implicit; const ctx_r6 = ɵngcc0.ɵɵnextContext(); return ctx_r6.mouseOver(day_r1, $event); })("mouseup", function MonthComponent_li_1_Template_li_mouseup_0_listener($event) { ɵngcc0.ɵɵrestoreView(_r4); const day_r1 = ctx.$implicit; const ctx_r7 = ɵngcc0.ɵɵnextContext(); return ctx_r7.mouseUp(day_r1, $event); });
    ɵngcc0.ɵɵelementStart(1, "div", 3);
    ɵngcc0.ɵɵtext(2);
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const day_r1 = ctx.$implicit;
    const ctx_r0 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵclassProp("is-active", day_r1.active)("is-last", day_r1.last)("is-first", day_r1.first)("is-inside-timespan", day_r1.inside && !day_r1.last && !day_r1.first)("is-draggable", ctx_r0.isDraggable(day_r1))("is-disabled", day_r1.disabled)("heat-none", day_r1.heat === 0)("heat-low", day_r1.heat > 0 && day_r1.heat < 30)("heat-medium", day_r1.heat >= 30 && day_r1.heat < 70)("heat-high", day_r1.heat >= 70 && day_r1.heat < 90)("heat-extreme", day_r1.heat >= 90);
    ɵngcc0.ɵɵproperty("draggable", ctx_r0.isDraggable(day_r1));
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵstyleProp("background-color", day_r1.color);
    ɵngcc0.ɵɵclassProp("is-other", day_r1.type !== "current")("is-not-selectable", !day_r1.selectable)("is-today", day_r1.today)("is-selected", ctx_r0.isSelected(day_r1.date));
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵtextInterpolate1(" ", day_r1.class || day_r1.format, " ");
} }
function CalendarComponent_a_21_Template(rf, ctx) { if (rf & 1) {
    const _r12 = ɵngcc0.ɵɵgetCurrentView();
    ɵngcc0.ɵɵelementStart(0, "a", 21);
    ɵngcc0.ɵɵlistener("click", function CalendarComponent_a_21_Template_a_click_0_listener($event) { ɵngcc0.ɵɵrestoreView(_r12); ɵngcc0.ɵɵnextContext(); const _r10 = ɵngcc0.ɵɵreference(29); return _r10.setToday(); });
    ɵngcc0.ɵɵnamespaceSVG();
    ɵngcc0.ɵɵelementStart(1, "svg", 10);
    ɵngcc0.ɵɵelement(2, "use", 22);
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementEnd();
} }
function CalendarComponent_li_27_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementStart(0, "li");
    ɵngcc0.ɵɵtext(1);
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const weekday_r13 = ctx.$implicit;
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵtextInterpolate1(" ", weekday_r13, " ");
} }
let MonthComponent = class MonthComponent {
    /* public symbol: SymbolService */
    constructor(defaultMonthFormat) {
        this.defaultMonthFormat = defaultMonthFormat;
        this.todayMoment = moment();
        /** The color of days that are inside the timespan */
        this.spancolor = '#ccc';
        /** If true, the timespan start cannot be dragged */
        this.disableDragStart = false;
        /** If true, the timespan end cannot be dragged */
        this.disableDragEnd = false;
        /** If true, cannot drag anywhere to select a span (can still drag start and end, if not disabled too) */
        this.disableDragAnywhere = false;
        /** If true, no dragging can be done at all (other drag flags will be ignored) */
        this.disableDrag = false;
        /** Format for month in header */
        this.monthFormat = 'MMMM YYYY';
        /** Emits when the selected day changes. */
        this.dayClicked = new EventEmitter();
        /** Changed Timespan selection */
        this.spanChanged = new EventEmitter();
        this.changeSpan = new Subject();
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
            ((!this.disableDragAnywhere || this.isInTimeSpan(day.date)) ||
                ((day.first && !this.disableDragStart) || day.last && !this.disableDragEnd));
    }
    dragOverDay(day, e) {
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
        }
        else {
            newTimespan = [].concat(this.timespan);
            newTimespan[this.dragged.first ? 0 : 1] = day.date.clone();
        }
        if (this.selectSpan && (newTimespan[0].isBefore(this.selectSpan[0].startOf('day')) || newTimespan[1].isAfter(this.selectSpan[1].endOf('day')))) {
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
    getDayColor(_moment) {
        if (this.colors && this.colors[_moment.toISOString()]) {
            return this.colors[_moment.toISOString()];
        }
    }
    getDayHeat(_moment) {
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
        }
        else if (change.date) {
            this.setDate(this.date);
        }
        else if (change.timespan || change.selectSpan) {
            this.setDate();
        }
        if (change.colors || change.heatmap) {
            this.cells = this.getMonth(this.date.clone(), 'current');
        }
    }
    /** Returns days of current month */
    getMonth(day = moment(), type) {
        const begin = day
            .clone()
            .startOf('month')
            .startOf('week'); // .subtract(weeksbefore * 7, 'days');
        return new Array(42)
            .fill(0)
            .map((d, index) => begin.clone().add(index, 'days'))
            .map((date, index) => {
            const isStart = this.timespan &&
                date
                    .clone()
                    .startOf('day')
                    .isSame(this.timespan[0].clone().startOf('day'));
            const isEnd = this.timespan &&
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
                today: moment()
                    .startOf('day')
                    .diff(date, 'days') === 0,
            };
        });
    }
    /** Sets the calendars viewed date to the given moment's month. Renders always 42 cells to keep the layout consistent. */
    setDate(date = this.selected || this.date) {
        if (date && date !== this.date) {
            this.date = date.clone();
        }
        if (!date) {
            this.date = this.selectSpan ? this.selectSpan[1].clone() : moment();
        }
        setTimeout(() => {
            this.formatted = this.date.format(this.monthFormat);
            this.cells = this.getMonth(this.date.clone(), 'current');
        });
    }
    /** Selects the day of the given moment. */
    selectDay(_moment, emit = true) {
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
        } */
        else if (!this.timespan) {
            this.selected = _moment;
        }
        this.setDate(_moment);
        if (emit) {
            this.dayClicked.emit(_moment);
        }
    }
    /** Clears the current selected date*/
    clearSelection() {
        delete this.selected;
    }
    /** Returns true if the given moment is currently selected (on a day basis) */
    isSelected(_moment) {
        if (!this.selected) {
            return;
        }
        return this.selected.startOf('day').diff(_moment, 'days') === 0;
    }
    isSelectable(date, span = 'days') {
        return !this.selectSpan || date.isBetween(this.selectSpan[0], this.selectSpan[1], span, '[]');
    }
    canAlter(value, span) {
        var _a;
        const newDate = (_a = this.date) === null || _a === void 0 ? void 0 : _a.clone().add(value, span);
        return this.isSelectable(newDate, 'months');
    }
    /** Updates the viewed date to reflect the given relative changes. */
    alter(value, span) {
        if (!this.canAlter(value, span)) {
            return;
        }
        this.setDate(this.date.clone().add(value, span));
    }
    /** Sets the current viewed date to today. */
    today() {
        this.setDate(moment());
    }
    /** Sets the current selected date to today. */
    setToday() {
        this.selectDay(moment());
    }
};
MonthComponent.ɵfac = function MonthComponent_Factory(t) { return new (t || MonthComponent)(ɵngcc0.ɵɵdirectiveInject('moment.format.month')); };
MonthComponent.ɵcmp = ɵngcc0.ɵɵdefineComponent({ type: MonthComponent, selectors: [["ec-month"]], inputs: { spancolor: "spancolor", disableDragStart: "disableDragStart", disableDragEnd: "disableDragEnd", disableDragAnywhere: "disableDragAnywhere", disableDrag: "disableDrag", selected: "selected", timespan: "timespan", date: "date", colors: "colors", heatmap: "heatmap", selectSpan: "selectSpan", disabled: "disabled" }, outputs: { dayClicked: "dayClicked", spanChanged: "spanChanged" }, features: [ɵngcc0.ɵɵNgOnChangesFeature()], decls: 2, vars: 1, consts: [[1, "ec-calendar-days"], [3, "is-active", "is-last", "is-first", "is-inside-timespan", "is-draggable", "is-disabled", "heat-none", "heat-low", "heat-medium", "heat-high", "heat-extreme", "draggable", "dragstart", "click", "mouseover", "mouseup", 4, "ngFor", "ngForOf"], [3, "draggable", "dragstart", "click", "mouseover", "mouseup"], [1, "ec-calendar-day"]], template: function MonthComponent_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵelementStart(0, "ul", 0);
        ɵngcc0.ɵɵtemplate(1, MonthComponent_li_1_Template, 3, 34, "li", 1);
        ɵngcc0.ɵɵelementEnd();
    } if (rf & 2) {
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵproperty("ngForOf", ctx.cells);
    } }, directives: [ɵngcc1.NgForOf], encapsulation: 2 });
MonthComponent.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: ['moment.format.month',] }] }
];
__decorate([
    Input(),
    __metadata("design:type", Object)
], MonthComponent.prototype, "selected", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], MonthComponent.prototype, "colors", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], MonthComponent.prototype, "heatmap", void 0);
__decorate([
    Input(),
    __metadata("design:type", Array)
], MonthComponent.prototype, "timespan", void 0);
__decorate([
    Input(),
    __metadata("design:type", Array)
], MonthComponent.prototype, "selectSpan", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], MonthComponent.prototype, "date", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], MonthComponent.prototype, "spancolor", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], MonthComponent.prototype, "disableDragStart", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], MonthComponent.prototype, "disableDragEnd", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], MonthComponent.prototype, "disableDragAnywhere", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], MonthComponent.prototype, "disableDrag", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], MonthComponent.prototype, "disabled", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], MonthComponent.prototype, "dayClicked", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], MonthComponent.prototype, "spanChanged", void 0);
MonthComponent = __decorate([ __param(0, Inject('moment.format.month')),
    __metadata("design:paramtypes", [Object])
], MonthComponent);

let DaterangeComponent = class DaterangeComponent extends MonthComponent {
    constructor() {
        super(...arguments);
        /** The date that should be displayed at start. */
        this.date = moment();
    }
    ngOnInit() { }
};
DaterangeComponent.ɵfac = function DaterangeComponent_Factory(t) { return ɵDaterangeComponent_BaseFactory(t || DaterangeComponent); };
DaterangeComponent.ɵcmp = ɵngcc0.ɵɵdefineComponent({ type: DaterangeComponent, selectors: [["ec-daterange"]], inputs: { date: "date", timespan: "timespan" }, features: [ɵngcc0.ɵɵInheritDefinitionFeature], decls: 2, vars: 2, consts: [[1, "ec-daterange"], [1, "ec-daterange-start", 3, "timespan", "date", "spanChanged"]], template: function DaterangeComponent_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵelementStart(0, "div", 0);
        ɵngcc0.ɵɵelementStart(1, "ec-calendar", 1);
        ɵngcc0.ɵɵlistener("spanChanged", function DaterangeComponent_Template_ec_calendar_spanChanged_1_listener($event) { return ctx.spanChanged.emit($event); });
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementEnd();
    } if (rf & 2) {
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵproperty("timespan", ctx.timespan)("date", ctx.date);
    } }, directives: function () { return [CalendarComponent]; }, encapsulation: 2 });
__decorate([
    Input(),
    __metadata("design:type", Object)
], DaterangeComponent.prototype, "date", void 0);
__decorate([
    Input(),
    __metadata("design:type", Array)
], DaterangeComponent.prototype, "timespan", void 0);

/**
 * Displays a heatmap
 * <example-url>https://components.entrecode.de/ui/datetime?e=1</example-url>
 */
let HeatmapComponent = class HeatmapComponent extends MonthComponent {
    constructor() {
        super(...arguments);
        /** Array of timestamps that should be turned into a heatmap */
        this.timestamps = [];
        /** If true, the timespan of the first given timestamps will be kept, no matter what follows */
        this.keepTimespan = false;
    }
    ngOnInit() {
        this.updateHeatmap();
    }
    /** When changing the date or selected input, the calendar will update its view to display the month containing it. */
    ngOnChanges(change) {
        if (change.timestamps && this.timestamps) {
            const sorted = this.timestamps.sort((a, b) => {
                return moment(a).isAfter(moment(b)) ? -1 : 1;
            });
            this.timespan =
                this.keepTimespan && this.timespan ? this.timespan : [moment(sorted[sorted.length - 1]), moment(sorted[0])];
            this.stats = this.statsInfo();
            this.updateHeatmap();
        }
    }
    toShade(count, max = 100, digits = 2) {
        if (max === 0) {
            return 0;
        }
        const grain = Math.pow(10, digits);
        return (Math.floor((count / max) * grain) / grain) * 100;
    }
    getHeatMap(timestamps) {
        const dates = timestamps
            .map((timestamp) => moment(timestamp)
            .startOf('day')
            .toISOString())
            .reduce((counts, date) => Object.assign(counts, {
            [date]: ++counts[date] || 0,
        }), {});
        const max = dates[Object.keys(dates).sort((a, b) => (dates[a] > dates[b] ? -1 : 1))[0]];
        return Object.keys(dates).reduce((classes, date) => {
            return Object.assign(classes, {
                [date]: Math.floor((dates[date] / max) * 100),
            });
        }, {});
    }
    /** Returns json with additional infos about the timestamps */
    statsInfo(digits = 3) {
        const dayspan = this.timespan[1].diff(this.timespan[0], 'days');
        return {
            timespan: this.timespan,
            count: this.timestamps.length,
            dayspan,
            density: Math.floor((this.timestamps.length / dayspan) * Math.pow(10, digits)) / Math.pow(10, digits),
        };
    }
    updateHeatmap() {
        if (!this.timestamps) {
            this.heatmap = [];
            return;
        }
        this.heatmap = this.getHeatMap(this.timestamps);
    }
};
HeatmapComponent.ɵfac = function HeatmapComponent_Factory(t) { return ɵHeatmapComponent_BaseFactory(t || HeatmapComponent); };
HeatmapComponent.ɵcmp = ɵngcc0.ɵɵdefineComponent({ type: HeatmapComponent, selectors: [["ec-heatmap"]], inputs: { timestamps: "timestamps", keepTimespan: "keepTimespan" }, features: [ɵngcc0.ɵɵInheritDefinitionFeature, ɵngcc0.ɵɵNgOnChangesFeature()], decls: 2, vars: 9, consts: [[1, "ec-heatmap"], [3, "heatmap", "timespan", "date", "disabled", "disableDrag", "disableDragAnywhere", "disableDragStart", "disableDragEnd", "selectSpan", "spanChanged"]], template: function HeatmapComponent_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵelementStart(0, "div", 0);
        ɵngcc0.ɵɵelementStart(1, "ec-calendar", 1);
        ɵngcc0.ɵɵlistener("spanChanged", function HeatmapComponent_Template_ec_calendar_spanChanged_1_listener($event) { return ctx.spanChanged.emit($event); });
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementEnd();
    } if (rf & 2) {
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵproperty("heatmap", ctx.heatmap)("timespan", ctx.timespan)("date", ctx.date)("disabled", ctx.disabled)("disableDrag", ctx.disableDrag)("disableDragAnywhere", ctx.disableDragAnywhere)("disableDragStart", ctx.disableDragStart)("disableDragEnd", ctx.disableDragEnd)("selectSpan", ctx.selectSpan);
    } }, directives: function () { return [CalendarComponent]; }, encapsulation: 2 });
__decorate([
    Input(),
    __metadata("design:type", Array)
], HeatmapComponent.prototype, "timestamps", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], HeatmapComponent.prototype, "keepTimespan", void 0);

var CalendarComponent_1;
/** Input for a datetime.
 *
 * <example-url>https://components.entrecode.de/ui/datetime?e=1</example-url>
 */
let CalendarComponent = CalendarComponent_1 = class CalendarComponent extends MonthComponent {
    /** The constructor gets the weekdays for the calendar header and instantiates the allowed input patterns.*/
    constructor(defaultDateFormat, defaultTimeFormat, defaultMonthFormat /* public symbol: SymbolService */) {
        /* super(symbol); */
        super(defaultMonthFormat);
        this.defaultDateFormat = defaultDateFormat;
        this.defaultTimeFormat = defaultTimeFormat;
        this.defaultMonthFormat = defaultMonthFormat;
        /** Output that emits when the value changes */
        this.changed = new EventEmitter();
        /** The current value */
        this.value = '';
        /** The current value of the input */
        this.inputValue = '';
        /** The input's placeholder */
        this.placeholder = '';
        /** Allowed date input patterns. The first one will be standard. */
        this.patterns = ['DD.MM.YYYY', 'DD.MM', 'DD.MM.YY', 'MM-DD-YYYY', 'YYYY-MM-DD', 'YYYY-MM-DD'];
        /** Sets the input format of the time */
        this.timeFormat = 'HH:mm';
        /** Change propagation for ControlValueAccessor */
        this.propagateChange = (_) => { };
        // pattern localization
        /* this.patterns = this.symbol.resolve('moment.format.date') ?
        // [defaultDateFormatthis.symbol.resolve('moment.format.date')] : this.patterns; */
        this.patterns = defaultDateFormat ? [defaultDateFormat] : this.patterns;
        /* this.timeFormat = this.symbol.resolve('moment.format.time') || this.timeFormat; */
        this.timeFormat = defaultTimeFormat || this.timeFormat;
        this.weekdays = moment.weekdaysMin(true);
        if (!this.disableTime) {
            this.patterns = this.patterns
                .map((pattern) => {
                return pattern + ' ' + this.timeFormat;
            })
                .concat(this.patterns);
        }
    }
    getPattern(_moment) {
        const format = _moment.creationData().format;
        if (this.patterns.indexOf(format) !== -1) {
            return format;
        }
        return this.patterns[0];
    }
    /** Updates the value with the given moment and propagates the change. */
    select(selected) {
        if (this.disabled) {
            console.warn('cannot select date: calendar is set to disabled=true');
            return;
        }
        if (this.value && selected.hour() === 0 && selected.minute() === 0) {
            const previous = moment(this.value, this.patterns, true);
            selected.hour(previous.hour());
            selected.minute(previous.minute());
        }
        this.value = selected.format(this.getPattern(selected));
        this.inputValue = this.value;
        this.setValue(selected.toISOString() || 'invalid');
    }
    /** Called upon input value change by the user. */
    input(value) {
        this.value = value;
        const typed = moment(value, [...this.patterns, moment.ISO_8601], true);
        if (typed.isValid()) {
            this.grid.selectDay(typed, false);
            this.setValue(typed.toISOString());
        }
        else if (value === '') {
            this.grid.clearSelection();
            this.setValue(null);
        }
        else {
            this.setValue(typed.toISOString() || 'invalid');
        }
    }
    /** called when the value should be changed from inside the component. calls propagateChange and emits the change output */
    setValue(value) {
        this.propagateChange(value);
        this.changed.emit(value);
    }
    /** Selects the given Date when the model changes. */
    writeValue(value) {
        if (!value) {
            return '';
        }
        const date = moment(value);
        if (!date.isValid()) {
            console.warn('written model value is not valid', date);
            return;
        }
        this.value = date.format(this.patterns[0]) || '';
        this.inputValue = this.value;
        this.grid.selectDay(moment(value));
    }
    /** registerOnChange implementation of ControlValueAccessor */
    registerOnChange(fn) {
        this.propagateChange = fn;
    }
    /** registerOnTouched implementation of ControlValueAccessor */
    registerOnTouched() { }
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
    }
};
CalendarComponent.ɵfac = function CalendarComponent_Factory(t) { return new (t || CalendarComponent)(ɵngcc0.ɵɵdirectiveInject('moment.format.date'), ɵngcc0.ɵɵdirectiveInject('moment.format.time'), ɵngcc0.ɵɵdirectiveInject('moment.format.month')); };
CalendarComponent.ɵcmp = ɵngcc0.ɵɵdefineComponent({ type: CalendarComponent, selectors: [["ec-calendar"]], viewQuery: function CalendarComponent_Query(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵstaticViewQuery(MonthComponent, true);
    } if (rf & 2) {
        var _t;
        ɵngcc0.ɵɵqueryRefresh(_t = ɵngcc0.ɵɵloadQuery()) && (ctx.grid = _t.first);
    } }, inputs: { placeholder: "placeholder", disabled: "disabled", formControl: "formControl", disableTime: "disableTime" }, outputs: { changed: "changed" }, features: [ɵngcc0.ɵɵProvidersFeature([
            {
                provide: NG_VALUE_ACCESSOR,
                useExisting: forwardRef(() => CalendarComponent_1),
                multi: true
            },
        ]), ɵngcc0.ɵɵInheritDefinitionFeature], decls: 30, vars: 16, consts: [["aria-hidden", "true", "version", "1.1", "xmlns", "http://www.w3.org/2000/svg", "xlink", "http://www.w3.org/1999/xlink", 2, "position", "absolute", "width", "0", "height", "0", "overflow", "hidden"], ["id", "arrowhead-left", "viewBox", "0 0 24 24"], ["d", "M13.829 19c-0.292 0-0.582-0.127-0.78-0.373l-4.828-6c-0.298-0.371-0.294-0.901 0.011-1.267l5-6c0.353-0.424 0.984-0.481 1.409-0.128s0.481 0.984 0.127 1.408l-4.475 5.371 4.315 5.362c0.346 0.43 0.278 1.060-0.153 1.406-0.184 0.149-0.406 0.221-0.626 0.221z"], ["id", "arrowhead-right", "viewBox", "0 0 24 24"], ["d", "M9.999 19c-0.226 0-0.453-0.076-0.64-0.232-0.424-0.353-0.481-0.984-0.128-1.408l4.476-5.371-4.315-5.362c-0.346-0.43-0.278-1.060 0.152-1.406 0.431-0.346 1.060-0.278 1.407 0.152l4.828 6c0.298 0.371 0.294 0.901-0.011 1.267l-5 6c-0.198 0.237-0.482 0.36-0.769 0.36z"], ["id", "today", "viewBox", "0 0 24 24"], ["d", "M16 12c0 2.209-1.791 4-4 4s-4-1.791-4-4c0-2.209 1.791-4 4-4s4 1.791 4 4z"], [1, "ec-calendar"], [1, "ec-calendar-controls"], [1, "btn", "btn_clear", "btn_square", "ec-calendar-controls__prev", 3, "click"], [1, "ixo"], [0, "xlink", "href", "#arrowhead-left"], [1, "ec-calendar-title"], ["class", "btn btn_clear btn_square ec-calendar-controls__current", 3, "click", 4, "ngIf"], [1, "btn", "btn_clear", "btn_square", "ec-calendar-controls__next", 3, "click"], [0, "xlink", "href", "#arrowhead-right"], [1, "ec-calendar-month"], [1, "ec-calendar-weekdays"], [4, "ngFor", "ngForOf"], [3, "disabled", "disableDrag", "disableDragAnywhere", "disableDragStart", "disableDragEnd", "selectSpan", "timespan", "heatmap", "date", "spanChanged", "dayClicked"], ["grid", ""], [1, "btn", "btn_clear", "btn_square", "ec-calendar-controls__current", 3, "click"], [0, "xlink", "href", "#today"]], template: function CalendarComponent_Template(rf, ctx) { if (rf & 1) {
        const _r14 = ɵngcc0.ɵɵgetCurrentView();
        ɵngcc0.ɵɵnamespaceSVG();
        ɵngcc0.ɵɵelementStart(0, "svg", 0);
        ɵngcc0.ɵɵelementStart(1, "defs");
        ɵngcc0.ɵɵelementStart(2, "symbol", 1);
        ɵngcc0.ɵɵelementStart(3, "title");
        ɵngcc0.ɵɵtext(4, "arrowhead-left");
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelement(5, "path", 2);
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementStart(6, "symbol", 3);
        ɵngcc0.ɵɵelementStart(7, "title");
        ɵngcc0.ɵɵtext(8, "arrowhead-right");
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelement(9, "path", 4);
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementStart(10, "symbol", 5);
        ɵngcc0.ɵɵelementStart(11, "title");
        ɵngcc0.ɵɵtext(12, "today");
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelement(13, "path", 6);
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵnamespaceHTML();
        ɵngcc0.ɵɵelementStart(14, "div", 7);
        ɵngcc0.ɵɵelementStart(15, "nav", 8);
        ɵngcc0.ɵɵelementStart(16, "a", 9);
        ɵngcc0.ɵɵlistener("click", function CalendarComponent_Template_a_click_16_listener($event) { ɵngcc0.ɵɵrestoreView(_r14); const _r10 = ɵngcc0.ɵɵreference(29); return _r10.alter(0 - 1, "months"); });
        ɵngcc0.ɵɵnamespaceSVG();
        ɵngcc0.ɵɵelementStart(17, "svg", 10);
        ɵngcc0.ɵɵelement(18, "use", 11);
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵnamespaceHTML();
        ɵngcc0.ɵɵelementStart(19, "div", 12);
        ɵngcc0.ɵɵtext(20);
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵtemplate(21, CalendarComponent_a_21_Template, 3, 0, "a", 13);
        ɵngcc0.ɵɵelementStart(22, "a", 14);
        ɵngcc0.ɵɵlistener("click", function CalendarComponent_Template_a_click_22_listener($event) { ɵngcc0.ɵɵrestoreView(_r14); const _r10 = ɵngcc0.ɵɵreference(29); return _r10.alter(1, "months"); });
        ɵngcc0.ɵɵnamespaceSVG();
        ɵngcc0.ɵɵelementStart(23, "svg", 10);
        ɵngcc0.ɵɵelement(24, "use", 15);
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵnamespaceHTML();
        ɵngcc0.ɵɵelementStart(25, "div", 16);
        ɵngcc0.ɵɵelementStart(26, "ul", 17);
        ɵngcc0.ɵɵtemplate(27, CalendarComponent_li_27_Template, 2, 1, "li", 18);
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementStart(28, "ec-month", 19, 20);
        ɵngcc0.ɵɵlistener("spanChanged", function CalendarComponent_Template_ec_month_spanChanged_28_listener($event) { return ctx.spanChanged.emit($event); })("dayClicked", function CalendarComponent_Template_ec_month_dayClicked_28_listener($event) { return ctx.select($event); });
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementEnd();
    } if (rf & 2) {
        const _r10 = ɵngcc0.ɵɵreference(29);
        ɵngcc0.ɵɵadvance(16);
        ɵngcc0.ɵɵclassProp("is-disabled", !_r10.canAlter(0 - 1, "month"));
        ɵngcc0.ɵɵadvance(4);
        ɵngcc0.ɵɵtextInterpolate(_r10.formatted);
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵproperty("ngIf", ctx.isSelectable(ctx.todayMoment));
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵclassProp("is-disabled", !_r10.canAlter(1, "month"));
        ɵngcc0.ɵɵadvance(5);
        ɵngcc0.ɵɵproperty("ngForOf", ctx.weekdays);
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵproperty("disabled", ctx.disabled)("disableDrag", ctx.disableDrag)("disableDragAnywhere", ctx.disableDragAnywhere)("disableDragStart", ctx.disableDragStart)("disableDragEnd", ctx.disableDragEnd)("selectSpan", ctx.selectSpan)("timespan", ctx.timespan)("heatmap", ctx.heatmap)("date", ctx.date);
    } }, directives: [ɵngcc1.NgIf, ɵngcc1.NgForOf, MonthComponent], styles: [".ixo[_ngcontent-%COMP%] {\n    display: inline-block;\n    width: 1em;\n    height: 1em;\n    stroke-width: 0;\n    stroke: currentColor;\n    fill: currentColor;\n  }"] });
CalendarComponent.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: ['moment.format.date',] }] },
    { type: undefined, decorators: [{ type: Inject, args: ['moment.format.time',] }] },
    { type: undefined, decorators: [{ type: Inject, args: ['moment.format.month',] }] }
];
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], CalendarComponent.prototype, "changed", void 0);
__decorate([
    Input(),
    __metadata("design:type", FormControl)
], CalendarComponent.prototype, "formControl", void 0);
__decorate([
    ViewChild(MonthComponent, { static: true }),
    __metadata("design:type", MonthComponent)
], CalendarComponent.prototype, "grid", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], CalendarComponent.prototype, "placeholder", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], CalendarComponent.prototype, "disabled", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], CalendarComponent.prototype, "disableTime", void 0);
CalendarComponent = CalendarComponent_1 = __decorate([ __param(0, Inject('moment.format.date')),
    __param(1, Inject('moment.format.time')),
    __param(2, Inject('moment.format.month')),
    __metadata("design:paramtypes", [Object, Object, Object])
], CalendarComponent);

/* import { SymbolService } from '../../symbol/symbol.service'; */
/** The GroupPipe filters an array of Item instances by a given property value.
 * It is meant to be used to get only the items with the exact same value. */
let DatetimePipe = class DatetimePipe {
    constructor(dateFormat /* private symbol: SymbolService */) {
        this.dateFormat = dateFormat;
    }
    transform(value, pattern = this.dateFormat /* this.symbol.resolve('moment.format.date') */, raw) {
        if (!value) {
            return '';
        }
        if (raw) {
            console.log('raw', raw);
        }
        const typed = moment(value, pattern, true);
        if (!typed.isValid()) {
            return '';
        }
        if (Array.isArray(pattern)) {
            pattern = pattern[0];
        }
        return moment(value).format(pattern);
    }
};
DatetimePipe.ɵfac = function DatetimePipe_Factory(t) { return new (t || DatetimePipe)(ɵngcc0.ɵɵdirectiveInject('moment.format.date')); };
DatetimePipe.ɵpipe = ɵngcc0.ɵɵdefinePipe({ name: "datetime", type: DatetimePipe, pure: true });
DatetimePipe.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: ['moment.format.date',] }] }
];
DatetimePipe = __decorate([ __param(0, Inject('moment.format.date')),
    __metadata("design:paramtypes", [Object])
], DatetimePipe);

var CalendarModule_1;
/** This Module contains all calendar related components */
let CalendarModule = CalendarModule_1 = class CalendarModule {
    static forRoot(formats) {
        return {
            ngModule: CalendarModule_1,
            providers: [
                {
                    provide: 'moment.format.date',
                    useValue: formats.date,
                },
                {
                    provide: 'moment.format.time',
                    useValue: formats.time,
                },
                {
                    provide: 'moment.format.month',
                    useValue: formats.month,
                },
            ],
        };
    }
};
CalendarModule.ɵmod = ɵngcc0.ɵɵdefineNgModule({ type: CalendarModule });
CalendarModule.ɵinj = ɵngcc0.ɵɵdefineInjector({ factory: function CalendarModule_Factory(t) { return new (t || CalendarModule)(); }, providers: [
        {
            provide: 'moment.format.date',
            useValue: 'DD.MM.YYYY'
        },
        {
            provide: 'moment.format.time',
            useValue: 'HH:mm'
        },
        {
            provide: 'moment.format.month',
            useValue: 'MMMM YYYY'
        },
    ], imports: [[CommonModule]] });
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(MonthComponent, [{
        type: Component,
        args: [{
                selector: 'ec-month',
                template: "<ul class=\"ec-calendar-days\">\n  <li\n    *ngFor=\"let day of cells; let i = index\"\n    [class.is-active]=\"day.active\"\n    [class.is-last]=\"day.last\"\n    [class.is-first]=\"day.first\"\n    [class.is-inside-timespan]=\"day.inside && !day.last && !day.first\"\n    [class.is-draggable]=\"isDraggable(day)\"\n    [class.is-disabled]=\"day.disabled\"\n    [class.heat-none]=\"day.heat === 0\"\n    [class.heat-low]=\"day.heat > 0 && day.heat < 30\"\n    [class.heat-medium]=\"day.heat >= 30 && day.heat < 70\"\n    [class.heat-high]=\"day.heat >= 70 && day.heat < 90\"\n    [class.heat-extreme]=\"day.heat >= 90\"\n    [draggable]=\"isDraggable(day)\"\n    (dragstart)=\"dragStart(day, $event)\"\n    (click)=\"selectDay(day.date)\"\n    (mouseover)=\"mouseOver(day, $event)\"\n    (mouseup)=\"mouseUp(day, $event)\"\n  >\n    <div\n      class=\"ec-calendar-day\"\n      [style.background-color]=\"day.color\"\n      [class.is-other]=\"day.type !== 'current'\"\n      [class.is-not-selectable]=\"!day.selectable\"\n      [class.is-today]=\"day.today\"\n      [class.is-selected]=\"isSelected(day.date)\"\n    >\n      {{ day.class || day.format }}\n    </div>\n  </li>\n</ul>\n"
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: Inject,
                args: ['moment.format.month']
            }] }]; }, { spancolor: [{
            type: Input
        }], disableDragStart: [{
            type: Input
        }], disableDragEnd: [{
            type: Input
        }], disableDragAnywhere: [{
            type: Input
        }], disableDrag: [{
            type: Input
        }], dayClicked: [{
            type: Output
        }], spanChanged: [{
            type: Output
        }], selected: [{
            type: Input
        }], timespan: [{
            type: Input
        }], date: [{
            type: Input
        }], colors: [{
            type: Input
        }], heatmap: [{
            type: Input
        }], selectSpan: [{
            type: Input
        }], disabled: [{
            type: Input
        }] }); })();
const ɵDaterangeComponent_BaseFactory = ɵngcc0.ɵɵgetInheritedFactory(DaterangeComponent);
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(DaterangeComponent, [{
        type: Component,
        args: [{
                selector: 'ec-daterange',
                template: "<div class=\"ec-daterange\">\n    <ec-calendar (spanChanged)=\"spanChanged.emit($event)\" [timespan]=\"timespan\" [date]=\"date\" class=\"ec-daterange-start\"></ec-calendar>\n</div>"
            }]
    }], null, { date: [{
            type: Input
        }], timespan: [{
            type: Input
        }] }); })();
const ɵHeatmapComponent_BaseFactory = ɵngcc0.ɵɵgetInheritedFactory(HeatmapComponent);
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(HeatmapComponent, [{
        type: Component,
        args: [{
                selector: 'ec-heatmap',
                template: "<div class=\"ec-heatmap\">\n  <ec-calendar\n    (spanChanged)=\"spanChanged.emit($event)\"\n    [heatmap]=\"heatmap\"\n    [timespan]=\"timespan\"\n    [date]=\"date\"\n    [disabled]=\"disabled\"\n    [disableDrag]=\"disableDrag\"\n    [disableDragAnywhere]=\"disableDragAnywhere\"\n    [disableDragStart]=\"disableDragStart\"\n    [disableDragEnd]=\"disableDragEnd\"\n    [selectSpan]=\"selectSpan\"\n  ></ec-calendar>\n</div>\n"
            }]
    }], null, { timestamps: [{
            type: Input
        }], keepTimespan: [{
            type: Input
        }] }); })();
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(CalendarComponent, [{
        type: Component,
        args: [{
                selector: 'ec-calendar',
                template: "<svg\n  aria-hidden=\"true\"\n  style=\"position: absolute; width: 0; height: 0; overflow: hidden;\"\n  version=\"1.1\"\n  xmlns=\"http://www.w3.org/2000/svg\"\n  xlink=\"http://www.w3.org/1999/xlink\"\n>\n  <defs>\n    <symbol id=\"arrowhead-left\" viewBox=\"0 0 24 24\">\n      <title>arrowhead-left</title>\n      <path\n        d=\"M13.829 19c-0.292 0-0.582-0.127-0.78-0.373l-4.828-6c-0.298-0.371-0.294-0.901 0.011-1.267l5-6c0.353-0.424 0.984-0.481 1.409-0.128s0.481 0.984 0.127 1.408l-4.475 5.371 4.315 5.362c0.346 0.43 0.278 1.060-0.153 1.406-0.184 0.149-0.406 0.221-0.626 0.221z\"\n      ></path>\n    </symbol>\n    <symbol id=\"arrowhead-right\" viewBox=\"0 0 24 24\">\n      <title>arrowhead-right</title>\n      <path\n        d=\"M9.999 19c-0.226 0-0.453-0.076-0.64-0.232-0.424-0.353-0.481-0.984-0.128-1.408l4.476-5.371-4.315-5.362c-0.346-0.43-0.278-1.060 0.152-1.406 0.431-0.346 1.060-0.278 1.407 0.152l4.828 6c0.298 0.371 0.294 0.901-0.011 1.267l-5 6c-0.198 0.237-0.482 0.36-0.769 0.36z\"\n      ></path>\n    </symbol>\n    <symbol id=\"today\" viewBox=\"0 0 24 24\">\n      <title>today</title>\n      <path d=\"M16 12c0 2.209-1.791 4-4 4s-4-1.791-4-4c0-2.209 1.791-4 4-4s4 1.791 4 4z\"></path>\n    </symbol>\n  </defs>\n</svg>\n<style>\n  .ixo {\n    display: inline-block;\n    width: 1em;\n    height: 1em;\n    stroke-width: 0;\n    stroke: currentColor;\n    fill: currentColor;\n  }\n</style>\n<div class=\"ec-calendar\">\n  <nav class=\"ec-calendar-controls\">\n    <a\n      (click)=\"grid.alter(-1, 'months')\"\n      class=\"btn btn_clear btn_square ec-calendar-controls__prev\"\n      [class.is-disabled]=\"!grid.canAlter(-1, 'month')\"\n    >\n      <svg class=\"ixo\">\n        <use xlink:href=\"#arrowhead-left\"></use>\n      </svg>\n    </a>\n    <div class=\"ec-calendar-title\">{{ grid.formatted }}</div>\n    <a\n      *ngIf=\"isSelectable(todayMoment)\"\n      (click)=\"grid.setToday()\"\n      class=\"btn btn_clear btn_square ec-calendar-controls__current\"\n    >\n      <svg class=\"ixo\">\n        <use xlink:href=\"#today\"></use>\n      </svg>\n    </a>\n    <a\n      (click)=\"grid.alter(1, 'months')\"\n      class=\"btn btn_clear btn_square ec-calendar-controls__next\"\n      [class.is-disabled]=\"!grid.canAlter(1, 'month')\"\n    >\n      <svg class=\"ixo\">\n        <use xlink:href=\"#arrowhead-right\"></use>\n      </svg>\n    </a>\n  </nav>\n  <div class=\"ec-calendar-month \">\n    <ul class=\"ec-calendar-weekdays \">\n      <li *ngFor=\"let weekday of weekdays\">\n        {{ weekday }}\n      </li>\n    </ul>\n    <ec-month\n      [disabled]=\"disabled\"\n      [disableDrag]=\"disableDrag\"\n      [disableDragAnywhere]=\"disableDragAnywhere\"\n      [disableDragStart]=\"disableDragStart\"\n      [disableDragEnd]=\"disableDragEnd\"\n      (spanChanged)=\"spanChanged.emit($event)\"\n      [selectSpan]=\"selectSpan\"\n      [timespan]=\"timespan\"\n      [heatmap]=\"heatmap\"\n      [date]=\"date\"\n      (dayClicked)=\"select($event)\"\n      #grid\n    ></ec-month>\n  </div>\n</div>\n",
                providers: [
                    {
                        provide: NG_VALUE_ACCESSOR,
                        useExisting: forwardRef(() => CalendarComponent_1),
                        multi: true
                    },
                ]
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: Inject,
                args: ['moment.format.date']
            }] }, { type: undefined, decorators: [{
                type: Inject,
                args: ['moment.format.time']
            }] }, { type: undefined, decorators: [{
                type: Inject,
                args: ['moment.format.month']
            }] }]; }, { changed: [{
            type: Output
        }], placeholder: [{
            type: Input
        }], disabled: [{
            type: Input
        }], formControl: [{
            type: Input
        }], grid: [{
            type: ViewChild,
            args: [MonthComponent, { static: true }]
        }], disableTime: [{
            type: Input
        }] }); })();
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(DatetimePipe, [{
        type: Pipe,
        args: [{
                name: 'datetime'
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: Inject,
                args: ['moment.format.date']
            }] }]; }, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && ɵngcc0.ɵɵsetNgModuleScope(CalendarModule, { declarations: function () { return [DatetimePipe,
        CalendarComponent,
        HeatmapComponent,
        DaterangeComponent,
        MonthComponent]; }, imports: function () { return [CommonModule]; }, exports: function () { return [DatetimePipe,
        CalendarComponent,
        HeatmapComponent,
        DaterangeComponent,
        MonthComponent]; } }); })();
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(CalendarModule, [{
        type: NgModule,
        args: [{
                imports: [CommonModule],
                exports: [DatetimePipe, CalendarComponent, HeatmapComponent, DaterangeComponent, MonthComponent],
                declarations: [DatetimePipe, CalendarComponent, HeatmapComponent, DaterangeComponent, MonthComponent],
                providers: [
                    {
                        provide: 'moment.format.date',
                        useValue: 'DD.MM.YYYY'
                    },
                    {
                        provide: 'moment.format.time',
                        useValue: 'HH:mm'
                    },
                    {
                        provide: 'moment.format.month',
                        useValue: 'MMMM YYYY'
                    },
                ]
            }]
    }], null, null); })();

/*
 * Public API Surface of calendar
 */

/**
 * Generated bundle index. Do not edit.
 */

export { CalendarComponent, CalendarModule, DaterangeComponent, DatetimePipe, HeatmapComponent, MonthComponent };

//# sourceMappingURL=ec.components-calendar.js.map