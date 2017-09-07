import { Component, Input, Optional } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SdkService } from '../sdk/sdk.service';
import { LoaderComponent } from '@ec.components/ui/src/loader/loader.component';
import { LoaderService } from '@ec.components/ui/src/loader/loader.service';
import { ListComponent } from '@ec.components/ui/src/list/list.component';
import { Selection } from '@ec.components/core/src/selection/selection';
import { NotificationsService } from '@ec.components/ui/src/notifications/notifications.service';
import { ResourceList } from './resource-list';

/** The ResourceListComponent is an extension of ListComponent for SDK ListResources.
 * It is meant to be extended and overriden the createList method. See e.g. AssetListComponent. */
@Component({
  selector: 'ec-resource-list',
  templateUrl: '../../../ui/src/list/list.component.html'
})
export class ResourceListComponent<T> extends ListComponent<T> {
  /** If true, only one item is selectable next */
  @Input() solo: boolean;
  /** The instance of an EntryList */
  list: ResourceList<T>;
  /** The loader that should be shown while the list is loaded. */
  @Input() loader: LoaderComponent;

  /** The constructor will just call super of List*/
  constructor(protected loaderService: LoaderService,
    protected sdk: SdkService,
    protected notificationService: NotificationsService,
    @Optional() public route: ActivatedRoute) {
    super();
    if (route) {
      route.queryParams.subscribe((query) => {
        this.config.query = Object.assign({}, query);
      });
    }
  }

  /** The method to create the list*/
  protected createList(): Promise<ResourceList<T>> | ResourceList<T> {
    return new ResourceList(this.config, this.sdk);
  }

  /** When changing the model or the config, the list config will be (re)generated, using the model's schema*/
  ngOnChanges() {
    Object.assign(this.config || {}, this.configInput || {});
    if (!this.sdk) {
      return;
    }
    Promise.resolve(this.createList())
    .then((list) => {
      if (!list) {
        return;
      }
      this.list = list;
      this.list.change$.subscribe((list) => {
        if (!this.selection && this.list.config && !this.list.config.disableSelection) {
          this.selection = new Selection([], this.list.config);
        }

        // console.log('changed list', this.list.config.filter);
        //TODO update route to reflect the filter settings

      });
      this.list.loading$.subscribe((promise: Promise<any>) => {
        this.loaderService.wait(promise, this.loader);
      });
      this.list.error$.subscribe((err) => {
        this.notificationService.emit({
          title: 'Fehler beim laden der Liste',
          error: err
        });
      });
    });
  }

  /** This method will filter the list by a given property value and optional operator. */
  filter(property: string, value: any) {
    this.list.filter(property, value);
  }

  initFilterQuery(fieldFilter: (property: string, value: any) => { property, value }) {
    if (!this.config.query || !this.config.fields || !fieldFilter) {
      return;
    }
    Object.keys(this.config.query)
    .filter((property) =>
      fieldFilter(property, this.config.query[property]))
    .map((property) =>
      fieldFilter(property, this.config.query[property]))
    .filter((filter) => {
      return Object.keys(this.config.fields).indexOf(filter.property) !== -1
    })
    .forEach((filter) => {
      this.config.filter = Object.assign(this.config.filter || {}, {
        [filter.property]: filter.value
      });
    });
  }
}
