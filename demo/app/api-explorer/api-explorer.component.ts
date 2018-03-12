import { Component, OnInit, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { SdkService } from '../../../packages/data/src/sdk/sdk.service';
import DataManager from 'ec.sdk/lib/DataManager';
import Core from 'ec.sdk/lib/Core';
import { ListConfig } from '../../../packages/core/index';
import { FormComponent } from '../../../packages/ui/src/form/form.component';
import { TabComponent } from '../../../packages/ui/src/utility/tab/tab.component';
import { TabsComponent } from '../../../packages/ui/src/utility/tabs/tabs.component';
import { Apps, Accounts } from 'ec.sdk';
import { ResourceFormComponent } from '../../../packages/data/src/resource-form/resource-form.component';
import { ResourcePopComponent } from '../../../packages/data/src/resource-pop/resource-pop.component';

@Component({
  selector: 'ec-api-explorer',
  templateUrl: 'api-explorer.component.html'
})
export class ApiExplorerComponent implements OnInit {
  symbol: string;
  history: any[] = [];
  activeTab: TabComponent;
  config: ListConfig<any>;
  symbols: string[];
  relation: string;
  api: any;
  resource: any;
  @ViewChild(ResourcePopComponent) pop: ResourcePopComponent;

  constructor(public sdk: SdkService) {
  }

  ngOnInit() {
    this.sdk.ready.then(() => {
      const resource = this.sdk.datamanager;
      /* const resource = new Apps('stage'); */
      /* const resource = new Accounts('stage'); */
      this.use(resource);
    });
  }

  select(item) {
    /* this.use(item.getBody()); */
    this.resource = item.getBody();
    this.symbol = this.relation;
    this.pop.edit(this.resource);
    this.history.push(item);
  }

  goBack(item) {
    this.history = this.history.slice(0, this.history.indexOf(item));
    this.select(item);
  }

  hasChildren(resource) {
    if (!this.api) {
      return;
    }
    const symbols = Object.keys(this.api[Symbol.for('relations')]);
    /* console.log('symbols', symbols); */
    return symbols.length && symbols[0] !== 'dummy';
  }

  use(resource = this.resource) {
    this.api = resource;
    this.symbol = this.relation;
    delete this.resource;
    this.pop.hide();
    console.log('use api', this.api);
    this.symbols = Object.keys(this.api[Symbol.for('relations')]);
    console.log('symbols', this.symbols);
    this.useRelation(this.symbols[0]);

  }

  useRelation(symbol) {
    this.relation = symbol;
  }
}
