import { Component, ViewEncapsulation } from '@angular/core';
import { ModelConfigService } from '../../packages/data/index';
import * as moment from 'moment';
import { demoRoutes } from './demo.routes';

@Component({
  selector: 'demo-root',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DemoComponent {
  public demos = demoRoutes;

  constructor(private modelConfig: ModelConfigService) {
    moment.locale('de');

    this.modelConfig.set('muffin', {
      fields: {
        pictures: {
          label: 'Bilder'
        },
        name: {
          label: 'Muffin Name',
          group: (name) => {
            return name[0].toUpperCase()
          },
          required: true
        },
        _created: {
          label: 'Erstellt',
          form: false,
          group: (value) => moment(value).format('YYYY')
        },
        amazement_factor: {
          label: 'Amazement Faktor',
          display: (value) => {
            return (value * 10) + '%'
          },
          group: (value) => {
            return value > 5 ? 'Größer als 50%' : 'Kleiner als 50%';
          },
          validate: (value) => {
            if (typeof value !== 'number') {
              return;
            }
            if (value < 1) {
              return 'Muss mindestens 1 sein';
            } else if (value > 10) {
              return 'Darf maximal 10 sein';
            }
          }
        },
      }
    });

    this.modelConfig.set('baker', {
      fields: {
        id: {
          label: 'ID',
          // readOnly: true
        },
        created: {
          label: 'Datum',
          readOnly: true
        },
        modified: {
          label: 'Letzte Änderung',
          readOnly: true
        },
        picture: {
          label: 'Bilder',
          list: false
        },
        name: {
          label: 'Bäcker'
        },
        muffins: {
          label: 'Muffins',
          filterPopClass: 'ec-pop_drawer-right',
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
