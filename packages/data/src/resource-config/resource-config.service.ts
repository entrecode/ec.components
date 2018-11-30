import { Injectable } from '@angular/core';
import { SymbolService } from '@ec.components/ui/src/symbol/symbol.service';
import Resource from 'ec.sdk/lib/resources/Resource';
import { CrudConfig } from '../crud/crud-config.interface';
import { AdminEntryInputComponent } from '../entry-form/admin-entry-input.component';
import { TypeConfigService } from '../model-config/type-config.service';

@Injectable()
/** Contains default configurations for all kinds of resources. Used by ResourceList and ResourceForm.  */
export class ResourceConfig {

  constructor(private symbol: SymbolService, private typeConfig: TypeConfigService) { }
  /** Returns the CrudConfig for the given relation name. */
  get(relationName: string): CrudConfig<Resource> {
    if (!this.config[relationName]) {
      console.error(`${relationName} could not be found in the resource-config.
      Use one of ${Object.keys(this.config)}`);
      return {};
    } // TODO enrich fields with type with type-config?
    return this.config[relationName];
  }

  /** returns the config for a created field */
  created(label = 'Date', symbol: SymbolService) {
    return {
      label,
      sortable: true,
      view: 'date',
      display: this.typeConfig.displayDate(),
      group: this.typeConfig.groupDate(),
      form: false,
      immutable: true
    }
  };
  /** returns the config for a hexColor field */
  hexColor() {
    return {
      label: '#',
      view: 'color',
      prefill: '#ffffff'
    }
  };
  /** returns the config for a tags field */
  tagsField(label, list = true) {
    return {
      label,
      view: 'tags',
      display: (value) => value || [],
      list
    };
  }
  /** returns the config for a string field */
  stringField(label, filterable = true, sortable = true) {
    return {
      label,
      view: 'string',
      filterable,
      sortable
    };
  }
  /** returns regex for a shortID */
  shortID(): RegExp {
    return /^[0-9A-Za-z-_]{7,14}$/;
  }
  /** returns regex for a uuid */
  uuid(): RegExp {
    return /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;
  }
  /** regex for base64 uuid */
  base64uuid(): RegExp {
    return /^[a-zA-Z0-9\\-_]{22}$/;
  }

  /** Returns the whole resource-config, which maps a resource relation name to a CrudConfig. */
  get config(): { [key: string]: CrudConfig<Resource> } {
    return {
      dataManager: {
        identifier: 'dataManagerID',
        identifierPattern: this.uuid(),
        label: 'title',
        permissions: {
          post: 'dm-create',
          put: 'dm:<dataManagerID>:edit',
          delete: 'dm:<dataManagerID>:delete',
          get: true
        },
        fields: {
          hexColor: this.hexColor(),
          shortID: {
            immutable: true,
            list: false
          },
          title: Object.assign(this.stringField('Name'), { required: true }),
          description: {
            label: this.symbol.resolve('field.label.description'),
            view: 'string',
            filterable: true
          },
          config: {
            label: this.symbol.resolve('field.label.config'),
            view: 'json',
            list: false,
            immutable: true
          },
          defaultLocale: {
            list: false,
            immutable: true
          },
          locales: this.tagsField(this.symbol.resolve('field.label.locales'), false),
          publicAssetRights: Object.assign(
            this.tagsField(this.symbol.resolve('datamanager.field.label.publicAssetRights'), false),
            { immutable: true }),
          rights: Object.assign(this.tagsField('rights', false), { immutable: true }),
          created: this.created(this.symbol.resolve('field.label.created'), this.symbol),
        }
      },
      model: {
        identifier: 'modelID',
        identifierPattern: this.uuid(),
        label: 'title',
        fields: {
          hexColor: this.hexColor(),
          title: Object.assign(this.stringField('Model'), { required: true }),
          description: {
            label: this.symbol.resolve('field.label.description'),
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
            view: 'json',
            immutable: true
          },
          created: this.created(this.symbol.resolve('field.label.created'), this.symbol),
        }
      },
      // ec accounts
      account: {
        identifier: 'accountID',
        identifierPattern: this.uuid(),
        label: 'email',
        permissions: {
          get: 'acc:list',
          put: 'acc:edit:<accountID>'
        },
        fields: {
          name: this.stringField(this.symbol.resolve('field.label.name')),
          email: {
            label: this.symbol.resolve('field.label.email'),
            view: 'string',
            filterable: true,
            sortable: true
          },
          hasPassword: {
            label: this.symbol.resolve('field.label.password'),
            view: 'boolean',
            filterable: true,
            sortable: true,
            readOnly: true
          },
          hasPendingEmail: {
            label: this.symbol.resolve('account.field.label.hasPendingEmail'),
            view: 'boolean',
            filterable: true,
            sortable: true,
            readOnly: true
          },
          language: {
            label: this.symbol.resolve('account.field.label.language'),
            view: 'string',
            list: false
          },
          openID: {
            list: false
          },
          permissions: this.tagsField(this.symbol.resolve('account.field.label.permissions'), false),
          groups: {
            label: this.symbol.resolve('account.field.label.groups'),
            type: 'groups',
            input: AdminEntryInputComponent,
            list: false,
            display: (value) => value ? value.map(group => group.name) : []
          },
          state: {
            label: this.symbol.resolve('account.field.label.state')
          },
          created: this.created(this.symbol.resolve('field.label.created'), this.symbol),
        }
      },
      dmAccount: {
        identifier: 'accountID',
        identifierPattern: this.uuid(),
        label: 'email',
        permissions: {
          get: 'acc:list',
          put: 'acc:edit:<accountID>'
        },
        methods: ['get', 'put', 'delete'],
        fields: {
          accountID: {
            label: this.symbol.resolve('field.label.id'),
            view: 'string',
            hideInList: true,
          },
          title: {
            label: 'Title',
            filterable: true,
            hideInList: true
          },
          email: {
            label: this.symbol.resolve('field.label.title'),
            view: 'string',
            filterable: true,
            sortable: true,
            resolve: (body) => body.email || body.accountID
          },
          hasPassword: {
            label: this.symbol.resolve('dmAccount.field.label.hasPassword'),
            view: 'boolean',
            filterable: true,
            readOnly: true
          },
          pending: {
            label: this.symbol.resolve('dmAccount.field.label.pending'),
            view: 'boolean',
            filterable: true,
            readOnly: true
          },
          oauth: {
            list: false
          }
        }
      },
      template: {
        identifier: 'templateID',
        identifierPattern: this.uuid(),
        label: 'name',
        permissions: {
          post: 'dm-template-create',
          get: 'dm-template:<templateID>:view'
        },
        fields: {
          name: {
            label: this.symbol.resolve('template.field.label.template'),
            view: 'string',
            filterable: true,
            sortable: true
          },
          version: {
            label: this.symbol.resolve('template.field.label.version'),
            display: this.typeConfig.displayDate(),
            group: this.typeConfig.groupDate(),
            form: false
          }
        }
      },
      app: {
        identifier: 'appID',
        identifierPattern: this.uuid(),
        permissions: {
          post: 'app-create',
          delete: 'app:<appID>:delete',
          put: 'app:<appID>:edit'
        },
        fields: {
          hexColor: this.hexColor(),
          shortID: {
            label: this.symbol.resolve('field.label.shortID'),
            list: false
          },
          title: {
            label: this.symbol.resolve('app.field.label.app'),
            view: 'string',
            filterable: true,
            sortable: true,
          },
          created: this.created(this.symbol.resolve('field.label.created'), this.symbol),
        }
      },
      platform: {
        identifier: 'platformID',
        identifierPattern: this.uuid(),
        fields: {
          title: {
            label: this.symbol.resolve('platform.field.label.platform'),
            view: 'string'
          },
          platformType: {
            label: this.symbol.resolve('platform.field.label.platformType'),
            view: 'string'
          },
          config: {
            label: this.symbol.resolve('field.label.config'),
            view: 'json',
            list: false
          },
          created: this.created(this.symbol.resolve('field.label.created'), this.symbol),
        }
      },
      asset: { // old ec.asset
        identifier: 'assetID',
        identifierPattern: this.uuid(),
        fields: {
          thumb: {
            form: false,
            label: this.symbol.resolve('asset.field.label.thumb'),
            view: 'preview',
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
            label: this.symbol.resolve('field.label.title'),
            view: 'string',
            sortable: true,
            filterable: true
          },
          files: {
            label: this.symbol.resolve('asset.field.label.files'),
            view: 'tag',
            form: false,
            display: value => value.length,
            immutable: true
          },
          type: {
            filterOperator: 'exact',
            form: false,
            immutable: true
          },
          tags: this.tagsField(this.symbol.resolve('asset.field.label.tags')),
          created: this.created(this.symbol.resolve('field.label.created'), this.symbol),
        }
      },
      tags: {
        identifier: 'tag',
        label: 'tag',
        fields: {
          tag: {
            view: 'string',
            readOnly: true,
            sortable: true,
            filterable: true
          },
          count: {
            view: 'number',
            readOnly: true,
            create: false,
            sortable: true
          }
        }
      },
      legacyAsset: { // old public assets
        identifier: 'assetID',
        identifierPattern: this.uuid(),
        label: 'title',
        fields: {
          thumb: {
            form: false,
            label: this.symbol.resolve('asset.field.label.thumb'),
            view: 'preview',
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
            label: this.symbol.resolve('field.label.title'),
            view: 'string',
            sortable: true,
            filterable: true
          },
          files: {
            label: this.symbol.resolve('asset.field.label.files'),
            view: 'tag',
            form: false,
            display: value => value.length,
            immutable: true
          },
          type: {
            filterOperator: 'exact',
            form: false,
            immutable: true
          },
          tags: this.tagsField(this.symbol.resolve('asset.field.label.tags')),
          created: this.created(this.symbol.resolve('field.label.created'), this.symbol),
        }
      },
      // https://doc.entrecode.de/en/develop/resources/dm-assetgroup/
      assetGroup: {
        identifier: 'assetGroupID',
        label: 'assetGroupID',
        fields: {
          assetGroupID: {
            label: this.symbol.resolve('asset.field.label.assetGroupID'),
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
            /*
            urlExpiration: string
            disabledTypes: Array<string>
            imageSizes: Array<integer>
            thumbSizes: Array<integer>
            */
          },
          policies: {
            view: 'tags',
            display: (policies) => (policies || []).map(p => p.method),
            prefill: []
            /*
            method: get, put, post, delete
            user: public, dmUser
            conditions: JSON or null (https://entrecode.de/schema/dm-assetgroup#definitions/conditions)
            */
          },
          created: this.created(this.symbol.resolve('field.label.created'), this.symbol),
        }
      },
      dmAsset: { // new assets
        identifier: 'assetID',
        identifierPattern: this.base64uuid(),
        label: 'title',
        fields: {
          file: {
            label: this.symbol.resolve('dmAsset.field.label.file'),
            display: value => value.url,
            view: 'preview',
            immutable: true,
            form: false,
            list: false
          },
          thumb: {
            form: false,
            list: true,
            label: this.symbol.resolve('asset.field.label.thumb'),
            view: 'preview',
            resolve: (asset) => {
              if (asset.type !== 'image' || !asset.thumbnails || !asset.thumbnails.length) {
                return '';
              }
              return asset.thumbnails[0].url;
            },
            immutable: true
          },
          assetID: {
            label: this.symbol.resolve('dmAsset.field.label.assetID'),
            list: false,
            form: false,
            immutable: true
          },
          title: {
            label: this.symbol.resolve('field.label.title'),
            view: 'string',
            sortable: true,
            filterable: true
          },
          caption: {
            label: this.symbol.resolve('dmAsset.field.label.caption'),
            view: 'string'
          },
          duplicates: {
            label: this.symbol.resolve('dmAsset.field.label.duplicates'),
            view: 'number',
            list: false,
            form: false
          },
          thumbnails: {
            label: this.symbol.resolve('dmAsset.field.label.thumbnails'),
            display: values => values.map(value => value.url),
            list: false,
            form: false
          },
          type: {
            label: this.symbol.resolve('dmAsset.field.label.type'),
            view: 'string',
            filterOperator: 'any',
            hideInList: true,
            immutable: true,
            form: false
          },
          tags: {
            label: this.symbol.resolve('dmAsset.field.label.tags'),
            view: 'tags',
            filterOperator: 'any',
            hideInList: true
          },
          created: this.created(this.symbol.resolve('field.label.created'), this.symbol),
        }
      },
      dmClient: {
        identifier: 'clientID',
        fields: {
          clientID: {
            label: this.symbol.resolve('client.field.label.clientID'),
            view: 'string'
          },
          callbackURL: {
            label: this.symbol.resolve('client.field.label.callbackURL'),
            view: 'string',
          },
          tokenMethod: this.tagsField(this.symbol.resolve('client.field.label.tokenMethod')),
          disableStrategies: this.tagsField(this.symbol.resolve('client.field.label.disableStrategies')),
          created: this.created(this.symbol.resolve('field.label.created'), this.symbol),
        }
      },
      role: {
        identifier: 'roleID',
        identifierPattern: this.uuid(),
        label: 'name',
        fields: {
          name: {
            label: this.symbol.resolve('field.label.name'),
            view: 'string',
            filterable: true,
            sortable: true
          },
          label: {
            label: this.symbol.resolve('field.label.label'),
            view: 'string'
          },
          accounts: {
            label: this.symbol.resolve('role.field.label.accounts'),
            type: 'accounts',
            prefill: [],
            list: false,
            display: (value) => value ? value.title : '',
            input: AdminEntryInputComponent,
            filterPopClass: 'dialog'
          },
          addRegistered: {
            label: this.symbol.resolve('role.field.label.addRegistered'),
            view: 'boolean'/* ,
        prefill: false */
          },
          addUnregistered: {
            label: this.symbol.resolve('role.field.label.addUnregistered'),
            view: 'boolean'/* ,
        prefill: false */
          },
          created: this.created(this.symbol.resolve('field.label.created'), this.symbol),
        }
      },
      codeSource: {
        identifier: 'codeSourceID',
        identifierPattern: this.uuid(),
        fields: {
          codeSourceID: {
            label: this.symbol.resolve('field.label.id'),
          },
          codeSourceType: {
            label: this.symbol.resolve('field.label.type'),
            view: 'tag'
          },
          config: {
            label: this.symbol.resolve('field.label.config'),
            list: false
          },
          created: this.created(this.symbol.resolve('field.label.created'), this.symbol),
        }
      },
      dataSource: {
        identifier: 'dataSourceID',
        identifierPattern: this.uuid(),
        fields: {
          dataSourceID: {
            label: this.symbol.resolve('field.label.id'),
          },
          created: this.created(this.symbol.resolve('field.label.created'), this.symbol),
        }
      },
      target: {
        identifier: 'targetID',
        identifierPattern: this.uuid(),
        fields: {
          targetType: {
            label: this.symbol.resolve('field.label.type'),
            view: 'tag'
          },
          config: {
            label: this.symbol.resolve('field.label.config'),
            list: false
          },
          created: this.created(this.symbol.resolve('field.label.created'), this.symbol),
        }
      },
      group: {
        identifier: 'groupID',
        identifierPattern: this.uuid(),
        label: 'name',
        fields: {
          name: {
            label: this.symbol.resolve('field.label.name'),
            view: 'string'
          },
          permissions: {
            view: 'tags',
            display: (value) => value || [],
            list: false
          },
          /* created: this.created(this.symbol.resolve('field.label.created'), this.symbol), */
        }
      },
      invite: {
        identifier: 'invite',
        identifierPattern: this.uuid(),
        label: 'invite',
        fields: {
          invite: {
            view: 'string'
          },
          permissions: {
            view: 'tags'
          },
          groups: {
            view: 'tags',
            display: (group => group ? group.map(g => g.name) : [])
          }
        }
      }
    }
  }
}
