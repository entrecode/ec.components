import { EntryListConfig } from '../../data/';
import { ResourceList } from '../resource-list/resource-list';
import { SdkService } from '../../data/sdk/sdk.service';
import * as moment from 'moment';
import { DataManagerResource } from 'ec.sdk/typings/resources/datamanager/DataManagerResource';

/**
 * Extension of List for Datamanagers
 */
export class ModelList<ModelResource> extends ResourceList<ModelResource> {
  private datamanager: DataManagerResource | string;

  constructor(datamanager: DataManagerResource | string, config: EntryListConfig, sdk: SdkService) {
    super(Object.assign(config, {
      identifier: 'modelID',
      fields: {
        hexColor: {
          label: '#',
          view: 'color',
          sortable: true
        },
        title: {
          label: 'Name',
          view: 'string',
          filterable: true,
          sortable: true
        },
        description: {
          label: 'Beschreibung',
          view: 'string',
          filterable: true/*,
          sortable: true,*/
        },
        created: {
          label: 'Datum',
          display: (value) => moment(value).format('DD.MM.YY'),
          group: (value) => moment(value).format('MMMM YYYY'),
          form: false
        }
      }
    }), sdk);
    this.datamanager = datamanager;
    this.sdk.ready.subscribe(() => {
      this.load();
    });
  }

  /** Overrides the List load method. Instead of slicing the page out of all items, a datamanager request is made using the config.*/
  public load(config?: EntryListConfig) {
    if (!this.sdk || !this.sdk.datamanager) {
      return;
    }
    this.useConfig(config);
    const loading =
      this.resolveDatamanager()
      .then((datamanager) => {
        this.datamanager = datamanager;
        return this.datamanager.modelList(this.getFilterOptions(this.config));
      }).then((list) => {
        this.use(list);
      }).catch((err) => {
        this.error.next(err);
      });
    this.loading.next(loading);
    return loading;
  }

  public resolveDatamanager(): Promise<DataManagerResource> {
    if (typeof this.datamanager === 'string') {
      return this.sdk.datamanager.dataManager(this.datamanager)
    }
    return Promise.resolve(this.datamanager);
  }

}
