---
id: items
title: Items
sidebar_label: Items
---

The foundation for all entities is the [Item](../../classes/Item.html) class.
It consists of a body (value) and a config <!-- (see [ItemConfig](../../interfaces/ItemConfig.html)) -->.
It can be used with arbitrary body values but is mainly thought to be a wrapper for objects.

Primitive use:

```ts
const primitive = new Item('a');
primitive.resolve(); //'a'
```

Default use:

```ts
const tommy = new Item({ name: 'tommy' });
tommy.resolve('name'); //'tommy'
tommy.display('name'); //'tommy'
tommy.group('name'); //'tommy'
tommy.sort('name'); //'tommy'
```

## Identifiers and labels

An Item also brings the concept of identifiers and labels:

```ts
const e = new Item({ nr: '#AYQ', title: 'Wurst' }, { identifier: 'nr', label: 'title');
e.id(); //'#AYQ'
e.display(); //'Wurst'
```

## Saving items

You can set up a callback that is invoked when calling item.save():

```ts
const n = new Item(1, { onSave: (item, body) => body+1 });
n.save();
n.resolve(); //2
```

## Item with fields definition

When using it with objects, it can be passed a config <!-- (see [ItemConfig](../../interfaces/ItemConfig.html)) --> to set up its field config<!-- (see [FieldConfig](../../interfaces/FieldConfig.html)) -->.

### Resolve and transform

Each item can have a value resolve method and serveral transformation methods for each field:

```ts
const bobby = new Item({ value: { name: 'bobby' } }, {
  fields: {
    name: {
      resolve: (body) => body.value.name, // provides value for all methods below
      display: (value) => value.toUpperCase(),
      group: (value) => value.length + ' Buchstaben',
      sort: (value) => value.length
    }
  }
});
bobby.resolve('name'); //'bobby'
bobby.display('name'); //'Bobby'
bobby.group('name'); //'5 Buchstaben'
bobby.sort('name'); //5
```

See [fields](Fields) for more info.
