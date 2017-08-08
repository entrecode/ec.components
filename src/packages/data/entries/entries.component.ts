/**
 * Created by felix on 23.05.17.
 */
import { Component, Input } from '@angular/core';
// import { EntryListConfig } from '../entry-list/entry-list-config';
import { SdkService } from '../sdk/sdk.service';
// import { filterOptions } from 'ec.sdk/typings/interfaces'

@Component({
  selector: 'ec-entries',
  templateUrl: './entries.component.html'
})
export class EntriesComponent {
  promise: any;
  @Input() model: string;
  @Input() config;//: filterOptions;//TODO find way to import from sdk typings
  private entryList: any;

  constructor(private sdk: SdkService) {
  }

  ngOnChanges() {
    if (!this.model) {
      return;
    }
    this.promise = this.sdk.api.entryList(this.model, this.config)
    .then((entryList) => {
      this.entryList = entryList;
    });
  }

  entries() {
    if (!this.entryList) {
      return [];
    }
    return this.entryList.getAllItems();
  }
}