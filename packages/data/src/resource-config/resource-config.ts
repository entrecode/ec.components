import { Resource } from 'halfred';
import moment from 'moment-es6';
import { FieldConfig } from '../../../core/index';
import { ListConfig } from '../../../core/src/list/list-config.interface';

export const resourceConfig: { [key: string]: ListConfig<any> } = {
  dataManager: {
    identifier: 'dataManagerID',
    label: 'title',
    /* onSave: (item, value) => {
            const datamanager = item.getBody();
            item.serialize(value, datamanager instanceof DataManagerResource);
            Object.assign(datamanager, value);
            if (datamanager instanceof DataManagerResource) {
                return datamanager.save();
            }
            return value; // TODO create
        }, */
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
        filterable: true /*,
                sortable: true,*/
      },
      created: {
        label: 'Datum',
        sortable: true,
        display: value => moment(value).format('DD.MM.YY'),
        group: value => moment(value).format('MMMM YYYY'),
        form: false
      }
    }
  },
  model: {
    identifier: 'modelID',
    label: 'title',
    /* onSave: (item, value) => {
          const model = item.getBody();
          item.serialize(value, model instanceof ModelResource);
          Object.assign(model, value);
          if (model instanceof model) {
            return model.save();
          }
          return value; // TODO create
        }, */
    fields: {
      hexColor: {
        label: '#',
        view: 'color',
        sortable: true
      },
      title: {
        label: 'Model',
        view: 'string',
        filterable: true,
        sortable: true
      },
      description: {
        label: 'Beschreibung',
        view: 'string',
        filterable: true /*,
            sortable: true,*/
      },
      created: {
        label: 'Datum',
        display: value => moment(value).format('DD.MM.YY'),
        group: value => moment(value).format('MMMM YYYY'),
        form: false
      }
    }
  },
  account: {
    identifier: 'accountID',
    label: 'email',
    fields: {
      email: {
        label: 'Email',
        view: 'string',
        filterable: true,
        sortable: true
      },
      hasPassword: {
        label: 'Passwort',
        view: 'boolean',
        filterable: true,
        sortable: true
      },
      isPending: {
        label: 'Pending',
        view: 'boolean',
        filterable: true,
        sortable: true
      }
    }
  },
  template: {
    identifier: 'templateID',
    label: 'name',
    fields: {
      name: {
        label: 'Template',
        view: 'string',
        filterable: true,
        sortable: true
      },
      version: {
        label: 'Datum',
        display: value => moment(value).format('DD.MM.YY'),
        group: value => moment(value).format('MMMM YYYY'),
        form: false
      }
    }
  },
  app: {
    identifier: 'appID',
    fields: {
      hexColor: {
        label: '#',
        view: 'color',
        sortable: true
      },
      shortID: {
        label: 'shortID'
      },
      appID: {
        label: 'ID'
      },
      title: {
        label: 'App',
        view: 'string',
        filterable: true,
        sortable: true,
      },
      created: {
        label: 'Datum',
        sortable: true,
        display: value => moment(value).format('DD.MM.YY'),
        group: value => moment(value).format('MMMM YYYY'),
        form: false
      }
    }
  }
};
