import { Component } from '@angular/core';
import { DefaultEntryInputComponent } from '@ec.components/data';

@Component({
  selector: 'ec-entry-form-demo',
  templateUrl: 'entry-form-demo.component.html',
})
export class EntryFormDemoComponent {
  fieldForm = {
    fields: {
      property: {
        label: 'Property',
        view: 'string'
      },
      label: {
        label: 'Label',
        view: 'string'
      },
      type: {
        label: 'Typ',
        view: 'select',
        values: [
          'text',
          'entry',
          'entries',
          'asset',
          'assets',
          'formattedText',
          'number',
          'decimal',
          'boolean',
          'datetime',
          'email',
          'url',
          'phone',
          'json',
          'account',
          'role',
          'location']
      },
      relation: {
        label: 'Relation',
        view: 'string'
      },
    }
  }
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
      },
      new_assets: {
        label: 'Neue Assets',
        type: 'assets',
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
  addField(item, form, pop) {
    const field = item.getBody();
    form.addField(field.property, item.getBody());
    console.log('field', item);
    pop.hide();
  }
}
