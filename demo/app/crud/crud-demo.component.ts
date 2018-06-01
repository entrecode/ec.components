import { Component } from '@angular/core';
import { ModelConfigService } from '@ec.components/data';
import { SymbolService } from '@ec.components/ui/src/symbol/symbol.service';
import { ResourceConfig } from '../../../packages/data/src/resource-config/resource-config.service';

@Component({
  selector: 'ec-crud-demo',
  templateUrl: './crud-demo.component.html',
})
export class CrudDemoComponent {
  constructor(public modelConfig: ModelConfigService,
    public resourceConfig: ResourceConfig,
    public symbol: SymbolService) {
    /* this.modelConfig.set('field_test', {
      fields: {
        location: {
          input: LocationPickerComponent
        },
        account: {
          identifier: 'accountID',
          permissions: {
            get: 'acc:list',
            put: 'acc:edit:<accountID>'
          },
          methods: ['get', 'put', 'delete'],
          fields: {
            email: {
              label: this.symbol.resolve('field.label.email'),
              view: 'string',
              filterable: true,
              sortable: true
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
        role: {
          identifier: 'roleID',
          display: (liteRole) => liteRole ? liteRole.name : '',
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
              view: 'tags',
              prefill: [],
              list: false
            },
            addRegistered: {
              label: this.symbol.resolve('role.field.label.addRegistered'),
              view: 'boolean'
            },
            addUnregistered: {
              label: this.symbol.resolve('role.field.label.addUnregistered'),
              view: 'boolean'
            },
          }
        }
      }
    }) */;
  }

  log(entry) {
  }
}
