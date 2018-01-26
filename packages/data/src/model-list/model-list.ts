import { ResourceList } from '../resource-list/resource-list';
import { SdkService } from '../sdk/sdk.service';
import moment from 'moment-es6';
import DataManagerResource from 'ec.sdk/lib/resources/datamanager/DataManagerResource';
import ModelResource from 'ec.sdk/lib/resources/datamanager/ModelResource';
import { ListConfig } from '@ec.components/core/src/list/list-config.interface';

/**
 * Extension of List for Models. Deprecated due to ResourceList (model relation).
 */
export class ModelList extends ResourceList<ModelResource> {
  private datamanager: DataManagerResource | string;

  constructor(datamanager: DataManagerResource | string, config: ListConfig<ModelResource>, public sdk: SdkService) {
    super(Object.assign({
      identifier: 'modelID',
      onSave: (item, value) => {
        const model = item.getBody();
        item.serialize(value, model instanceof ModelResource);
        Object.assign(model, value);
        if (model instanceof model) {
          return model.save();
        }
        return value; // TODO create
      },
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
    }, config));
    this.datamanager = datamanager;
    this.sdk.ready.then(() => {
      this.load();
    });
  }

  /** Overrides the List load method. Instead of slicing the page out of all items, a datamanager request is made using the config.*/
  public load(config?: ListConfig<ModelResource>) {
    if (!this.sdk || !this.sdk.datamanager || !this.datamanager) {
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
