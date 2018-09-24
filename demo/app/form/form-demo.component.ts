import { Component } from '@angular/core';
import { Field, Form, Item } from '@ec.components/core';
import { DefaultEntryInputComponent } from '@ec.components/data';
import { DefaultInputComponent } from '@ec.components/ui';
import { mocked } from '../../../mocks/data';
import { CounterComponent } from './counter.component';

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
  mySelect2;
  myEntry;
  myNan;
  testField = new Field('test', {
    view: 'string',
    input: DefaultInputComponent
  });
  layoutDemoConfig = {
    fields: {
      forename: {
        view: 'string',
        columns: 6
      },
      lastname: {
        view: 'string',
        columns: 6
      },
      street: {
        view: 'string',
        columns: 4
      },
      plz: {
        view: 'string',
        columns: 4
      },
      city: {
        view: 'string',
        columns: 4
      },
      count: {
        view: 'number',
        create: false
      }
    }
  }

  customFormConfig = {
    fields: {
      count: {
        input: CounterComponent
      }
    }
  }

  constructor() {
    this.tree = mocked.lists.trees.id(0);
  }

  logValue(form: Form<any>) {
    console.log('form value', form.resolve());
  }
}
