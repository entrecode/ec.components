import moment from 'moment-es6';
import { FieldConfig } from '../../../core/index';
import { ListConfig } from '../../../core/src/list/list-config.interface';

function onSave(form, value) {
  console.log('save resource form', form);
  const resource = form.getBody();
  form.serialize(value, resource);
  if ('save' in resource) {
    Object.assign(resource, value);
    return resource.save();
  } else {
    console.log('create', resource);
  }
  return value; // TODO create
}

export const resourceConfig: { [key: string]: ListConfig<any> } = {
  dataManager: {
    identifier: 'dataManagerID',
    label: 'title',
    onSave,
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
    onSave,
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
    onSave,
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
        sortable: true,
        readOnly: true
      },
      isPending: {
        label: 'Pending',
        view: 'boolean',
        filterable: true,
        sortable: true,
        readOnly: true
      }
    }
  },
  template: {
    identifier: 'templateID',
    label: 'name',
    onSave,
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
    onSave,
    fields: {
      hexColor: {
        label: '#',
        view: 'color',
        sortable: true
      },
      /*
      shortID: {
        label: 'shortID'
      },
      appID: {
        label: 'ID'
      }, */
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
  },
  platform: {
    identifier: 'platformID',
    onSave,
    fields: {
      title: {
        label: 'Platform',
        view: 'string'
      },
      platformType: {
        label: 'Type',
        view: 'string'
      },
    }
  }
};
