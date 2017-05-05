import { Component, Input } from '@angular/core';
import { ListComponent } from '@ec.components/ui';
import { PaginationConfig, Selection } from '@ec.components/core';
import { EntryList } from './entry-list';
import { ModelConfig } from '../model-config/model-config';

/** The EntryListComponent is a thin holder of an EntryList instance. It extends the ListComponent */
@Component({
  selector: 'ec-entry-list',
  templateUrl: './entry-list.component.html',
  styleUrls: ['./entry-list.component.scss']
})
export class EntryListComponent extends ListComponent {
  /** The model whose entries should be shown.*/
  @Input() model: string;
  /** The config which is used mainly for the pagination. */
  @Input() config: PaginationConfig = {};
  /** The instance of an EntryList */
  list: EntryList<any>;

  /** The constructor will just call super of List*/
  constructor() {
    super();
  }

  /** When changing the model or the config, the list config will be (re)generated, using the model's schema*/
  ngOnChanges() {
    if (!this.model) {
      return;
    }
    ModelConfig.generateFieldConfig(this.model, this.config.fields).then((fieldConfig) => {
      Object.assign(this.config, { fields: fieldConfig });
      this.list = new EntryList(this.model, this.config);
      if (!this.selection) {
        this.selection = new Selection([], this.list.config);
      }
    });
  }

  /** This method will filter the list by a given property value and optional operator. */
  filter(property: string, value: any, operator: string = 'search') {
    this.list.filter(property, value, operator);
  }
}
