---
id: config-options
title: Config API
sidebar_label: Config API
---

This document describes all the options of the config object, which is a powerful API the control list and form looks and behaviour. See [Config Pipeline](./config-pipeline.md) for more info on where to put your config.

## config.fields

The _fields_ config option determines which fields should be part of your application. Fields that are not included won't be loaded at all.

### field.label

The label is shown in the header of the list column and in the label above the form input.

### field flags

| option             | description                                                                                    | type    |
| ------------------ | ---------------------------------------------------------------------------------------------- | ------- |
| form               | If set to false, the field will be omitted only from the form.                                 | boolean |
| list               | If set to false, the field will be omitted from the list                                       | boolean |
| hideInForm         | If set to true, the field will be hidden in the form                                           | boolean |
| hideInList         | If set to true, the field will be hidden in the list                                           | boolean |
| hideInColumnFilter | If set to true, the field can not be toggled from the column filter (top-right corner of list) | boolean |

It may not be obvious to get the difference between form/list and hideInForm/hideInList.

You can imagine the hideInX flags as a "soft" and the other flags as a "hard" hide. The soft hide will load the list field but hide it from the markup. You can then unhide the field from the list column dropdown. The hard hide wont't load the list field at all, meaning you also cannot unhide it. That way is recommended for heavier fields like JSON fields.

It is also important to note that the hard hidden fields wont be available in the form without a full reload when opening the form. When the field is soft hidden, the entry does not need a reload.

If you dont want the user to be able to unhide a soft hidden field, use hideInColumnFilter.

Example:

```ts
const muffinConfig = {
  fields: {
    name: {
      label: 'Name',
      form: false // name will not be in the form
    },
    amazement_factor: {
      label: 'Amazement Factor',
      list: false
    },
    baker: {
      label: 'Bakeperson',
      hideInList: true
    }
  };
}
```

In this example, the list will show only names and the form only amazement_factor. While the baker could be made visible in the list (via column filter), the amazement_factor isn't even loaded and therefor hard hidden.

## sorting

The following options are related to sorting lists:

| option                           | description                                           | type    |
| -------------------------------- | ----------------------------------------------------- | ------- |
| [field.sortable](#fieldsortable) | if true, the field can be sorted from the list-header | boolean |
| [config.sortBy](#configsortby)   | the property that should be sorted after              | string  |
| [config.desc](#configdesc)       | if true, the sorting will be descending               | string  |

### field.sortable

If true, the column can be sorted by clicking the column header, as indicated by two arrows:

![sort-icon](../../static/img/sort-icon.png)

The first click sorts ascending, the second descending and the thirds resets the sorting.

### config.sortBy

The field property by which the list should be sorted:

```ts
list.load({ sortBy: 'amazement_factor' });
```

### config.desc

If true, the sorting will be in descending order:

```ts
list.load({ sortBy: 'amazement_factor', desc: true });
```

Also see [entry-list.load](../components/entry-list.component.md#load).

## filtering

The following options are related to filtering lists:

| option                              | description                                                                                              | type      |
| ----------------------------------- | -------------------------------------------------------------------------------------------------------- | --------- |
| [filterable](#filterable)           | if true, the field can be filtered from the list-header                                                  | boolean   |
| [filterOperator](#filteroperator)   | the filterOperator that should be used. See [sdk filter doc](https://entrecode.github.io/ec.sdk/#filter) | boolean   |
| [filterComponent](#filtercomponent) | custom component to be used for filtering                                                                | Component | X |
| [rawFilter](#rawfilter)             | if set, the filter value will used as is (without filter operator)                                       | boolean   |

### field.filterable

If true, a clickable search icon will be shown in the list-header, beneath the label:

![filter-icon](../../static/img/filter-icon.png)

Clicking the icon opens a filter input above the list-header. By default, the looks/behaviour of the filter input is based on the field's input, see [Input](./input.md) for all possible inputViews.

Entering values into the filter input will trigger a list load with the current filter value.

```ts
muffinConfig = {
  fields: {
    amazement_factor: {
      filterable: true,
    },
  },
};
```

In this case, amazement_factor is a number, so the searchbar will be a number input. If you enter a number, the list will load all entries with amazement_factor set to exactly that value.

### field.filterOperator

The sdk accepts [different types of filter operators](https://entrecode.github.io/ec.sdk/#filter) like _exact_, _search_, _from_, _any_ etc.
By default, the filter input will use the most common filterOperator for the field's type.

| type             | default filterOperator |
| ---------------- | ---------------------- |
| id               | search                 |
| text             | search                 |
| boolean          | exact                  |
| formattedText    | search                 |
| decimal          | search                 |
| number           | search ?               |
| url              | search                 |
| asset, dmAsset   | exact                  |
| assets, dmAssets | any                    |
| email            | search                 |
| datetime         | search ?               |
| entry            | exact                  |
| entries          | any                    |
| json             | search ?               |
| location         | search ?               |
| account          | exact                  |
| role             | search ?               |

Fields marked with "?" experimental.

You can set filterOperator to any other value to alter that default value:

```ts
muffinConfig = {
  fields: {
    amazement_factor: {
      filterable: true,
      filterOperator: 'to', // input will act as 'max' value
    },
    _created_: {
      filterable: true,
      filterOperator: 'from', // input will act as 'min' date
    },
    name: {
      filterable: true,
      filterOperator: 'exact', // only muffins with exactly that name
    },
  },
};
```

### field.rawFilter

This flag can be used to indicate that the filter input value should be used directly as filter value in the sdk:

```ts
muffinConfig = {
  fields: {
    amazement_factor: {
      rawFilter: true
    },
};
amazingMuffinFilter = {
  amazement_factor: {
    from: 8
  }
}
```

This can be helpful for triggering custom filters:

```html
<ec-entry-list #muffinList model="muffin" [config]="muffinConfig"></ec-entry-list>
<a (click)="muffinList.load({ filter: amazingMuffinFilter })">Only 8+</a>
```

Also see [EntryList.load](../components/entry-list.component.md#load)

### field.filterComponent

If you want to use a different component just for filtering, you can define one via the _filterComponent_ option.

```ts
muffinConfig = {
  fields: {
    amazement_factor: {
      filterable: true,
      filterComponent: MyCustomNumberFilter,
    },
  },
};
```

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

[See Options in API Docs](https://entrecode.github.io/ec.components/interfaces/FieldConfigProperty.html)

## form options

The following field options control the forms looks/behaviour:

| option      | description                                      | type                    |
| ----------- | ------------------------------------------------ | ----------------------- |
| label       | label above input                                | string                  |
| placeholder | input placeholder                                | string                  |
| form        | if false, the field will not be part of the form | boolean                 |
| hideInForm  | if true, the field will be hidden in the form    | boolean                 |
| columns     | how many columns are used by the field           | number 1-12             |
| immutable   | if true, the property won't be sent when saving  | boolean                 |
| readOnly    | if true, the property won't be editable          | boolean                 |
| required    | if true, the field needs to be filled out        | boolean                 |
| prefill     | prefill value for new entries                    | any                     |
| input       | custom input component                           | Component               |
| inputView   | view for input component                         | string                  |
| validate    | transformation for form validation               | transformation function |



## transform methods

To modify your field value for certain contexts, you can use transform function:

```ts
const personConfig = {
  fields: {
    name: {
      display: (value) => value.toUpperCase(),
      group: (value) => value.length + ' Buchstaben',
      sort: (value) => value.length,
    },
  },
};
```

| option      | description                                           | type                    |
| ----------- | ----------------------------------------------------- | ----------------------- |
| resolve     | resolves value for transformation                     | function                |  |  |
| copy        | transformation to copy the fields value               | transformation function |  |  |
| display     | transformation to display the fields value            | transformation function | X |  |
| sort        | transformation to sort fields                         | transformation function | X |  |
| group       | transformation to group the fields value when sorting | transformation function | X |  |
| queryFilter | transformation for query param to filter value        | transformation function | X |  |
| validate    | transformation for form validation                    | transformation function |  | X |

As you see, a transform function accepts a value and outputs a transformation of that value (or anything you want).

#### display

The display transform method is used to show the value in a readable format.
It is called from inside ec-output, which is used in list-cells.
You can change the display behaviour like this:

```ts
this.modelConfig.set('muffin', {
  fields: {
    amazement_factor: {
      display: (value, item) => {
        if (value === 10) {
          return 'AMAZING!';
        } else if (value > 7) {
          return 'amazing';
        }
        return 'not so amazing';
      },
    },
  },
});
```

Now, each muffin's amazement_factor will be replaced by the labels defined above.

#### group

You can use grouping to get a clearer outline over sorted data:

```ts
this.modelConfig.set('muffin', {
  fields: {
    amazement_factor: {
      group: (value, item) => {
        if (value === 10) {
          return 'AMAZING!';
        } else if (value > 7) {
          return 'amazing';
        }
        return 'not so amazing';
      },
    },
  },
});
```

The syntax is the same as for display but the result is used as a group label when the property is sorted.

#### resolve

You can also define pseudo properties, meaning properties that do not exist on the original object:

```ts
this.modelConfig.set('muffin', {
  fields: {
    ranking: {
      resolve: (body, item) => (body.amazement_factor * body.flavour) / body.price,
    },
  },
});
```

This comes in handy when you want to display a often combined value out of multiple values.

NOTE: pseudo properties should not be passed to the backend. Use immutable: true for hide the field from the form via form: false.

### custom output

If you want custom cell values that require a custom markup, you can use a custom output component:

```ts
this.modelConfig.set('muffin', {
  fields: {
    amazement_factor: {
      output: StrongComponent,
    },
  },
});
```

In your strong.component.ts, you can inherit OutputComponent, giving you access to the field and item of your cell:

```ts
@Component({
  selector: 'app-strong',
  template: `
    <strong>{{ item.resolve(field.property) }}</strong>
  `,
})
export class StrongComponent extends OutputComponent {}
```

Warning: This option is experimental!

## All Options

| option               | description                                                                                              | type                    | affects list            | affects form |
| -------------------- | -------------------------------------------------------------------------------------------------------- | ----------------------- | ----------------------- | ------------ |
| [label](#fieldlabel) | column label in list-header                                                                              | string                  | column header           | input label  |
| classes              | class that is appended to list-header                                                                    | string                  | appended to each column | -            |
| placeholder          | input placeholder                                                                                        | string                  | filter input            | input        |
| form                 | if false, the field will not be part of the form                                                         | boolean                 |                         | X            |
| list                 | if false, the field will not be part of the list                                                         | boolean                 | X                       |              |
| hideInForm           | if true, the field will be hidden in the form                                                            | boolean                 |                         | X            |
| hideInList           | if true, the field will be hidden in the list                                                            | boolean                 | X                       |              |
| hideInColumnFilter   | if true, the field will be hidden in the column filter of the list-header                                | boolean                 | X                       |              |
| filterable           | if true, the field can be filtered from the list-header                                                  | boolean                 | X                       |
| sortable             | if true, the field can be sorted from the list-header                                                    | boolean                 | X                       |
| filterOperator       | the filterOperator that should be used. See [sdk filter doc](https://entrecode.github.io/ec.sdk/#filter) | boolean                 | X                       |
| filterComponent      | custom component to be used for filtering                                                                | Component               | X                       |
| rawFilter            | if set, the filter value will used as is (without filter operator)                                       | boolean                 | X                       |
| columns              | how many columns are used by the field                                                                   | number 1-12             |                         | X            |
| immutable            | if true, the property won't be sent when saving                                                          | boolean                 |                         | X            |
| readOnly             | if true, the property won't be editable                                                                  | boolean                 |                         | X            |
| required             | if true, the field needs to be filled out                                                                | boolean                 |                         | X            |
| prefill              | prefill value for new entries                                                                            | any                     |                         | X            |
| input                | custom input component                                                                                   | Component               | filter input            | X            |
| output               | custom output component                                                                                  | Component               | X                       |
| inputView            | view for input component                                                                                 | string                  |                         | X            |
| resolve              | resolves value for transformation                                                                        | function                |                         |              |
| copy                 | transformation to copy the fields value                                                                  | transformation function |                         |              |
| display              | transformation to display the fields value                                                               | transformation function | X                       |              |
| sort                 | transformation to sort fields                                                                            | transformation function | X                       |              |
| group                | transformation to group the fields value when sorting                                                    | transformation function | X                       |              |
| queryFilter          | transformation for query param to filter value                                                           | transformation function | X                       |              |
| validate             | transformation for form validation                                                                       | transformation function |                         | X            |

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
