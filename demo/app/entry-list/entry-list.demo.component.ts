import { Component } from '@angular/core';
import moment from 'moment-es6';
import { EntryListComponent } from '../../../packages/data';

@Component({
  selector: 'ec-entry-list-demo',
  templateUrl: 'entry-list-demo.component.html',
})
export class EntryListDemoComponent {
  timestamps: any;
  timespan = [moment(), moment().add(1, 'month')];
  heatProperty = '_modified';
  constructor() {
  }


  updateList(entryList) {
    if (entryList.items) {
      this.timestamps = entryList.items.map(item => item.resolve(this.heatProperty).toISOString());
    }
  }

  updateFilter(timespan, entrylist: EntryListComponent) {
    entrylist.list.load({
      filter: {
        [this.heatProperty]: {
          from: timespan[0].startOf('day').toISOString(),
          to: timespan[1].endOf('day').toISOString()
        }
      }
    });
  }
}
