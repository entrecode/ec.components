/**
 * Created by felix on 23.05.17.
 */
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SdkService } from '../sdk/sdk.service';
import { EntryResource } from "ec.sdk/typings/resources/publicAPI/EntryResource";

/** Loads an entry by id to the template. */
@Component({
  selector: 'ec-entry',
  templateUrl: './entry.component.html'
})
export class EntryComponent {
  /** The loading promise */
  promise: any;
  /** The entry id that should be loaded*/
  @Input() id: string;
  /** The model to load from */
  @Input() model: string;
  /** The levels to use. */
  @Input() levels: number;
  /** Fires as soon as the entry has been loaded. */
  @Output() loaded: EventEmitter<EntryResource> = new EventEmitter();
  /** The current loaded entry */
  entry: any;

  /** Injects the sdk */
  constructor(private sdk: SdkService) {
  }

  /** as soon as model and id are known, the entry will be loaded. */
  ngOnChanges() {
    if (this.id && this.model) {
      this.promise = this.sdk.api.entry(this.model, this.id, this.levels)
      .then((entry) => {
        this.entry = entry;
        this.loaded.emit(entry);
        return entry;
      })
    }
  }
}