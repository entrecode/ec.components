import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { SymbolService } from '@ec.components/ui/src/symbol/symbol.service';

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

  ngOnInit() {
    this.update();
  }

  ngOnChanges() {
    this.update();
  }

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
