import moment from 'moment-es6';
import { FieldConfig, Form, ListConfig } from '@ec.components/core/index';
import { CrudConfig } from '../crud/crud-config.interface';
import localeFr from '@angular/common/locales/fr';

export const created = {
  label: 'Datum',
  sortable: true,
  display: value => moment(value).format('DD.MM.YY'),
  group: value => moment(value).format('MMMM YYYY'),
  form: false,
  immutable: true
};

export function hexColor() {
  return {
    label: '#',
    view: 'color',
    prefill: '#ffffff'
  }
};

export function tagsField(label, list = true) {
  return {
    label,
    view: 'tags',
    display: (value) => value || [],
    list
  };
}

export function stringField(label, filterable = true, sortable = true) {
  return {
    label,
    view: 'string',
    filterable,
    sortable
  };
}

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
      hexColor: hexColor(),
      shortID: {
        immutable: true,
        list: false
      },
      title: stringField('Name'),
      description: {
        label: 'Beschreibung',
        view: 'string',
        filterable: true
      },
      config: {
        label: 'Config',
        view: 'json',
        list: false
      },
      defaultLocale: {
        list: false
      },
      locales: tagsField('Locales', false),
      publicAssetRights: tagsField('publicAssetRights', false),
      rights: tagsField('rights', false),
      created,
    }
  },
  model: {
    identifier: 'modelID',
    label: 'title',
    fields: {
      hexColor: hexColor(),
      title: stringField('Model'),
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
          return (value || []).map(field => field.title).filter(field => field[0] !== '_')
        },
        prefill: []
      },
      titleField: {
        view: 'string',
        list: false
      },
      config: {
        list: false,
        view: 'json'
      },
      hasEntries: {
        immutable: true,
        view: 'boolean'
      },
      hooks: {
        display: (value) => {
          return (value || []).map(hook => (hook.methods || []).join(', '))
        },
        view: 'tags'
      },
      policies: {
        display: (value) => {
          return (value || []).map(policy => policy.method)
        },
        view: 'tags'
      },
      sync: {
        list: false,
        view: 'json'
      },
      /* lastSyncs: {
        label: 'Zuletzt synchronisiert',
        display: (values) => {
          if (values) {
            console.log('values', values);
          }
          return (values || []).map(value => value && value.finished ? moment(value.finished).format('DD.MM.YY') : '-')
        },
        view: 'tags'
      }, */
      created,
    }
  },
  account: {
    identifier: 'accountID',
    label: 'email',
    permissions: {
      get: 'acc:list',
      put: 'acc:edit:<accountID>'
    },
    fields: {
      name: stringField('Name'),
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
      hasPendingEmail: {
        label: 'Pending',
        view: 'boolean',
        filterable: true,
        sortable: true,
        readOnly: true
      },
      language: {
        label: 'Sprache',
        view: 'string',
        list: false
      },
      openID: {
        list: false
      },
      permissions: tagsField('Permissions', false),
      groups: {
        label: 'Gruppen',
        view: 'tags',
        list: false,
        display: (value) => value ? value.map(group => group.name) : []
      },
      state: {
        label: 'Status'
      },
      created,
    }
  },
  dmAccount: {
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
      pending: {
        label: 'Pending',
        view: 'boolean',
        filterable: true,
        sortable: true,
        readOnly: true
      },
      oauth: {
        list: false
      }
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
        label: 'Version',
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
      hexColor: hexColor(),
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
      created,
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
      },
      created,
    }
  },
  asset: {
    identifier: 'assetID',
    fields: {
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
      files: {
        label: 'Dateien',
        view: 'tag',
        form: false,
        display: value => value.length,
        immutable: true
      },
      tags: tagsField('Tags'),
      created,
    }
  },
  assetGroup: { // https://doc.entrecode.de/en/develop/resources/dm-assetgroup/
    identifier: 'assetGroupID',
    fields: {
      assetGroupID: {
        label: 'assetGroupID',
        view: 'string',
        filterable: true
      },
      public: {
        view: 'boolean',
        prefill: false
      },
      settings: {
        view: 'json',
        display: (json) => JSON.stringify(json),
        prefill: {}
      },
      policies: {
        view: 'tags',
        display: (policies) => (policies || []).map(p => p.method),
        prefill: []
      },
      created,
    }
  },
  dmAsset: {
    identifier: 'assetID',
    fields: {
      file: {
        label: 'File',
        display: value => value.url,
        view: 'avatar',
        immutable: true,
        form: false
      },
      assetID: {
        label: 'assetID',
        list: false,
        form: false,
        immutable: true
      },
      title: {
        label: 'Titel',
        view: 'string',
        sortable: true,
        filterable: true
      },
      caption: {
        label: 'Caption',
        view: 'string'
      },
      duplicates: {
        label: 'Duplikate',
        view: 'number',
        list: false,
        form: false
      },
      thumbnails: {
        label: 'Thumb',
        display: values => values.map(value => value.url),
        list: false,
        form: false
      },
      type: {
        label: 'Typ',
        view: 'string',
        immutable: true,
        form: false
      },
      created,
    }
  },
  client: {
    identifier: 'clientID',
    fields: {
      clientID: {
        label: 'clientID',
        view: 'string'
      },
      callbackURL: {
        label: 'Callback URL',
        view: 'string',
      },
      tokenMethod: tagsField('Token Method'),
      disableStrategies: tagsField('disableStrategies'),
      created,
    }
  },
  role: {
    identifier: 'roleID',
    label: 'name',
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
        prefill: [],
        list: false
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
      },
      created,
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
      },
      created,
    }
  },
  dataSource: {
    identifier: 'dataSourceID',
    fields: {
      dataSourceID: {
        label: 'ID'
      },
      created,
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
      },
      created,
    }
  },
  group: {
    identifier: 'groupID',
    fields: {
      name: {
        label: 'Name'
      },
      permissions: {
        view: 'tags',
        display: (value) => value || [],
        list: false
      },
      created,
    }
  }
}
