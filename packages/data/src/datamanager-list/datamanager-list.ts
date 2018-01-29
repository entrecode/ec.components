import { ResourceList } from '../resource-list/resource-list';
import { SdkService } from '../sdk/sdk.service';
import moment from 'moment-es6';
import DataManagerResource from 'ec.sdk/lib/resources/datamanager/DataManagerResource';
import { ListConfig } from '@ec.components/core/src/list/list-config.interface';

/**
 * Extension of List for Datamanagers
 */
export class DatamanagerList extends ResourceList<DataManagerResource> {

  constructor(config: ListConfig<DataManagerResource>, protected sdk: SdkService) {
    super(Object.assign({
      identifier: 'datamanagerID',
      onSave: (item, value) => {
        const datamanager = item.getBody();
        item.serialize(value, datamanager instanceof DataManagerResource);
        Object.assign(datamanager, value);
        if (datamanager instanceof DataManagerResource) {
          return datamanager.save();
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
          sortable: true,
          display: (value) => moment(value).format('DD.MM.YY'),
          group: (value) => moment(value).format('MMMM YYYY'),
          form: false
        }
      }
    }, config));
    this.sdk.ready.then(() => {
      this.load();
    });
  }

  /** Overrides the List load method. Instead of slicing the page out of all items, a datamanager request is made using the config.*/
  public load(config?: ListConfig<DataManagerResource>) {
    if (!this.sdk || !this.sdk.datamanager) {
      return;
    }
    this.useConfig(config);
    this.promise = this.sdk.datamanager.dataManagerList(this.getFilterOptions(this.config))
      .then((list) => {
        this.use(list);
      }).catch((err) => {
        this.error.next(err);
      });
    this.loading.next(this.promise);
    return this.promise;
  }

}
