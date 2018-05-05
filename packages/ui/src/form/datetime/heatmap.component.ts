import { Component, OnInit, OnChanges, ViewChild, Input, Output } from '@angular/core';
import { MonthComponent } from './month.component';
import { SymbolService } from '@ec.components/ui/src/symbol/symbol.service';
import moment from 'moment-es6';
import { CalendarComponent } from './calendar.component';
import { months } from 'moment';

@Component({
    selector: 'ec-heatmap',
    templateUrl: './heatmap.component.html'
})

export class HeatmapComponent extends MonthComponent implements OnInit, OnChanges {
    density: number;
    /** The span of days which is reflected by the timestamps */
    dayspan: number;
    /** Array of timestamps that should be turned into a heatmap */
    @Input() timestamps: string[] = [];

    ngOnInit() {
        this.updateHeatmap();
    }

    /** When changing the date or selected input, the calendar will update its view to display the month containing it. */
    ngOnChanges(change) {
        if (change.timestamps && this.timestamps) {
            const sorted = this.timestamps.sort((a, b) => {
                return moment(a).isAfter(moment(b)) ? -1 : 1;
            });
            this.timespan = this.timespan || [moment(sorted[sorted.length - 1]), moment(sorted[0])];
            this.date = this.timespan[1];
            this.dayspan = this.timespan[1].diff(this.timespan[0], 'days');
            const digits = 3;
            this.density = Math.floor(this.timestamps.length / this.dayspan * Math.pow(10, digits)) / Math.pow(10, digits);
            this.updateHeatmap();
        }
    }

    toShade(count, max = 100, digits = 2) {
        if (max === 0) {
            return 0;
        }
        const grain = Math.pow(10, digits);
        return Math.floor((count / max) * grain) / grain * 100;
    }

    getHeatMap(timestamps, hue = 67, saturation = 50, factor = 1.5) { // iso timestamps
        const dates = timestamps
            .map(timestamp => moment(timestamp).startOf('day').toISOString())
            .reduce((counts, date) => Object.assign(counts, {
                [date]: ++counts[date] || 0
            }), {});
        const max = dates[Object.keys(dates).sort((a, b) => dates[a] > dates[b] ? -1 : 1)[0]];
        return Object.keys(dates).reduce((colors, date) => {
            const heat = this.toShade(dates[date], max * factor);
            return Object.assign(colors, {
                // [date]: `hsl(${hue},${saturation}%,${this.toShade(dates[date], max * factor)}%)`
                [date]: `hsl(${hue},${heat}%,${100 - heat}%)`
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
