/**
 * Created by felix on 23.05.17.
 */
import { Component, Input } from '@angular/core';
import { Datamanager } from '..';

@Component({
  selector: 'ec-entry',
  templateUrl: './entry.component.html'
})
export class EntryComponent {
  promise: any;
  @Input() id: string;
  @Input() model: string;
  @Input() levels: number;
  entry: any;

  ngOnChanges() {
    if (this.id && this.model) {
      this.promise = Datamanager.entry(this.model, this.id, this.levels)
      .then((entry) => {
        this.entry = entry;
        return entry;
      })
    }
  }
}