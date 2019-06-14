---
id: fields
title: Fields Config
sidebar_label: Fields Config
---

Fields control the behaviour of  [Item]() properties.

## Basic Example

```ts
const muffinFields = {
  name: {
    label: 'Name', // The fields name
    description: 'Creative Muffin Name', // description
    group: (value) => value[0] // group function for list
  },
  amazement_factor: {
    label: 'Amazement Factor',
    description: 'How amazing is the muffin?'
  }
};
const muffin = new Item({ name: 'Chocolate Cream', amazement_factor: 10 }, {
  label: 'name',
  fields: muffinFields
});

muffin.group(); // C
muffin.display(); // Chocolate Cream
```

## With entries

When using the components, you can use the field config for entries or resources, in lists and forms. The field config is part of the config object:

```ts
muffinConfig = {
  fields: muffinFields
}
```

```html
<ec-crud model="muffin" [config]="muffinConfig"></ec-crud>
```


### Available Options

| option | description      | type     | affects list | affects form |
| -------- | --------- | ---------- | --- | --- |
| label  | column label in list-header | string | column header | input label
| classes   | class that is appended to list-header   | string    | appended to each column | -
| placeholder   | input placeholder   | string    | filter input | input 
| form | if false, the field will not be part of the form | boolean |  | X |
| list | if false, the field will not be part of the list | boolean | X |  |
| hideInForm | if true, the field will be hidden in the form | boolean |  | X |
| hideInList | if true, the field will be hidden in the list | boolean | X |  |
| hideInColumnFilter | if true, the field will be hidden in the column filter of the list-header | boolean | X | |
| filterable   | if true, the field can be filtered from the list-header   | boolean    | X | 
| sortable   | if true, the field can be sorted from the list-header   | boolean    | X | 
| filterOperator   | the filterOperator that should be used. See [sdk filter doc](https://entrecode.github.io/ec.sdk/#filter)   | boolean    | X | 
| rawFilter   | if set, the filter value will used as is (without filter operator)  |  boolean | X |
| columns   | how many columns are used by the field   | number 1-12    | | X
| immutable | if true, the property won't be sent when saving | boolean | | X
| readOnly | if true, the property won't be editable | boolean | | X
| required | if true, the field needs to be filled out | boolean | | X
| prefill | prefill value for new entries | any | | X
| input | custom input component | Component | filter input | X
| output | custom output component | Component | X | 
| inputView | view for input component | string |  | X | 
| resolve | resolves value for transformation | function | | |
| copy | transformation to copy the fields value | transformation function | | |
| display | transformation to display the fields value | transformation function | X |  |
| sort | transformation to sort fields | transformation function | X |  |
| group | transformation to group the fields value when sorting | transformation function | X |  |
| queryFilter | transformation for query param to filter value | transformation function | X |  |
| validate | transformation for form validation | transformation function |  | X |


### hidden fields: soft vs hard

Having read all of the above options (of course), you may have noticed, that there is a form flag and a hideInForm flag, same for list. It may not be obvious to get the difference.

You can imagine the hideInX flags as a "soft" and the other flags as a "hard" hide. The soft hide will load the list field but hide it from the markup. You can then unhide the field from the list column dropdown. The hard hide wont't load the list field at all, meaning you also cannot unhide it. That way is recommended for heavier fields like JSON fields.

It is also important to note that the hard hidden fields wont be available in the form without a full reload when opening the form. When the field is soft hidden, the entry does not need a reload.

If you dont want the user to be able to unhide a soft hidden field, use hideInColumnFilter.

<!-- ### custom list filter

TBD

### custom sort grouping

TBD -->



<!-- ## deprecate

title
schema
filterPopClass
view

### form/list vs hideInList/hideInList

read values:

property
 -->

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

[See Options in API Docs](https://entrecode.github.io/ec.components/interfaces/FieldConfigProperty.html)