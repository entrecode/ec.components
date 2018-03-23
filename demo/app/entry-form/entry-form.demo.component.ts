import { Component } from '@angular/core';
import { DefaultEntryInputComponent } from '@ec.components/data';

@Component({
  selector: 'ec-entry-form-demo',
  templateUrl: 'entry-form-demo.component.html',
})
export class EntryFormDemoComponent {
  formConfig = {
    fields: {
      name: {
        label: 'name',
        type: 'text'
      },
      amazement_factor: {
        label: 'amazement factor',
        type: 'number'
      },
      new_asset: {
        label: 'Neues Asset',
        type: 'asset',
        relation: 'test',
        input: DefaultEntryInputComponent
      }
    },
    onSave: (item) => {
      console.log('on save', item);
    }
  }
  constructor() {
  }
}
