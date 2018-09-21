import { Component, Input, OnChanges, OnInit } from '@angular/core';
import moment from 'moment-es6';
import { MonthComponent } from './month.component';
/**
 * Displays a heatmap
 * <example-url>https://components.entrecode.de/ui/datetime?e=1</example-url>
 */
@Component({
    selector: 'ec-heatmap',
    templateUrl: './heatmap.component.html'
})

export class HeatmapComponent extends MonthComponent implements OnInit, OnChanges {
    /** stats of current timestamps */
    stats: { count: number; dayspan: number; density: number; timespan: moment.Moment[] };
    /** Array of timestamps that should be turned into a heatmap */
    @Input() timestamps: string[] = [];
    /** If true, the timespan of the first given timestamps will be kept, no matter what follows */
    @Input() keepTimespan = false;

    ngOnInit() {
        this.updateHeatmap();
    }

    /** When changing the date or selected input, the calendar will update its view to display the month containing it. */
    ngOnChanges(change) {
        if (change.timestamps && this.timestamps) {
            const sorted = this.timestamps.sort((a, b) => {
                return moment(a).isAfter(moment(b)) ? -1 : 1;
            });
            this.timespan = this.keepTimespan && this.timespan ? this.timespan : [moment(sorted[sorted.length - 1]), moment(sorted[0])];
            this.date = this.timespan[1];
            this.stats = this.statsInfo();
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

    getHeatMap(timestamps) {
        const dates = timestamps
            .map(timestamp => moment(timestamp).startOf('day').toISOString())
            .reduce((counts, date) => Object.assign(counts, {
                [date]: ++counts[date] || 0
            }), {});
        const max = dates[Object.keys(dates).sort((a, b) => dates[a] > dates[b] ? -1 : 1)[0]];
        return Object.keys(dates).reduce((classes, date) => {
            return Object.assign(classes, {
                [date]: Math.floor(dates[date] / max * 100)
            })
        }, {});

    }

    /** Returns json with additional infos about the timestamps */
    statsInfo(digits = 3) {
        const dayspan = this.timespan[1].diff(this.timespan[0], 'days');
        return {
            timespan: this.timespan,
            count: this.timestamps.length,
            dayspan,
            density: Math.floor(this.timestamps.length / dayspan * Math.pow(10, digits)) / Math.pow(10, digits)
        };
    }

    updateHeatmap() {
        if (!this.timestamps) {
            this.heatmap = [];
            return;
        }
        this.heatmap = this.getHeatMap(this.timestamps);
    }

}
