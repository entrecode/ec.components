import { Component } from '@angular/core';
import { Field, Form, Item } from '@ec.components/core';
import { DefaultEntryInputComponent } from '@ec.components/data';
import { DefaultInputComponent } from '@ec.components/ui';
import { mocked } from '../../../mocks/data';

@Component({
  selector: 'ec-form-demo',
  templateUrl: './form-demo.component.html',
})
export class FormDemoComponent {
  tree: Item<any>;
  public mocked = mocked;
  myString;
  myNumber;
  myTextarea;
  myColor;
  myBoolean;
  myEmail;
  myUrl;
  myToggle;
  myDate;
  mySelect;
  myEntry;
  myNan;
  testField = new Field('test', {
    view: 'string',
    input: DefaultInputComponent
  });

  entryConfig = {
    type: 'entry',
    input: DefaultEntryInputComponent,
    relation: 'muffin'
  }

  constructor() {
    this.tree = mocked.lists.trees.id(0);
  }

  logValue(form: Form<any>) {
    console.log('form value', form.resolve());
  }
}
