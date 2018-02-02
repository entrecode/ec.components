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
    console.log('would now create', resource);
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
    fields: {
      hexColor: {
        label: '#',
        view: 'color',
        sortable: true,
        prefill: '#ffffff'
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
      locales: {
        list: false,
        prefill: []
      },
      fields: {
        view: 'tags',
        display: (value) => {
          return value.map(field => field.title)
        },
        prefill: []
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
      shortID: {
        label: 'shortID',
        list: false
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
    onSave,
    fields: {
      assetID: {
        label: 'assetID',
        list: false,
        form: false
      },
      title: {
        label: 'Titel',
        view: 'string'
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
        form: false,
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
  assetGroup: { // https://doc.entrecode.de/en/develop/resources/dm-assetgroup/
    identifier: 'assetGroupID',
    onSave,
    fields: {
      assetGroupID: {
        label: 'assetGroupID',
        view: 'string'
      },
      public: {
        view: 'boolean'
      },
      settings: {
        view: 'json',
        display: (json) => JSON.stringify(json),
        prefill: {}
      },
      policies: {
        view: 'tags',
        display: (policies) => policies.map(p => p.method),
        prefill: []
      }
    }
  },
  client: {
    identifier: 'clientID',
    onSave,
    fields: {
      hexColor: {
        label: '#',
        view: 'color',
        sortable: true
      },
      clientID: {
        label: 'clientID',
        view: 'string'
      },
      callbackURL: {
        label: 'Callback URL',
        view: 'string',
      },
      tokenMethod: {
        label: 'Token Method',
        view: 'tags'
      },
      disableStrategies: {
        view: 'tags'
      }
    }
  },
  role: {
    identifier: 'roleID',
    onSave,
    fields: {
      name: {
        label: 'Name',
        view: 'string',
        filterable: true,
        sortable: true
      },
      label: {
        label: 'Label',
        view: 'string'
      },
      accounts: {
        label: 'accounts',
        view: 'tags',
        prefill: []
      },
      addRegistered: {
        label: 'addRegistered',
        view: 'boolean'/* ,
        prefill: false */
      },
      addUnregistered: {
        label: 'addUnregistered',
        view: 'boolean'/* ,
        prefill: false */
      }
    }
  },
  codeSource: {
    identifier: 'codeSourceID',
    onSave,
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
    onSave,
    fields: {
      dataSourceID: {
        label: 'ID'
      }
    }
  },
  target: {
    identifier: 'targetID',
    onSave,
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
    onSave,
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
