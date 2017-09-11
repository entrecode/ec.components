/**
 * Created by felix on 23.05.17.
 */
import { Component, Input } from '@angular/core';
import { SdkService } from '../sdk/sdk.service';

// import { filterOptions } from 'ec.sdk/typings/interfaces'

/** Loads an entryList of a given model with the given config. */
@Component({
  selector: 'ec-entries',
  template: require('./entries.component.html')
})
export class EntriesComponent {
  /** The promise of the entryList call. */
  private promise: any;
  /** The model to load from. */
  @Input() model: string;
  /** The config (filterOptions) for loading. */
  @Input() config;//: filterOptions; //TODO why cannot import?
  /** The current loaded entryList */
  private entryList: any;

  /** Injects sdk */
  constructor(private sdk: SdkService) {
  }

  /** When the model is known, the entryList will be loaded. */
  ngOnChanges() {
    if (!this.model) {
      return;
    }
    this.promise = this.sdk.api.entryList(this.model, this.config)
    .then((entryList) => {
      this.entryList = entryList;
    });
  }

  /** This helper returns all items of the current entryList. */
  entries() {
    if (!this.entryList) {
      return [];
    }
    return this.entryList.getAllItems();
  }
}