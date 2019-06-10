---
id: crud
title: CRUD
sidebar_label: Crud
---

The CrudComponent (CRUD stands for Create Read Update Delete) is like the meta component that combines most of the other components. By just passing a model name, it renders a table of the model entries (Read). Pressing the "+" button opens a modal to add new entries (Create). Clicking a row in the list opens a modal to modify (Edit) or remove (Delete) entries.

## Basic Example

```html
<ec-crud model="muffin"></ec-crud>
```

## Options

### columnClicked

The columnClicked Output will be emitted when an entry is clicked. You get an Item containing the clicked entry as _$event_:

```html
<ec-crud model="muffin" (columnClicked)="clickedMuffin($event)"></ec-crud>
```

now you could e.g. navigate to a detail page:

```ts
clickedMuffin(muffin: Item<EntryResource>) {
  this.router.navigate(['muffin', muffin.id()]);
}
```

See [Items](../core-concepts/items) for more info.

### config

```html
<ec-crud model="muffin" [config]="muffinCrudConfig"></ec-crud>
```

### methods

You can control the available actions by methods

- post: Create
- get: Read
- put: Update
- delete: Delete

```ts
muffinCrudConfig = {
  methods: ['get', 'put'],
};
```

This will disable creating and deleting entries.

#### Default Methods

By default, the crud component will respect the active users permissions, meaning a create button will only be visible if the user is allowed to create entries. The same goes for delete and save buttons. See [Accounts & Rights](../core-concepts/accounts) for more info. If you pass methods to the config, those will always be used.

### createLabel

Changes the Label of the create button

### fields

The fields option defines which fields should be visible, and how they should look. This will affect the list and form:

```ts
muffinCrudConfig = {
  fields: {
    name: {
      label: 'Name'
    },
    amazement_factor: {
      label: 'Amazement Factor'
    }
  }
};
```

Being one of the core pieces of the components, the fields config has [many more options](../core-concepts/fields).