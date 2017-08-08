import { Component, Input } from '@angular/core';
import { FormComponent } from '../../ui/form/form.component';
import { EntryForm } from './entry-form';
import { ModelConfig } from '../model-config/model-config';

/** The EntryListComponent is a thin holder of an EntryList instance. It extends the ListComponent */
@Component({
  selector: 'ec-entry-form',
  templateUrl: './entry-form.component.html',
  styleUrls: ['./entry-form.component.scss']
})
export class EntryFormComponent extends FormComponent {
  @Input() model: string;
  @Input() entry = { value: {} };

  constructor(private modelConfig: ModelConfig) {
    super();
  }

  ngOnChanges() {
    if (!this.model) {
      return;
    }
    this.modelConfig.generateConfig(this.model).then((config) => {
      Object.assign(this.config, config);
      this.form = new EntryForm(this.model, this.entry, this.config);
    });
  }
}
