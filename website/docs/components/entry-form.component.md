---
id: entry-form
title: Entry Forms
sidebar_label: Entry Forms
---

Entry forms can edit and create entries. They support notifications, loader, validation error handling and dynamic config generation out of the box.
NOTE: it is expected you have placed a ec-notifications tag somewhere in your root component.

## Default Behaviour

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


### Dynamic Edit/Create from template

You can also access the form from the template and call edit or create:

```html
<ec-entry-form model="muffin" #muffinForm></ec-entry-form>
<ul ecEntries model="muffin" #muffinList="ecEntries">
    <li *ngFor="let muffin of muffinList.items">
      <a (click)="muffinForm.edit(muffin)">{{muffin.name}}</a>
    </li>
  </ul>
<a class="btn" (click)="muffinForm.create()">Create new Muffin</a>
```

## Configuration

If nothing else is configured, the form will parse the schema of muffin and generate a generic field config.
If you configured the model via ModelConfigService (see [Configuration](../core-concepts/configuration)), the form will use that config.
Alternatively, you can also pass a config directly:

```html
<ec-entry-form model="muffin" [config]="formConfig"></ec-entry-form>
```

The given config will be Object.assigned to the possible preexisting modelConfig.

## Custom Markup with ec-input/ec-output

Most times, you'll want more freedom over your forms markup etc. This is where ec-input and ec-output come into play:

```html
  <ec-entry-form model="muffin" #form>
    <!-- input -->
    <label>Title
        <ec-input property="title" [item]="form.form" [group]="form.group"></ec-input>
    </label>
    <!-- output -->
    <label>Amazement Factor</label>
    <ec-output property="amazement_factor" [item]="form.form" [group]="form.group"></ec-output>
    <a class="btn" (click)="form.submit()">Submit</a>
  </ec-entry-form>
```

As soon as the ec-entry-form contains elements (or you pass empty=true, as mentioned below), the contents will be rendered instead of the default form.

Features you have to add manually (if needed)

- submit button
- field.readOnly handling (show ec-output instead of ec-input)
- local ec-loader

NOTE: dont wrap labels around complex input components, because they fire ghost clicks!

## Custom input/output markup

Of course you can remove another layer of abstraction to further customize the form:

```html
  <ec-entry-form model="muffin" #form>
    <!-- input -->
    <label>Title</label>
    <input type="text" [formControl]="form.group.get('title')"/>
    <ec-input-errors [control]="form.group.get('title')"></ec-input-errors>
    <!-- output -->
    <label>Amazement Factor</label>
    {{form.display('amazement_factor')}}

    <a class="btn" (click)="form.submit()">Submit</a>
  </ec-entry-form>
```

Features you have to add manually:

- handling of input errors (ec-input-errors)
- making sure your markup handles the field type correctly
- making sure your markup handles the field value correctly

It is generally recommended to use ec-input over hard coded forms.

### The empty flag

You can also place the ec-input elements somewhere else and just tell the ec-entry-form that it shouldn't render the default form with the empty flag:

```html
<ec-entry-form model="muffin" [empty]="true" #form></ec-entry-form>
<ec-input property="title" [item]="form.form" [group]="form.group"></ec-input>
```

NOTE: Always make sure the property accessed by ec-input is also present in your config (or you dont use a config at all). Otherwise, the input wont know what to render.

