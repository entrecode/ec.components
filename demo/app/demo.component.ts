import { Component, ViewEncapsulation } from '@angular/core';
import { TypeConfigService } from '../../packages/data/src/model-config/type-config.service';
import { LocationPickerComponent } from '../../packages/location/src/location-picker.component';
import { demoRoutes } from './demo.routes';
import { ActivatedRoute, Router, ChildActivationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

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
  links = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private typeConfig: TypeConfigService) {

    this.router.events.pipe(
      filter(event => event instanceof ChildActivationEnd),
      /* take(1), */
    ).subscribe(event => {
      const data = event['snapshot'].firstChild.data;
      if (data.paths) {
        this.paths = data.paths;
      }
      if (data.links) {
        this.links = data.links;
      }
    })
    this.route.queryParams
      .subscribe(params => {
        this.hideMenu = !!params['e'];
      });

    this.typeConfig.set('location', {
      input: LocationPickerComponent
    });
  }

}
