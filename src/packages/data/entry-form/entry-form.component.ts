import { Component, Input } from '@angular/core';
import { FormComponent } from '../../ui/form/form.component';
import { EntryForm } from './entry-form';

/** The EntryListComponent is a thin holder of an EntryList instance. It extends the ListComponent */
@Component({
  selector: 'ec-entry-form',
  templateUrl: './entry-form.component.html',
  styleUrls: ['./entry-form.component.scss']
})
export class EntryFormComponent extends FormComponent {
  @Input() model: string;
  @Input() entry = { value: {} };

  ngOnChanges() {
    if (this.model) {
      this.form = new EntryForm(this.model, this.entry);
    }
  }
}
