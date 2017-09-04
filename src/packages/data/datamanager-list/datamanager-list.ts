import { EntryListConfig } from '../../data/';
import { ResourceList } from '../resource-list/resource-list';
import { SdkService } from '../sdk/sdk.service';
import * as moment from 'moment';
import DataManagerResource from 'ec.sdk/src/resources/datamanager/DataManagerResource';

/**
 * Extension of List for Datamanagers
 */
export class DatamanagerList<DatamanagerResource> extends ResourceList<DatamanagerResource> {

  constructor(config: EntryListConfig, protected sdk: SdkService) {
    super(Object.assign(config, {
      identifier: 'datamanagerID',
      onSave: (item, value) => {
        const datamanager = item.getBody();
        item.serialize(value, datamanager instanceof DataManagerResource);
        Object.assign(datamanager, value);
        if (datamanager instanceof DataManagerResource) {
          return datamanager.save();
        }
        return value; //TODO create
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
          sortable: true,
          display: (value) => moment(value).format('DD.MM.YY'),
          group: (value) => moment(value).format('MMMM YYYY'),
          form: false
        }
      }
    }), sdk);
    this.sdk.ready.then(() => {
      this.load();
    });
  }

  /** Overrides the List load method. Instead of slicing the page out of all items, a datamanager request is made using the config.*/
  public load(config?: EntryListConfig) {
    if (!this.sdk || !this.sdk.datamanager) {
      return;
    }
    this.useConfig(config);
    const loading = this.sdk.datamanager.dataManagerList(this.getFilterOptions(this.config))
    .then((list) => {
      this.use(list);
    }).catch((err) => {
      this.error.next(err);
    });
    this.loading.next(loading);
    return loading;
  }

}
