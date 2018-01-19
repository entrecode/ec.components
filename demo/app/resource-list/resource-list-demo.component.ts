import { Component, OnInit } from '@angular/core';
import { SdkService } from '../../../packages/data/src/sdk/sdk.service';
import DataManager from 'ec.sdk/lib/DataManager';
import Core from 'ec.sdk/lib/Core';
import { resourceConfig } from '../../../packages/data/src/resource-config/resource-config';
import { ListConfig } from '../../../packages/core/index';

@Component({
  selector: 'ec-resource-list-demo',
  templateUrl: 'resource-list-demo.component.html'
})
export class ResourceListDemoComponent {
  config: ListConfig<any>;
  symbols: string[];
  relation: string;
  api: any;

  constructor(public sdk: SdkService) {
    this.sdk.ready.then(() => {
      this.use(this.sdk.datamanager);
    });
  }

  select(item) {
    this.use(item.getBody());
  }

  use(resource) {
    this.api = resource;
    console.log('use api', this.api);
    this.symbols = Object.keys(this.api[Symbol.for('relations')]);
    console.log('symbols', this.symbols);
    this.useRelation(this.symbols[0]);
  }

  useRelation(symbol) {
    console.log('symbol', symbol);
    this.relation = symbol;
    // TODO set config.fields
    if (!this.config) {
      console.error(`no resource config found for ${this.relation}`);
    }
    console.log('config ', this.config);
  }
}
