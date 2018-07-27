import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import moment from 'moment-es6';
import { ModelConfigService } from '../../packages/data/index';
import { TypeConfigService } from '../../packages/data/src/model-config/type-config.service';
import { LocationPickerComponent } from '../../packages/location/src/location-picker.component';
import { demoRoutes } from './demo.routes';
import { Route, ActivatedRoute, Router, NavigationEnd, ChildActivationEnd } from '@angular/router';
import { filter, map, switchMap, take } from 'rxjs/operators';
@Component({
  selector: 'ec-demo-root',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DemoComponent {
  public demos = demoRoutes;
  hideMenu = false;
  paths = [];


  constructor(private modelConfig: ModelConfigService,
    private route: ActivatedRoute,
    private router: Router,
    private typeConfig: TypeConfigService,
    private activatedRoute: ActivatedRoute) {
    moment.locale('de');

    this.router.events.pipe(
      filter(event => event instanceof ChildActivationEnd),
      /* take(1), */
    ).subscribe(event => {
      const data = event['snapshot'].firstChild.data;
      if (data.paths) {
        this.paths = data.paths;
      }
    })
    this.route.queryParams
      .subscribe(params => {
        this.hideMenu = !!params['e'];
      });

    this.typeConfig.set('location', {
      input: LocationPickerComponent
    });

    /* this.modelConfig.set('muffin', {
      fields: {
        pictures: {
          label: 'Bilder'
          // nestedPopClass: 'none'
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
        new_asset: {
          label: 'Nu Asset',
          relation: 'test'
        },
        new_assets: {
          label: 'Nu Assets',
          relation: 'test'
        }
      }
    });

    this.modelConfig.set('baker', {
      nestedPopClass: 'ec-pop_drawer-right',
      fields: {
        id: {
          label: 'ID',
          // readOnly: true
        },
        picture: {
          label: 'Bilder'
        },
        name: {
          label: 'Bäcker'
        },
        muffins: {
          label: 'Muffins',
          maxItems: 4,
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
    }); */
  }

}
