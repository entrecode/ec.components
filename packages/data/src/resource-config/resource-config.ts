import moment from 'moment-es6';
import { FieldConfig, Form, ListConfig } from '@ec.components/core/index';

/** Save callback for resources. TBD */
function onSave(form, value) {
  const resource = form.getBody();
  form.serialize(value, resource);
  if ('save' in resource) {
    console.log('save', resource);
    Object.assign(resource, value);
    return resource.save();
  } else {
    console.log('create', resource);
  }
  return resource; // TODO create
}

/** Contains default configurations for all kinds of resources. Used by ResourceList and ResourceForm.  */
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
      config: {
        label: 'Config',
        list: false
      }
    }
  },
  asset: {
    identifier: 'assetID',
    fields: {
      assetID: {
        label: 'assetID',
        list: false,
        form: false
      },
      title: {
        label: 'Titel'
      },
      created: {
        label: 'Datum',
        sortable: true,
        display: value => moment(value).format('DD.MM.YY'),
        group: value => moment(value).format('MMMM YYYY'),
        form: false
      },
      files: {
        label: 'Dateien',
        view: 'tag',
        display: value => value.length
      },
      thumb: {
        label: 'Vorschau',
        view: 'avatar',
        resolve: (asset) => {
          if (asset.type !== 'image') {
            return '';
          }
          return asset.getImageUrl(200);
        },
        readOnly: true
      },
      tags: {
        label: 'Tags',
        view: 'tags'
      },
    }
  },
  client: {
    identifier: 'clientID',
    fields: {
      hexColor: {
        label: '#',
        view: 'color',
        sortable: true
      },
      clientID: {
        label: 'clientID'
      },
      callbackURL: {
        label: 'Callback'
      },
      disableStrategies: {
        view: 'tags'
      }
    }
  },
  role: {
    identifier: 'roleID',
    fields: {
      roleID: {
        label: 'roleID'
      }
    }
  },
  codeSource: {
    identifier: 'codeSourceID',
    fields: {
      codeSourceID: {
        label: 'ID'
      },
      codeSourceType: {
        label: 'Typ',
        view: 'tag'
      },
      config: {
        label: 'config',
        list: false
      }
    }
  },
  dataSource: {
    identifier: 'dataSourceID',
    fields: {
      dataSourceID: {
        label: 'ID'
      }
    }
  },
  target: {
    identifier: 'targetID',
    fields: {
      targetType: {
        label: 'Typ',
        view: 'tag'
      },
      config: {
        label: 'Config',
        list: false
      }
    }
  },
  group: {
    identifier: 'groupID',
    fields: {
      name: {
        label: 'Name'
      },
      permissions: {
        label: 'Permissions',
        view: 'tags'
      }
    }
  }
}
