---
id: list-options
title: List API
sidebar_label: List API
---

This document shows which config options can be used to control lists.

## Example

For all following snippets, let's assume the following template

```html
<ec-entry-list model="muffin" [config]="muffinConfig" #muffinList></ec-entry-list>
```

... made available:

```ts
class AppComponent {
  @ViewChild('muffinList') muffinList;
  muffinConfig = {
    /* config here */
  };
}
```

Note: Lists could also appear inside other components like [ec-crud](../components/crud.component.md) and ec-entry-select. The techniques also apply to those lists.

Also check out [Config Pipeline](./config-pipeline.md) for other ways to set the config.

## sorting

The following options are related to sorting lists:

| option                           | description                                           | type    |
| -------------------------------- | ----------------------------------------------------- | ------- |
| [field.sortable](#fieldsortable) | if true, the field can be sorted from the list-header | boolean |
| [config.sortBy](#configsortby)   | the property that should be sorted after              | string  |
| [config.desc](#configdesc)       | if true, the sorting will be descending               | string  |

### Full Example

```ts
muffinConfig = {
  sortBy: 'amazement_factor',
  desc: true,
  fields: {
    /* other fields */
    amazement_factor: {
      sortable: true,
    },
  },
};
```

### field.sortable

If true, the column can be sorted by clicking the column header, as indicated by two arrows:

![sort-icon](../../static/img/sort-icon.png)

The first click sorts ascending, the second descending and the thirds resets the sorting.

### config.sortBy

The field property by which the list should be sorted:

```ts
this.muffinList.list.load({ sortBy: 'amazement_factor' });
```

### config.desc

If true, the sorting will be in descending order:

```ts
this.muffinList.list.load({ sortBy: 'amazement_factor', desc: true });
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

## value transformation

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

### display

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

### group

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

### resolve

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

## custom cells

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
