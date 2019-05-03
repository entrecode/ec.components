import { Component } from '@angular/core';
import { ModelConfigService } from '@ec.components/data';
import { SymbolService } from '@ec.components/ui';
import { ResourceConfig } from '@ec.components/data';

@Component({
  selector: 'ec-crud-demo',
  templateUrl: './crud-demo.component.html',
})
export class CrudDemoComponent {
  public muffinConfig = {
    defaultFilter: 'name',
    disableHeader: false,
    develop: true,
    singularLabel: 'Muffin',
    createLabel: 'Neuer Muffin',
    size: 15,
    levels: 2,
    /* ,
    filter: {
      amazement_factor: 10
    } */
  };
  constructor(
    public modelConfig: ModelConfigService,
    public resourceConfig: ResourceConfig,
    public symbol: SymbolService,
  ) {}

  log(entry) {}
}
