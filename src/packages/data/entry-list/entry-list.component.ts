import { Component, Input } from '@angular/core';
import { ListComponent } from '../../ui';
import { ListConfig, Selection } from '../../core';
import { EntryList } from '..';
import { SdkService } from '../sdk/sdk.service';
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
  @Input() config: ListConfig = {};
  /** If true, only one item is selectable next */
  @Input() solo: boolean;
  /** The instance of an EntryList */
  list: EntryList<any>;

  /** The constructor will just call super of List*/
  constructor(private sdk: SdkService, private modelConfig: ModelConfig) {
    super();
  }

  /** When changing the model or the config, the list config will be (re)generated, using the model's schema*/
  ngOnChanges() {
    if (!this.model) {
      return;
    }
    this.modelConfig.generateConfig(this.model).then((config) => {
      Object.assign(this.config, config);
      this.list = new EntryList(this.model, this.config, this.sdk);
      this.list.change$.subscribe((list) => {
        if (!this.selection && this.list.config && !this.list.config.disableSelection) {
          this.selection = new Selection([], this.list.config);
        }
      });
    });
  }

  /** This method will filter the list by a given property value and optional operator. */
  filter(property: string, value: any, operator: string = 'search') {
    this.list.filter(property, value, operator);
  }

  /** Callback when an entry is clicked. */
  selectEntry(entry) {
    this.onSelect.emit(entry);
  }
}
