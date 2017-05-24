/**
 * Created by felix on 23.05.17.
 */
import { Component, Input } from '@angular/core';
import { EntryListConfig } from '../entry-list/entry-list-config';
import { EntryList } from '../entry-list/entry-list';

@Component({
  selector: 'ec-entries',
  templateUrl: './entries.component.html'
})
export class EntriesComponent {
  promise: any;
  @Input() model: string;
  @Input() config: EntryListConfig;
  private list: any;

  ngOnChanges() {
    if (!this.model) {
      return;
    }
    this.list = new EntryList(this.model, this.config);
    this.list.change$.subscribe((list) => {
      /*if (!this.selection && this.list.config && !this.list.config.disableSelection) {
       this.selection = new Selection([], this.list.config);
       }*/
     });
  }

  entries() {
    if (!this.list) {
      return [];
    }
    return this.list.items;
  }
}