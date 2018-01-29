import { Component, Input, OnInit } from '@angular/core';

/** The CrudComponent takes at least a model name to render an entry list with create/edit/delete functionality out of the box.  */
@Component({
  selector: 'ec-error',
  templateUrl: './error.component.html'
})
/** Displays an error thrown by the SDK. */
export class ErrorComponent implements OnInit {
  /** The error that should be displayed */
  @Input() error: any;

  ngOnInit() {
    if (!this.error) {
      return;
    }
    if (this.error.code === 2211) { // TODO: use some errors.ts file with all codes mapped to messages
      this.error.message = 'Validierungsfehler';
    }
  }
}
