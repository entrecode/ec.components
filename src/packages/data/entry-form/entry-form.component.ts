import { Component } from '@angular/core';
import { FormComponent } from '../../ui/form/form.component';

/** The EntryListComponent is a thin holder of an EntryList instance. It extends the ListComponent */
@Component({
  selector: 'ec-entry-form',
  templateUrl: './entry-form.component.html',
  styleUrls: ['./entry-form.component.scss']
})
export class EntryFormComponent extends FormComponent {

  ngOnInit() {
  }
}
