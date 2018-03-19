import { Component, Input, Optional } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SdkService } from '../sdk/sdk.service';
import { ModelConfigService } from '../model-config/model-config.service';
import { LoaderService } from '@ec.components/ui/src/loader/loader.service';
import { EntryList } from './entry-list';
import { CrudService } from '../crud/crud.service';
import { NotificationsService } from '@ec.components/ui/src/notifications/notifications.service';
import { ResourceListComponent } from '../resource-list/resource-list.component';
import EntryResource from 'ec.sdk/lib/resources/publicAPI/EntryResource';
import { ListConfig } from '@ec.components/core/src/list/list-config.interface';
import { SymbolService } from '@ec.components/ui/src/symbol/symbol.service';
import { ResourceService } from '../resource-config/resource.service';

/** The EntryListComponent is a thin holder of an EntryList instance. It extends the ListComponent
 * <example-url>https://components.entrecode.de/data/entry-list</example-url>
*/
@Component({
  selector: 'ec-entry-list',
  templateUrl: '../../../ui/src/list/list.component.html', // TODO avoid relative paths
  styleUrls: ['./entry-list.component.scss']
})
export class EntryListComponent extends ResourceListComponent {
  /** The model whose entries should be shown.*/
  @Input() model: string;
  /** Overrides the Config of ResourceList with a ListConfig containing an EntryResource */
  config: ListConfig<EntryResource> = {};

  /** The constructor will just call super of List*/
  constructor(protected loaderService: LoaderService,
    protected sdk: SdkService,
    protected notificationService: NotificationsService,
    protected modelConfig: ModelConfigService,
    protected crud: CrudService,
    protected symbol: SymbolService,
    protected resourceService: ResourceService,
    @Optional() public route: ActivatedRoute) {
    super(loaderService, sdk, notificationService, symbol, resourceService, route);
    /*if (route) {
      route.params.subscribe(({ model }) => {
        if (model) {
          this.model = model;
        }
      })
    }*/
  }

  initFilter() {
    this.initFilterQuery((property, value) => {
      const target = property.split('.');
      const field = this.config.fields[target[1]];
      if (target[0] === this.model && field) {
        return {
          property: target[1],
          value: field.queryFilter ? field.queryFilter(value) : value
        }
      }
    });
  }

  createList(): Promise<EntryList> {
    if (!this.model) {
      return;
    }
    this.crud.change({ model: this.model })
      .subscribe((update) => {
        this.list.load();
      }); // TODO: remove crud service or similar
    this.resourceService.change({ relation: this.model })
      .subscribe((update) => {
        this.list.load();
      });
    return this.modelConfig.generateConfig(this.model, (this.config || {}).fields)
      .then((config: ListConfig<EntryResource>) => {
        this.config = Object.assign(this.config || {}, config);
        this.initFilter();
        return new EntryList(this.model, this.config, this.sdk);
      });

  }
}
