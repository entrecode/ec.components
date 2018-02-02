import { Component, OnInit, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { SdkService } from '../../../packages/data/src/sdk/sdk.service';
import DataManager from 'ec.sdk/lib/DataManager';
import Core from 'ec.sdk/lib/Core';
import { resourceConfig } from '../../../packages/data/src/resource-config/resource-config';
import { ListConfig } from '../../../packages/core/index';
import { FormComponent } from '../../../packages/ui/src/form/form.component';
import { TabComponent } from '../../../packages/ui/src/utility/tab/tab.component';
import { TabsComponent } from '../../../packages/ui/src/utility/tabs/tabs.component';
import { Apps } from 'ec.sdk';

@Component({
  selector: 'ec-resource-list-demo',
  templateUrl: 'resource-list-demo.component.html'
})
export class ResourceListDemoComponent {
  activeTab: TabComponent;
  config: ListConfig<any>;
  symbols: string[];
  relation: string;
  api: any;
  @ViewChild('resourceForm') form: FormComponent;

  constructor(public sdk: SdkService) {
    /* this.sdk.ready.then(() => {
      this.use(this.sdk.datamanager);
    }); */
    const apps = new Apps('stage');
    this.use(apps);
  }

  select(item) {
    this.use(item.getBody());
    console.log('edit', item);
    this.form.edit(item);
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
  }
}
