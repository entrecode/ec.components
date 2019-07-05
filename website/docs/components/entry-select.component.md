---
id: entry-select
title: Entry Select
sidebar_label: Entry Select
---

The EntrySelectComponent can be used to pick entries from a model. It also provides full CRUD capabilities.

## Basic Example

```html
<ec-entry-select model="muffin" [(ngModel)]="selectedMuffins"></ec-entry-select>
```

## Used Components

- searchbar for filtering
- pop with entry-list + loader as dropdown
- entry-list-pop for more sophisticated browsing (search icon)
- resource-delete-pop for deleting entries
- entry-pop for editing entries

## Outputs

### submitted

The submitted Output will be emitted when the form has been successfully submitted, passing the current Form Item as _\$event_ param:

```html
<ec-entry-pop model="muffin" (submitted)="doStuffAfterSave($event)"></ec-crud>
```

now you could e.g. navigate to a detail page:

```ts
doStuffAfterSave(muffin: Form<EntryResource>) {
  this.router.navigate(['muffin', muffin.id()]);
}
```

See [Items](../core-concepts/items.md) (parent of Form) for more info on the emitted object.

### deleted

The deleted Output fires when the entry was deleted. It provides the current form as argument.

## Inputs

### model

The model that is used. Affects the form fields and behaviour by resolving the config of the given model.
See [Config Pipeline](../core-concepts/config-pipeline.md).

### entry

The entry that should be edited. Alternatively you could also use the edit method.

```html
<ec-entry-pop model="muffin" [entry]="myMuffin"></ec-entry-pop>
```

### config

The config that should be used for the form. See [Form API](../core-concepts/form-options.mdx) for all options of forms.

```html
<ec-entry-pop model="muffin" [config]="muffinCrudConfig"></ec-entry-pop>
```

See [Config Pipeline](../core-concepts/config-pipeline.md) for other ways to pass configuration.

### config.keepPopOpen

By default, the modal (pop) will be closed automatically when the form has been saved. When setting keepPopOpen to true, the modal will stay open until closed by the user or manually:

```html
<ec-entry-pop model="muffin" #muffinPop [config]="{keepPopOpen:true}"></ec-entry-pop>
<a (click)="muffinPop.hide()">hide</a>
```

### config.onEdit

Will be called before an entry is edited. Can be used to alter the entry that is passed to the component:

```html
<ec-entry-pop model="muffin" [config]="{onEdit:editMuffin($event)}"></ec-entry-pop>
```

```ts
editMuffin(muffin: EntryResource) {
  muffin.amazement_factor = 10; // forces amazement_factor to 10
  return muffin; // the returned object is used to edit
}
```

### config.singularLabel

Controls how the entry is called in the modal header:

```html
{{'resource.create' | symbol}} {{singularLabel || model}} "{{form.display()}}"
<!-- or -->
{{'resource.edit' | symbol}} {{singularLabel || model}} "{{form.display()}}"
```

If you set singularLabel to "Backware", this will result to e.g ```Edit: Backware "Strawberry Hill"```

### config.methods

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

**Default Methods**

By default, the entry-pop component will respect the active users permissions, meaning a save button will only be visible if the user is allowed to post or put entries. The same goes for the delete button. See [Accounts & Rights](../core-concepts/accounts.md) for more info. If you pass methods to the config, those will always be used.

## Methods

- edit
- create
