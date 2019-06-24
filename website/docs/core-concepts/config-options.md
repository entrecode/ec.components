---
id: config-options
title: Config API
sidebar_label: Config API
---

This document describes all the options of the config object, which is a powerful API the control list and form looks and behaviour. See [Config Pipeline](./config-pipeline.md) for more info on where to put your config.

## config.fields

The _fields_ config option determines which fields should be part of your application. Fields that are not included won't be loaded at all.

| option             | description                                                                                              | type                    | affects list            | affects form |
| ------------------ | -------------------------------------------------------------------------------------------------------- | ----------------------- | ----------------------- | ------------ |
| label              | column label in list-header                                                                              | string                  | column header           | input label  |
| classes            | class that is appended to list-header                                                                    | string                  | appended to each column | -            |
| placeholder        | input placeholder                                                                                        | string                  | filter input            | input        |
| form               | if false, the field will not be part of the form                                                         | boolean                 |                         | X            |
| list               | if false, the field will not be part of the list                                                         | boolean                 | X                       |              |
| hideInForm         | if true, the field will be hidden in the form                                                            | boolean                 |                         | X            |
| hideInList         | if true, the field will be hidden in the list                                                            | boolean                 | X                       |              |
| hideInColumnFilter | if true, the field will be hidden in the column filter of the list-header                                | boolean                 | X                       |              |
| filterable         | if true, the field can be filtered from the list-header                                                  | boolean                 | X                       |
| sortable           | if true, the field can be sorted from the list-header                                                    | boolean                 | X                       |
| filterOperator     | the filterOperator that should be used. See [sdk filter doc](https://entrecode.github.io/ec.sdk/#filter) | boolean                 | X                       |
| filterComponent    | custom component to be used for filtering                                                                | Component               | X                       |
| rawFilter          | if set, the filter value will used as is (without filter operator)                                       | boolean                 | X                       |
| columns            | how many columns are used by the field                                                                   | number 1-12             |                         | X            |
| immutable          | if true, the property won't be sent when saving                                                          | boolean                 |                         | X            |
| readOnly           | if true, the property won't be editable                                                                  | boolean                 |                         | X            |
| required           | if true, the field needs to be filled out                                                                | boolean                 |                         | X            |
| prefill            | prefill value for new entries                                                                            | any                     |                         | X            |
| input              | custom input component                                                                                   | Component               | filter input            | X            |
| output             | custom output component                                                                                  | Component               | X                       |
| inputView          | view for input component                                                                                 | string                  |                         | X            |
| resolve            | resolves value for transformation                                                                        | function                |                         |              |
| copy               | transformation to copy the fields value                                                                  | transformation function |                         |              |
| display            | transformation to display the fields value                                                               | transformation function | X                       |              |
| sort               | transformation to sort fields                                                                            | transformation function | X                       |              |
| group              | transformation to group the fields value when sorting                                                    | transformation function | X                       |              |
| queryFilter        | transformation for query param to filter value                                                           | transformation function | X                       |              |
| validate           | transformation for form validation                                                                       | transformation function |                         | X            |

### Complex Example

```js
export class MuffinsComponent {
  constructor(private modelConfig: ModelConfigService) {
    moment.locale('de'); //set moment locale

    this.modelConfig.set('muffin', {
      fields: {
        pictures: {
          label: 'Bilder' //this label is shown above the form field and in the table header
        },
        name: {
          label: 'Muffin Name',
          group: (name) => {
            return name[0].toUpperCase() //the return value is used to show group headers in a sorted list
          },
          required: true //when required, a new entry form cannot be saved without a value set for the field
        },
        _created: { //you can also access the system properties
          label: 'Erstellt',
          form: false, //this will hide the field inside the form
          group: (value) => moment(value).format('YYYY')
        },
        amazement_factor: {
          label: 'Amazement Faktor',
          display: (value) => { //this will transform the value for output e.g. in a list cell
            return (value * 10) + '%'
          },
          group: (value) => {
            return value > 5 ? 'Größer als 50%' : 'Kleiner als 50%';
          },
          validate: (value) => { //this function will run when validating the value inside a form
            if (typeof value !== 'number') {
              return; //value is valid
            }
            if (value < 1) {
              return 'Muss mindestens 1 sein'; //this message will be shown above the field
            } else if (value > 10) {
              return 'Darf maximal 10 sein';
            }
          }
        },
      }
    });
}
```
