import { Component } from '@angular/core';
import { Field, Form, Item } from '@ec.components/core';
import { DefaultInputComponent } from '@ec.components/ui';
import { mocked } from '../../mocks/data';
import { CounterComponent } from './counter.component';
import { TagSelectComponent, EntryFormComponent } from '@ec.components/data';

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
    input: DefaultInputComponent,
  });
  layoutDemoConfig = {
    fields: {
      tags: {
        input: TagSelectComponent,
        nestedCrudConfig: {
          label: 'tag',
          disableHeader: true,
        },
      },
      forename: {
        view: 'string',
        columns: 6,
      },
      lastname: {
        view: 'string',
        columns: 6,
      },
      street: {
        view: 'string',
        columns: 4,
      },
      plz: {
        view: 'string',
        columns: 4,
      },
      city: {
        view: 'string',
        columns: 4,
      },
      count: {
        view: 'number',
        create: false,
      },
      delivered: {
        view: 'toggle',
        readonly: true,
        prefill: true,
      },
    },
  };

  testForm = {
    fields: {
      string: {
        inputView: 'string'
      }
    },
    onSave: (form) => {
      console.log('form onSave', form);
      throw new Error('arr');
      /* return new Error('arr'); */
    }
  };


  customFormConfig = {
    fields: {
      count: {
        input: CounterComponent,
      },
    },
  };

  constructor() {
    this.tree = mocked.lists.trees.id(0);
  }

  logValue(form: Form<any>) {
    console.log('form value', form.resolve());
  }

  submitForm(form: EntryFormComponent) {
    console.log('submit form', form);

    /* form.form.save(form.group.value).then(res => {
      console.log('form submitted', res);
    }).catch(error => {
      console.log('received error', error);
    }); */

    form.submit(false).then((res) => {
      console.log('form submitted', res);
    }).catch(error => {
      console.log('received error', error);
    });
  }
}
