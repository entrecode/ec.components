import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, OnDestroy, Optional } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  componentDestroyed, ListComponent,
  ListConfigService,





  listTemplate, LoaderComponent,
  LoaderService,
  NotificationsService,
  SymbolService,
  WithLoader
} from '@ec.components/ui';
import Core from 'ec.sdk/lib/Core';
import ListResource from 'ec.sdk/lib/resources/ListResource';
import Resource from 'ec.sdk/lib/resources/Resource';
import { takeUntil } from 'rxjs/operators';
import { ResourceConfig } from '../resource-config/resource-config.service';
import { ResourceService } from '../resource-config/resource.service';
import { SdkService } from '../sdk/sdk.service';
import { ResourceList } from './resource-list';

/** The ResourceListComponent is an extension of ListComponent for SDK ListResources.
 * It is meant to be extended and overriden the createList method. See e.g. AssetListComponent. */
@Component({
  selector: 'ec-resource-list',
  template: listTemplate,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResourceListComponent extends ListComponent<Resource> implements OnChanges, WithLoader, OnDestroy {
  resourceConfig: ResourceConfig;
  /** If listResource input is set, the given ListResource will be used directly and loading will be skipped. */
  @Input() listResource: ListResource;
  /** If true, only one item is selectable next */
  @Input() solo: boolean;
  /** If set to false, the list will wait for the flag to turn true before loading. */
  @Input() loadWhen: boolean;
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
    protected symbol: SymbolService,
    protected resourceService: ResourceService,
    public listConfig: ListConfigService,
    public cdr: ChangeDetectorRef,
    @Optional() public route: ActivatedRoute,
  ) {
    super(listConfig, cdr);
    this.resourceConfig = this.resourceService.config;
    if (route) {
      route.queryParams.subscribe((query) => {
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
    const namespace = this.relation.split('.')[0];
    this.config = Object.assign({}, this.resourceConfig.get(namespace) || {}, this.config || {});

    this.resourceService.change({ relation: namespace })
      .pipe(takeUntil(componentDestroyed(this)))
      .subscribe((update) => {
        this.list.load();
      });

    return new ResourceList(this.config, this.api, this.relation, this.listResource);
  }

  ngOnDestroy() {
  }

  /** Creates/Updates the list and subscribes Observables.  */
  update() {
    if (this.loadWhen === false) {
      return;
    }
    this.config = Object.assign(this.config || {}, this.configInput || {});
    Promise.resolve(this.createList()).then((list) => {
      if (!list) {
        return;
      }
      this.init(list);
      if (this.list.promise) {
        this.loaderService.wait(this.list.promise, this.loader);
      }
      this.list.loading$.subscribe((promise: Promise<any>) => {
        this.loaderService.wait(promise, this.loader);
        this.isLoading = true;
        this.cdr.markForCheck();
        promise.then(() => {
          this.isLoading = false;
          this.cdr.markForCheck();
        });
      });
      this.list.error$.subscribe((err) => {
        this.notificationService.emit({
          title: this.symbol.resolve('error.load'),
          error: err,
        });
      });
    });
  }

  /** When changing the model or the config, the list will update*/
  ngOnChanges(changes?) {
    if (changes && changes.relation && changes.relation.previousValue) {
      this.config = this.configInput;
      delete this.selection;
    }
    this.update();
  }

  /** This method will filter the list by a given property value and optional operator. */
  filter(property: string, value: any): Promise<any> {
    return this.list.filter(property, value);
  }

  initFilterQuery(fieldFilter: (property: string, value: any) => { property; value }) {
    if (!this.config.query || !this.config.fields || !fieldFilter) {
      return;
    }
    Object.keys(this.config.query)
      .filter((property) => fieldFilter(property, this.config.query[property]))
      .map((property) => fieldFilter(property, this.config.query[property]))
      .filter((filter) => {
        return Object.keys(this.config.fields).indexOf(filter.property) !== -1;
      })
      .forEach((filter) => {
        this.config.filter = Object.assign(this.config.filter || {}, {
          [filter.property]: filter.value,
        });
      });
  }
}
