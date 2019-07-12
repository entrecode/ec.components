---
id: entry-form
title: Entry Form
sidebar_label: Entry Form
---

Entry forms can edit and create entries. They support notifications, loader, validation error handling and dynamic config generation out of the box.
NOTE: it is expected you have placed a ec-notifications tag somewhere in your root component.

## Basic Example

### Create

```html
<ec-entry-form model="muffin"></ec-entry-form>
```

submitting the form will create a new entry and then switch to edit mode.

### Edit

```html
<ec-entry-form model="muffin" [entry]="muffinEntry"></ec-entry-form>
```

or

```html
<ec-entry-form model="muffin" [entry-id]="muffinEntry.id"></ec-entry-form>
```

## Methods

### create()

Clears the form. Will post a new entry on submit.

```html
<ec-entry-form model="muffin" #muffinForm></ec-entry-form>
<a class="btn" (click)="muffinForm.create()">Create new Muffin</a>
```

### edit(Item)

Loads the given entry item into the form. Will put the entry on submit.

```html
<ec-entry-form model="muffin" #muffinForm></ec-entry-form>
<ul ecEntries model="muffin" #muffinList="ecEntries">
  <li *ngFor="let muffin of muffinList.items">
    <a (click)="muffinForm.edit(muffin)">{{muffin.name}}</a>
  </li>
</ul>
```

### isEditing()

Yields true, if the form currently edits an existing entry.

### deleteEntry()

Deletes the current entry immediately. Shows loader + notifications on success/error.

## Outputs

### deleted

Emits after the entry has been deleted (using deleteEntry method).

## Inputs

### model

The model of the form. Controls the available fields by using model schema.

### config

```html
<ec-entry-form model="muffin" [config]="formConfig"></ec-entry-form>
```

See [Configuration](../core-concepts/configuration) for ways to pass configuration.

### empty

You can tell the ec-entry-form that it shouldn't render the default form with the empty flag:

```html
<ec-entry-form model="muffin" [empty]="true" #form></ec-entry-form>
<ec-input property="title" [item]="form.form" [group]="form.group"></ec-input>
```

NOTE: Always make sure the property accessed by ec-input is also present in your config (or you dont use a config at all). Otherwise, the input wont know what to render.

See [Custom Form Markup](../core-concepts/form-options#custom-form-markup) for details on form customization.

## Properties

### group

Holds the current [FormGroup](), which can be used to access FormControls directly. See Custom Markup for examples.

## Customization

There are multiple ways to customize the form

- [Custom Form Markup](../core-concepts/form-options#custom-form-markup)
- [Custom Form Components](../core-concepts/form-options#custom-form-components)