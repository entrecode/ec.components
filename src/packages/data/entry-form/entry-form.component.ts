import { Component, Input } from '@angular/core';
import { FormComponent } from '../../ui/form/form.component';
import { ModelConfig } from '../model-config/model-config';
import { EntryForm } from './entry-form';

/** The EntryListComponent is a thin holder of an EntryList instance. It extends the ListComponent */
@Component({
  selector: 'ec-entry-form',
  templateUrl: '../../ui/form/form.component.html',
  styleUrls: ['./entry-form.component.scss']
})
export class EntryFormComponent extends FormComponent {
  @Input() model: string;

  constructor(private modelConfig: ModelConfig) {
    super();
  }

  ngOnChanges() {
    if (!this.model) {
      return;
    }
    if (this.config) {
      super.ngOnChanges();
      return;
    }
    this.modelConfig.generateConfig(this.model).then((config) => {
      if (this.config) {
        Object.assign(this.config, config)
      } else {
        this.config = config;
      }
      this.form = new EntryForm(this.model, {}, this.config);
    });
  }
}
