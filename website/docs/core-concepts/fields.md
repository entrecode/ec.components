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
  fields: {
    /* [property]: config */ 
  }
}
```

### In Lists

```html
<ec-entry-list model="muffin" [config]="muffinConfig"></ec-entry-list>
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
| type   | field type   | string    | X | X 
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


### type

## deprecate

title
schema
filterPopClass
view

### form/list vs hideInList/hideInList

read values:

property

### Type specific options

icon : type action

maxItems: type tags

entries, entry: model

relation: resource

select: values

#### label


[All Options](https://entrecode.github.io/ec.components/interfaces/FieldConfigProperty.html)