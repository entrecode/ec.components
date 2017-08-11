import { Component, Input } from '@angular/core';

/**
 * Created by felix on 26.05.17.
 */
/** The CrudComponent takes at least a model name to render an entry list with create/edit/delete functionality out of the box.  */
@Component({
  selector: 'ec-error',
  templateUrl: './error.component.html'
})

export class ErrorComponent {
  @Input() error: any;
}