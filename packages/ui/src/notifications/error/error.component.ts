import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { SymbolService } from '../../symbol/symbol.service';

/** The CrudComponent takes at least a model name to render an entry list with create/edit/delete functionality out of the box.  */
@Component({
  selector: 'ec-error',
  templateUrl: './error.component.html'
})
/** Displays an error thrown by the SDK. */
export class ErrorComponent implements OnInit, OnChanges {
  /** The error that should be displayed */
  @Input() error: any;

  constructor(private symbol: SymbolService) {
  }

  /** initial update */
  ngOnInit() {
    this.update();
  }
  /** change update */
  ngOnChanges() {
    this.update();
  }
  /** updates error message  */
  update() {
    if (!this.error) {
      return;
    }
    const message = this.symbol.resolve('error.' + this.error.code);
    if (message) {
      this.error.message = message;
    }
  }
}
