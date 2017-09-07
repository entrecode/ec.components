import { Component, Input } from '@angular/core';

/** The CrudComponent takes at least a model name to render an entry list with create/edit/delete functionality out of the box.  */
@Component({
  selector: 'ec-error',
  templateUrl: './error.component.html'
})
/** Displays an error thrown by the SDK. */
export class ErrorComponent {
  /** The error that should be displayed */
  @Input() error: any;
}