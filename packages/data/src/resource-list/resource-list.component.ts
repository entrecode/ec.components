import { Component, Input, OnChanges, Optional } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SdkService } from '../sdk/sdk.service';
import { ResourceList } from './resource-list';
import Core from 'ec.sdk/lib/Core';
import { resourceConfig } from '../resource-config/resource-config';
import { ListConfig, Selection } from '@ec.components/core';
import ListResource, { filterOptions } from 'ec.sdk/lib/resources/ListResource';
import { WithLoader, LoaderComponent, ListComponent, LoaderService, NotificationsService } from '@ec.components/ui';
import Resource from 'ec.sdk/lib/resources/Resource';

/** The ResourceListComponent is an extension of ListComponent for SDK ListResources.
 * It is meant to be extended and overriden the createList method. See e.g. AssetListComponent. */
@Component({
  selector: 'ec-resource-list',
  templateUrl: '../../../ui/src/list/list.component.html'
})
export class ResourceListComponent extends ListComponent<Resource>
  implements OnChanges, WithLoader {
  /** If listResource input is set, the given ListResource will be used directly and loading will be skipped. */
  @Input() listResource: ListResource;
  /** If true, only one item is selectable next */
  @Input() solo: boolean;
  /** The instance of an EntryList */
  list: ResourceList;
  /** The API Connector that possesses the resource list, see https://entrecode.github.io/ec.sdk/#api-connectors */
  @Input() api: Core; // sdk api connector
  /** The name of the resource. If given, the generic ListResource loading will be used (api.resourceList) */
  @Input() relation: string;
  /** The loader that should be shown while the list is loaded. */
  @Input() loader: LoaderComponent;

  /** The constructor will just call super of List*/
  constructor(
    protected loaderService: LoaderService,
    protected sdk: SdkService,
    protected notificationService: NotificationsService,
    @Optional() public route: ActivatedRoute
  ) {
    super();
    if (route) {
      route.queryParams.subscribe(query => {
        this.config.query = Object.assign({}, query);
      });
    }
  }

  /** The method to create the list*/
  protected createList(): Promise<ResourceList | void> | ResourceList {
    if (!this.relation || !this.api) {
      return;
      // return Promise.reject(`cannot create ResourceList: no relation or api given. Relation: ${this.relation} API: ${this.api}`);
    }
    this.config = Object.assign(
      {},
      resourceConfig[this.relation] || {},
      this.config || {}
    );

    return new ResourceList(this.config, this.api, this.relation, this.listResource);
  }

  /** Creates/Updates the list and subscribes Observables.  */
  update() {
    this.config = Object.assign(this.config || {}, this.configInput || {});
    Promise.resolve(this.createList()).then(list => {
      if (!list) {
        return;
      }
      this.list = list;
      if (this.list.promise) {
        this.loaderService.wait(this.list.promise, this.loader);
      }
      this.list.loading$.subscribe((promise: Promise<any>) => {
        this.loaderService.wait(promise, this.loader);
      });
      this.list.error$.subscribe(err => {
        this.notificationService.emit({
          title: 'Fehler beim laden der Liste',
          error: err
        });
      });
      if (!this.selection) {
        this.selection = new Selection([], this.list.config);
      }
    });
  }

  /** When changing the model or the config, the list will update*/
  ngOnChanges(changes?) {
    if (changes && changes.relation) {
      this.config = this.configInput;
      delete this.selection;
    }
    this.update();
  }

  /** This method will filter the list by a given property value and optional operator. */
  filter(property: string, value: any) {
    this.list.filter(property, value);
  }

  initFilterQuery(
    fieldFilter: (property: string, value: any) => { property; value }
  ) {
    if (!this.config.query || !this.config.fields || !fieldFilter) {
      return;
    }
    Object.keys(this.config.query)
      .filter(property => fieldFilter(property, this.config.query[property]))
      .map(property => fieldFilter(property, this.config.query[property]))
      .filter(filter => {
        return Object.keys(this.config.fields).indexOf(filter.property) !== -1;
      })
      .forEach(filter => {
        this.config.filter = Object.assign(this.config.filter || {}, {
          [filter.property]: filter.value
        });
      });
  }
}
