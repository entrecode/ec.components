import { Component, ViewEncapsulation } from '@angular/core';
import { mocked } from '../mocks/data';
import { environment } from '../environments/environment';
// import { Pagination } from '@ec.components/core'; //real world imports
// import { Datamanager, ModelConfig } from '@ec.components/data';
import { Datamanager, ModelConfig } from '../packages/data';
import { Pagination } from '../packages/core';
import * as moment from 'moment';

@Component({
  selector: 'demo-root',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DemoComponent {
  private mocked;
  private title = 'ec.components demo';
  private pagination = new Pagination({});
  currentPage: number = this.pagination.getPage();

  constructor() {
    Datamanager.useEnvironment(environment);
    this.mocked = mocked;
    this.pagination.setTotal(5100);
    this.pagination.change$.debounceTime(500)
    .subscribe((p) => {
      this.currentPage = this.pagination.getPage();
    });

    ModelConfig.set('muffin', {
      fields: {
        pictures: {
          label: 'Bilder'
        },
        name: {
          label: 'Muffin Name',
          group: (name) => {
            return name[0].toUpperCase()
          }
        },
        _created: {
          label: 'Erstellt',
          group: (value) => moment(value).format('YYYY')
        },
        amazement_factor: {
          label: 'Amazement Faktor',
          display: (value) => {
            return (value * 10) + '%'
          },
          group: (value) => {
            return value > 5 ? 'Größer als 50%' : 'Kleiner als 50%';
          }
        },
      }
    });

    ModelConfig.set('baker', {
      fields: {
        name: {
          label: 'Bäcker'
        },
        muffins: {
          label: 'Muffins',
          display: (value, item) => {
            let muffins = item.getTitle('muffins') || [];
            if (muffins && !Array.isArray(muffins)) {
              muffins = [muffins];
            }
            return muffins;
          }
        }
      }
    });
  }
}
