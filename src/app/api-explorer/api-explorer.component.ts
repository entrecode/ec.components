import { Component, OnInit, ViewChild } from '@angular/core';
import { ListConfig } from '@ec.components/core';
import { ResourcePopComponent, SdkService } from '@ec.components/data';
import { TabComponent } from '@ec.components/ui';

@Component({
  selector: 'ec-api-explorer',
  templateUrl: 'api-explorer.component.html',
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
  @ViewChild(ResourcePopComponent, { static: true }) pop: ResourcePopComponent;

  constructor(public sdk: SdkService) {}

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
    if (!resource || !resource.getAvailableRelations()) {
      return;
    }
    const symbols = Object.keys(resource.getAvailableRelations());
    return symbols.length && symbols[0] !== 'dummy';
  }

  use(resource = this.resource) {
    this.api = resource;
    this.symbol = this.relation;
    delete this.resource;
    this.pop.hide();
    this.symbols = Object.keys(this.api.getAvailableRelations());
    this.useRelation(this.symbols[0]);
  }

  useRelation(symbol) {
    this.relation = symbol;
  }
}
