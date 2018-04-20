import { Component } from '@angular/core';
import { ModelConfigService } from '@ec.components/data';
import { TypeConfigService } from '../../../packages/data/src/model-config/type-config.service';
import { ResourceConfig } from '../../../packages/data/src/resource-config/resource-config.service';
import { SymbolService } from '@ec.components/ui/src/symbol/symbol.service';

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
        role: {
          identifier: 'roleID',
          label: 'name',
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
    }); */
  }

  log(entry) {
  }
}
