import { Component, Input } from '@angular/core';
import { Form } from '@ec.components/core';
import { FormConfig } from '../../core/form/form-config.interface';

@Component({
  selector: 'ec-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {
  fields: string[];
  form: Form<any>;
  @Input() config: FormConfig<any>;

  constructor() {

  }

  ngOnChanges() {
    if (this.config) {
      this.form = new Form({}, this.config);
    }
  }
}
