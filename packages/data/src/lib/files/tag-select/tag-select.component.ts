import { Component, OnInit, ChangeDetectorRef, ElementRef, OnChanges } from '@angular/core';
import { ResourceSelectComponent } from '../../resource-select/resource-select.component';
import { SymbolService } from '@ec.components/ui';
import { ResourceConfig } from '../../resource-config/resource-config.service';
import { SdkService } from '../../sdk/sdk.service';
import { Item } from '@ec.components/core';
import { AuthService } from '../../auth/auth.service';
import { CrudConfig } from '../../crud/crud-config.interface';

@Component({
  selector: 'ec-tag-select',
  templateUrl: '../../resource-select/resource-select.component.html',
})
export class TagSelectComponent extends ResourceSelectComponent implements OnInit, OnChanges {
  relation = 'tags';
  placeholder = this.symbol.resolve('tag-select.placeholder');
  config: CrudConfig<any>;

  constructor(
    protected resourceConfig: ResourceConfig,
    protected auth: AuthService,
    public elementRef: ElementRef,
    public symbol: SymbolService,
    public cdr: ChangeDetectorRef,
    public sdk: SdkService,
  ) {
    super(resourceConfig, auth, elementRef, symbol, cdr);
    this.enterPressed.asObservable().subscribe((s) => {
      this.selection.add(new Item({ tag: this.searchbar.query }, this.config));
      this.searchbar.clear();
      this.dropdownList.list.clearFilter();
    });
  }

  useConfig(config = {}) {
    super.useConfig(config);
    this.config = {
      label: 'tag',
      identifier: 'tag',
      methods: ['get'],
      defaultFilter: false,
      disableHeader: true,
      disableListPop: true,
      disableCreatePop: true,
      fields: {
        tag: {
          view: 'string',
        },
      },
      dropdownFields: {
        tag: {
          view: 'string',
        },
      },
    };
    this.dropdownConfig = {
      disableHeader: true,
      label: 'tag',
      identifier: 'tag',
      fields: {
        tag: {
          view: 'string',
        },
      },
    };
  }

  init() {
    this.sdk.ready.then(() => {
      this.api = this.sdk.api;
      super.init();
    });
  }
}
