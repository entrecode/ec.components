/**
 * Created by felix on 23.05.17.
 */
import { Directive, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { SdkService } from '../sdk/sdk.service';
import EntryResource from 'ec.sdk/lib/resources/publicAPI/EntryResource';
import { LoaderComponent } from '../../../ui/index';

/** Loads an entry by id to the template. */
@Directive({
  selector: '[ecEntry]',
  exportAs: 'ecEntry'
})
export class EntryDirective implements OnChanges {
  /** The loading promise */
  promise: any;
  /** The entry id that should be loaded*/
  @Input() entryId: string;
  /** The model to load from */
  @Input() model: string;
  /** Should the entry be loaded immediately? Defaults to true */
  @Input() autoload: boolean;
  /** The levels to use. */
  @Input() levels: number;
  /** Fires as soon as the entry has been loaded. */
  @Output() loaded: EventEmitter<EntryResource> = new EventEmitter();
  /** The loader that should be used. */
  @Input() loader: LoaderComponent;
  /** The current loaded entry */
  entry: any;

  /** Injects the sdk */
  constructor(private sdk: SdkService) {
  }

  /** as soon as model and id are known, the entry will be loaded. */
  ngOnChanges() {
    if (this.autoload === false) {
      return;
    }
    this.load();
  }

  /** Loads the entry. Can be called from template when using autoload=false */
  load() {
    if (!this.entryId || !this.model) {
      return;
    }
    this.promise = this.sdk.api.entry(this.model, this.entryId, this.levels)
      .then((entry) => {
        this.entry = entry;
        this.loaded.emit(entry);
        return entry;
      });
    if (this.loader) {
      this.loader.wait(this.promise);
    }
    return this.promise;
  }
}
