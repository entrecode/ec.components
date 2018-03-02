import moment from 'moment-es6';
import { FieldConfig, Form, ListConfig } from '@ec.components/core/index';
import { CrudConfig } from '../crud/crud-config.interface';
import localeFr from '@angular/common/locales/fr';

/** Contains default configurations for all kinds of resources. Used by ResourceList and ResourceForm.  */
export const resourceConfig: { [key: string]: CrudConfig<any> } = {
  dataManager: {
    identifier: 'dataManagerID',
    label: 'title',
    permissions: {
      post: 'dm-create',
      put: 'dm:<dataManagerID>:edit',
      delete: 'dm:<dataManagerID>:delete',
      get: true
    },
    fields: {
      hexColor: {
        label: '#',
        view: 'color',
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
        filterable: true
      },
      created: {
        label: 'Datum',
        sortable: true,
        display: value => moment(value).format('DD.MM.YY'),
        group: value => moment(value).format('MMMM YYYY'),
        form: false
      },
      config: {
        label: 'Config',
        view: 'json',
        list: false
      }
    }
  },
  model: {
    identifier: 'modelID',
    label: 'title',
    fields: {
      hexColor: {
        label: ' ',
        view: 'color',
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
        filterable: true,
      },
      locales: {
        list: false,
        prefill: []
      },
      fields: {
        view: 'tags',
        display: (value) => {
          return value.map(field => field.title).filter(field => field[0] !== '_')
        },
        prefill: []
      },
      created: {
        sortable: true,
        label: 'Datum',
        display: value => moment(value).format('DD.MM.YY'),
        group: value => moment(value).format('MMMM YYYY'),
        form: false
      }
    }
  },
  account: { // TODO: seperate ec and dm account resources (same name, different boat) (COM-111)
    identifier: 'accountID',
    label: 'email',
    permissions: {
      get: 'acc:list',
      put: 'acc:edit:<accountID>'
    },
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
      }/* ,
      groups: {
        label: 'Gruppen',
        view: 'tags'
      } */
    }
  },
  template: {
    identifier: 'templateID',
    label: 'name',
    permissions: {
      post: 'dm-template-create',
      get: 'dm-template:<templateID>:view'
    },
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
    permissions: {
      post: 'app-create',
      delete: 'app:<appID>:delete',
      put: 'app:<appID>:edit'
    },
    fields: {
      hexColor: {
        label: '#',
        view: 'color',
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
        view: 'json',
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
        form: false,
        immutable: true
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
        form: false,
        immutable: true
      },
      files: {
        label: 'Dateien',
        view: 'tag',
        form: false,
        display: value => value.length,
        immutable: true
      },
      thumb: {
        form: false,
        label: 'Vorschau',
        view: 'avatar',
        resolve: (asset) => {
          if (asset.type !== 'image') {
            return '';
          }
          return asset.getImageUrl(200);
        },
        immutable: true
      },
      tags: {
        label: 'Tags',
        view: 'tags'
      },
    }
  },
  assetGroup: { // https://doc.entrecode.de/en/develop/resources/dm-assetgroup/
    identifier: 'assetGroupID',
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
    fields: {
      hexColor: {
        label: '#',
        view: 'color',
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
