import { ChangeDetectorRef, Component, ElementRef, EventEmitter, forwardRef, Input, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Item } from '@ec.components/core';
import { ModelConfigService } from '../model-config/model-config.service';
import { Action, ActionbarComponent, ListComponent, selectTemplate } from '@ec.components/ui';
import EntryResource from 'ec.sdk/lib/resources/publicAPI/EntryResource';
import LiteEntryResource from 'ec.sdk/lib/resources/publicAPI/LiteEntryResource';
import { CrudConfig } from '../crud/crud-config.interface';
import { ResourceConfig } from '../resource-config/resource-config.service';
import { SdkService } from '../sdk/sdk.service';

@Component({
  selector: 'ec-entry-actionbar',
  template: selectTemplate,
  /* encapsulation: ViewEncapsulation.None, */
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => EntryActionbarComponent),
      multi: true,
    },
  ],
})
export class EntryActionbarComponent extends ActionbarComponent implements OnInit {
  entrySelectActions: Action[];
  selectedEntries;
  /** The event that focuses the input */
  @Input() focusEvent: EventEmitter<boolean> = new EventEmitter();
  /** The model to pick from, alternative to field with model property set. */
  @Input() model: string;
  /** The config that should be merged into the generated config */
  // tslint:disable-next-line:no-input-rename
  @Input('config') crudConfig: CrudConfig<EntryResource>;
  lightModel: any;

  constructor(
    public sdk: SdkService,
    public resourceConfig: ResourceConfig,
    public elementRef: ElementRef,
    public cdr: ChangeDetectorRef,
    public modelConfig: ModelConfigService,
  ) {
    super(elementRef, cdr);
  }

  ngOnInit() {
    if (!this.model) {
      this.loadModelActions();
    } else {
      this.loadEntryActions(this.model);
    }
  }

  getEntryAction(entry: EntryResource | LiteEntryResource) {
    return {
      id: entry._id,
      title: entry._entryTitle,
    };
  }

  async loadModelActions() {
    delete this.model;
    this.placeholder = 'Select Model...';
    const modelActions = await this.getModelActions();
    this.loadActions(modelActions);
  }

  async getModelActions(): Promise<Action[]> {
    await this.sdk.ready;
    return this.sdk.api.models.map((model) => ({
      id: 'model',
      select: false,
      title: model.title,
      action: () => this.loadEntryActions(model.title),
    }));
  }

  async loadEntryActions(model, filterOptions = {}) {
    this.model = model;
    this.lightModel = await this.modelConfig.getLightModel(this.model);
    const entryList = await this.sdk.api.entryList(model, filterOptions);
    const entryActions: any[] = entryList.getAllItems().map((entry) => this.getEntryAction(entry));
    this.placeholder = 'Select Entry from "' + model + '"...';
    entryActions.unshift({
      id: 'select-another-model',
      title: 'Select another model...',
      select: false,
      action: () => this.loadModelActions(),
    });
    const nextPageAction = this.getNextPageAction(entryList);
    if (nextPageAction) {
      entryActions.push(nextPageAction);
    }
    this.loadActions(entryActions);
  }

  getNextPageAction(entryList) {
    if (entryList.hasNextLink()) {
      return {
        id: 'load-next-page',
        title: 'Load More...',
        select: false,
        action: async () => {
          const nextPage = await entryList.followNextLink();
          const entryActions: any[] = nextPage.getAllItems().map((entry) => this.getEntryAction(entry));
          const allActions = (this.currentActions() || []).filter(a => a.id !== 'load-next-page').concat(entryActions);
          const nextPageAction = this.getNextPageAction(nextPage);
          if (nextPageAction) {
            allActions.push(nextPageAction);
          }
          this.loadActions(allActions);

        }
      };
    }
  }

  writeValue(value) {
    if (!value) {
      value = [];
    }
    this.selection?.replaceWith(value.map((liteEntry) => new Item(this.getEntryAction(liteEntry), this.config)));
  }

  filterDropdownList(listComponent: ListComponent<any>, query) {
    if (this.lightModel && this.model) {
      this.loadEntryActions(this.model, { [this.lightModel.titleField]: { search: query } }); // title: { search: query }
    } else {
      return super.filterDropdownList(listComponent, query);
    }
  }
}
