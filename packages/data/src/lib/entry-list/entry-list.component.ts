import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, Optional } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListConfig } from '@ec.components/core';
import { ListConfigService, LoaderService, NotificationsService, SymbolService, ListComponent } from '@ec.components/ui';
import EntryResource from 'ec.sdk/lib/resources/publicAPI/EntryResource';
import { CrudService } from '../crud/crud.service';
import { ModelConfigService } from '../model-config/model-config.service';
import { ResourceService } from '../resource-config/resource.service';
import { ResourceListComponent } from '../resource-list/resource-list.component';
import { SdkService } from '../sdk/sdk.service';
import { EntryList } from './entry-list';
import { listTemplate } from '@ec.components/ui';

/** The EntryListComponent is a thin holder of an EntryList instance. It extends the ListComponent
 * <example-url>https://components.entrecode.de/entries/entry-list?e=1</example-url>
*/
@Component({
  selector: 'ec-entry-list',
  template: listTemplate,
  changeDetection: ChangeDetectionStrategy.OnPush
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
    public listConfig: ListConfigService,
    public cdr: ChangeDetectorRef,
    @Optional() public route: ActivatedRoute) {
    super(loaderService,
      sdk,
      notificationService,
      symbol,
      resourceService,
      listConfig,
      cdr,
      route);
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
        };
      }
    });
  }

  createList(): Promise<EntryList> {
    if (!this.model) {
      return;
    }
    this.resourceService.change({ relation: `model.${this.model}` })
      .subscribe((update) => this.list.load());
    return this.modelConfig.generateConfig(this.model, (this.config || {}).fields)
      .then((config: ListConfig<EntryResource>) => {
        this.config = Object.assign(this.config || {}, config);
        this.initFilter();
        return new EntryList(this.model, this.config, this.sdk);
      });

  }
}
